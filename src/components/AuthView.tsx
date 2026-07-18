import React, { useState, useEffect } from "react";
import { 
  Mic, Sparkles, Eye, EyeOff, Lock, Mail, User, Info, Github, 
  ArrowLeft, CheckCircle2, AlertCircle, RefreshCw, Linkedin, UserCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  sendEmailVerification,
  updateProfile,
  signInWithPopup, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  signOut
} from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
const GlassOrbBackground = React.lazy(() => import("./GlassOrbBackground"));

interface AuthViewProps {
  onLoginSuccess: (user: { email: string; name: string; uid: string; provider: string }) => void;
}

type AuthMode = "signin" | "signup" | "forgot" | "verify-pending";

export default function AuthView({ onLoginSuccess }: AuthViewProps) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showBypassOption, setShowBypassOption] = useState(false);
  const [bypassProvider, setBypassProvider] = useState<"google" | "github" | "">("");

  // Password strength meter state
  const [passwordStrength, setPasswordStrength] = useState<"weak" | "medium" | "strong" | "">("");

  // Calculate password strength
  useEffect(() => {
    if (!password) {
      setPasswordStrength("");
      return;
    }
    if (password.length < 6) {
      setPasswordStrength("weak");
    } else if (password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      setPasswordStrength("strong");
    } else {
      setPasswordStrength("medium");
    }
  }, [password]);

  // Listen for messages from LinkedIn popup
  useEffect(() => {
    const handleLinkedInMessage = async (event: MessageEvent) => {
      if (event.data && event.data.type === "LINKEDIN_AUTH_SUCCESS") {
        const { user: linkedInUser } = event.data;
        setIsLoading(true);
        setError("");
        try {
          await syncUserProfile(linkedInUser.uid, linkedInUser.email, linkedInUser.name, "linkedin");
          
          onLoginSuccess({
            email: linkedInUser.email,
            name: linkedInUser.name,
            uid: linkedInUser.uid,
            provider: "linkedin"
          });
        } catch (err: any) {
          console.error("LinkedIn sync failed", err);
          setError("Failed to synchronize your LinkedIn profile. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }
    };

    window.addEventListener("message", handleLinkedInMessage);
    return () => window.removeEventListener("message", handleLinkedInMessage);
  }, []);

  // Create/update user document in Firestore helper
  const syncUserProfile = async (userId: string, userEmail: string, displayName: string, provider: string) => {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    
    if (!docSnap.exists()) {
      // Create new user profile document in Firestore
      await setDoc(userRef, {
        id: userId,
        uid: userId, // Set uid explicitly to satisfy security rules check
        email: userEmail,
        name: displayName || userEmail.split("@")[0],
        provider,
        createdAt: new Date().toISOString(),
        points: 150, // Welcome starting points!
        streak: 1,
        lastActiveDate: new Date().toISOString()
      });
    } else {
      // Keep existing points/streak but ensure provider matches
      await setDoc(userRef, {
        uid: userId, // Set uid explicitly to satisfy security rules check
        provider,
        lastActiveDate: new Date().toISOString()
      }, { merge: true });
    }
  };

  // 1. Email/Password Submission Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!email) {
      setError("Please provide an email address.");
      return;
    }

    // Forgot password flow
    if (mode === "forgot") {
      setIsLoading(true);
      try {
        await sendPasswordResetEmail(auth, email);
        setSuccessMessage("A password reset email has been sent. Check your inbox!");
        setError("");
      } catch (err: any) {
        console.error("Forgot password error", err);
        setError(err.message || "Failed to send reset email. Verify your email is correct.");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Registration and signin checks
    if (!password) {
      setError("Please fill in your password.");
      return;
    }

    if (mode === "signup") {
      if (!name.trim()) {
        setError("Please enter your full name.");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }

      setIsLoading(true);
      try {
        // Create user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update display name
        await updateProfile(user, { displayName: name.trim() });

        // Sync profile to Firestore
        await syncUserProfile(user.uid, email, name.trim(), "local");

        // Send Email Verification
        try {
          await sendEmailVerification(user);
        } catch (vErr) {
          console.error("Failed to send verification email on signup", vErr);
        }

        // Set pending verification mode
        setMode("verify-pending");
      } catch (err: any) {
        console.error("Registration error", err);
        if (err.code === "auth/email-already-in-use") {
          setError("This email address is already in use by another account.");
        } else {
          setError(err.message || "Failed to create account. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    } else if (mode === "signin") {
      setIsLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Check verification (soft constraint or informational block)
        if (!user.emailVerified) {
          // If the user hasn't verified their email, we allow them to log in but can gently show verify pending
          // or we can allow login and flag it in context. Let's redirect them to verification mode for safety
          // but give them an option to continue anyway. Premium auth requires clear status:
          setMode("verify-pending");
          setIsLoading(false);
          return;
        }

        // Sync profile to Firestore
        await syncUserProfile(user.uid, email, user.displayName || "", "local");

        onLoginSuccess({
          email: user.email!,
          name: user.displayName || user.email!.split("@")[0],
          uid: user.uid,
          provider: "local"
        });
      } catch (err: any) {
        console.error("Login error", err);
        if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
          setError("Invalid email address or password. Please verify your credentials.");
        } else {
          setError(err.message || "Authentication failed. Try again.");
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  // 2. OAuth Handlers
  const handleDeveloperBypass = async (provider: "google" | "github") => {
    setError("");
    setSuccessMessage("");
    setIsLoading(true);
    
    try {
      const mockEmail = `developer-${provider}@nextroundprep.org`;
      const mockPassword = `DevSandboxPass123!_${provider}`;
      const mockName = `${provider === "google" ? "Google" : "GitHub"} Test Developer`;
      
      let user;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, mockEmail, mockPassword);
        user = userCredential.user;
      } catch (signInErr: any) {
        if (
          signInErr.code === "auth/user-not-found" || 
          signInErr.code === "auth/invalid-credential" || 
          signInErr.code === "auth/invalid-email" || 
          signInErr.code === "auth/wrong-password"
        ) {
          // If the user does not exist, create the account
          const userCredential = await createUserWithEmailAndPassword(auth, mockEmail, mockPassword);
          user = userCredential.user;
        } else {
          throw signInErr;
        }
      }

      await syncUserProfile(user.uid, mockEmail, mockName, provider);
      
      onLoginSuccess({
        email: mockEmail,
        name: mockName,
        uid: user.uid,
        provider: provider
      });
    } catch (err: any) {
      console.error("Developer bypass failed", err);
      setError("Failed to run local developer bypass login: " + (err.message || ""));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (providerName: "google" | "github") => {
    setError("");
    setSuccessMessage("");
    setIsLoading(true);
    setShowBypassOption(false);
    setBypassProvider("");

    try {
      const provider = providerName === "google" 
        ? new GoogleAuthProvider() 
        : new GithubAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Sync user profile with Firestore
      await syncUserProfile(
        user.uid, 
        user.email || "", 
        user.displayName || user.email?.split("@")[0] || "User", 
        providerName
      );

      onLoginSuccess({
        email: user.email || "",
        name: user.displayName || user.email?.split("@")[0] || "User",
        uid: user.uid,
        provider: providerName
      });
    } catch (err: any) {
      console.error(`${providerName} login failed`, err);
      if (err.code === "auth/popup-blocked") {
        setError("Popup was blocked by your browser. Please enable popups or try a different method.");
      } else if (err.code === "auth/account-exists-with-different-credential") {
        setError("An account already exists with the same email address but different sign-in credentials.");
      } else if (
        err.code === "auth/unauthorized-domain" || 
        (err.message && err.message.includes("unauthorized-domain")) ||
        (err.message && err.message.includes("auth/unauthorized-domain"))
      ) {
        console.warn(`Unauthorized domain detected for ${providerName}. Automatically activating developer bypass...`);
        setShowBypassOption(true);
        setBypassProvider(providerName);
        setError(`Failed to sign in with ${providerName === "google" ? "Google" : "GitHub"} due to unauthorized domain. Seamlessly logging in via local bypass...`);
        await handleDeveloperBypass(providerName);
      } else {
        setError(`Failed to sign in with ${providerName === "google" ? "Google" : "GitHub"}. Please open the app in a new browser tab or verify cookies.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkedInLogin = () => {
    setError("");
    setSuccessMessage("");
    const width = 450;
    const height = 550;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    
    window.open(
      "/linkedin-mock-login.html",
      "LinkedIn Auth",
      `width=${width},height=${height},left=${left},top=${top},status=no,resizable=yes`
    );
  };

  const handleGuestLogin = async () => {
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const { signInAnonymously } = await import("firebase/auth");
      const result = await signInAnonymously(auth);
      const user = result.user;

      // Sync guest profile to Firestore
      await syncUserProfile(user.uid, "", "Guest Candidate", "guest");

      onLoginSuccess({
        email: "",
        name: "Guest Candidate",
        uid: user.uid,
        provider: "guest",
        isAnonymous: true
      } as any);
    } catch (err: any) {
      console.error("Firebase anonymous login failed, using local guest fallback", err);
      // Fallback local guest session
      const mockUid = "guest-" + Math.random().toString(36).substr(2, 9);
      onLoginSuccess({
        email: "",
        name: "Guest Candidate",
        uid: mockUid,
        provider: "guest",
        isAnonymous: true
      } as any);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Resend Verification Email Handler
  const handleResendVerification = async () => {
    if (!auth.currentUser) return;
    setIsResending(true);
    setError("");
    try {
      await sendEmailVerification(auth.currentUser);
      setSuccessMessage("Verification email resent successfully! Check your spam folder if you can't find it.");
    } catch (err: any) {
      setError(err.message || "Failed to resend email. Please try again later.");
    } finally {
      setIsResending(false);
    }
  };

  // 4. Force continue without verification (optional/soft validation)
  const handleForceContinue = async () => {
    const user = auth.currentUser;
    if (user) {
      await syncUserProfile(user.uid, user.email || "", user.displayName || "", "local");
      onLoginSuccess({
        email: user.email!,
        name: user.displayName || user.email!.split("@")[0],
        uid: user.uid,
        provider: "local"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#ec4899] opacity-[0.06] rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#22d3ee] opacity-[0.06] rounded-full filter blur-[100px] pointer-events-none" />
      <React.Suspense fallback={null}>
        <GlassOrbBackground />
      </React.Suspense>

      {/* Main Container with Entrance Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-[460px] bg-[#11101d]/85 backdrop-blur-md rounded-[24px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 border border-white/10"
        id="auth-card-container"
      >
        <AnimatePresence mode="wait">
          {mode === "signin" || mode === "signup" ? (
            <motion.div
              key="auth-form"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Logo Header */}
              <div className="flex flex-col items-center text-center mb-8">
                <div className="relative w-14 h-14 bg-gradient-to-tr from-[#ec4899] to-[#a855f7] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] mb-4">
                  <Mic className="w-7 h-7 text-white stroke-[2.5]" />
                  <div className="absolute -top-1.5 -right-1.5 bg-[#22d3ee] rounded-full p-1 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 text-black" />
                  </div>
                </div>
                <h2 className="font-display font-bold text-3xl text-white tracking-tight mb-2">
                  {mode === "signin" ? "Welcome back" : "Create Account"}
                </h2>
                <p className="text-sm text-gray-400">
                  {mode === "signin" 
                    ? "Sign in to continue to NextRoundPrep" 
                    : "Get started with your free NextRoundPrep account"}
                </p>
              </div>

              {/* Error and Success Feedback Banner */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-xl mb-5 flex flex-col gap-2.5"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                  {showBypassOption && (
                    <button
                      type="button"
                      onClick={() => handleDeveloperBypass(bypassProvider || "google")}
                      className="mt-1.5 w-full flex items-center justify-center gap-2 py-2 px-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 hover:from-purple-500/30 hover:to-cyan-500/30 border border-purple-500/30 hover:border-cyan-500/40 text-purple-200 hover:text-white text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer shadow-md"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      Bypass & Sign In as Google Test User
                    </button>
                  )}
                </motion.div>
              )}

              {successMessage && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs py-3 px-4 rounded-xl mb-5 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{successMessage}</span>
                </motion.div>
              )}

              {/* Social Login buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => handleSocialLogin("google")}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold py-3 px-3 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                  id="google-login-btn"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22-.03-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  Google
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin("github")}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold py-3 px-3 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                  id="github-login-btn"
                >
                  <Github className="w-4 h-4 shrink-0 text-white fill-white" />
                  GitHub
                </button>

                <button
                  type="button"
                  onClick={handleLinkedInLogin}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2.5 bg-white/5 hover:bg-[#0077b5]/15 border border-white/10 hover:border-[#0077b5]/30 text-white hover:text-[#0077b5] text-xs font-semibold py-3 px-3 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                  id="linkedin-login-btn"
                >
                  <Linkedin className="w-4 h-4 shrink-0" />
                  LinkedIn
                </button>

                <button
                  type="button"
                  onClick={handleGuestLogin}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2.5 bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 text-white hover:text-emerald-400 text-xs font-semibold py-3 px-3 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                  id="guest-login-btn"
                >
                  <UserCheck className="w-4 h-4 shrink-0" />
                  Guest Mode
                </button>
              </div>

              {/* Form Divider */}
              <div className="relative flex py-2 items-center mb-6">
                <div className="flex-grow border-t border-white/5"></div>
                <span className="flex-shrink mx-4 text-[10px] text-gray-500 font-mono tracking-widest uppercase">Or email sign-in</span>
                <div className="flex-grow border-t border-white/5"></div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-mono">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="e.g. Suresh Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 text-sm focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]/30 transition-all outline-none"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-mono">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="e.g. suresh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 text-sm focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]/30 transition-all outline-none"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-mono">
                      Password
                    </label>
                    {mode === "signin" && (
                      <button
                        type="button"
                        onClick={() => setMode("forgot")}
                        className="text-xs text-[#a855f7] hover:underline hover:text-pink-400 transition-colors"
                        id="forgot-password-link"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 pl-11 pr-11 text-sm focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]/30 transition-all outline-none"
                      disabled={isLoading}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                    </button>
                  </div>

                  {/* Password strength visualizer during registration */}
                  {mode === "signup" && passwordStrength && (
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <div className="flex-grow h-1 rounded-full bg-white/10 overflow-hidden">
                        <div className={`h-full transition-all duration-300 ${
                          passwordStrength === "weak" ? "w-1/3 bg-red-500" :
                          passwordStrength === "medium" ? "w-2/3 bg-amber-500" : "w-full bg-emerald-500"
                        }`} />
                      </div>
                      <span className="text-[10px] font-mono capitalize tracking-wide text-gray-400">
                        {passwordStrength}
                      </span>
                    </div>
                  )}
                </div>

                {mode === "signup" && (
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-mono">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 text-sm focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]/30 transition-all outline-none"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                )}

                {mode === "signin" && (
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-white/20 bg-black/50 text-[#a855f7] focus:ring-0 w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="rememberMe" className="text-xs text-gray-400 select-none cursor-pointer">
                      Remember me
                    </label>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-pink-500 to-[#a855f7] hover:opacity-90 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/10 hover:shadow-cyan-500/10 cursor-pointer mt-6 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-wait"
                  id="submit-auth-btn"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Please wait...
                    </>
                  ) : mode === "signin" ? (
                    "Sign in"
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              {/* Switch Signin / Signup */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-400">
                  {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => {
                      setError("");
                      setSuccessMessage("");
                      setMode(mode === "signin" ? "signup" : "signin");
                    }}
                    className="text-[#a855f7] hover:underline hover:text-pink-400 transition-colors font-semibold"
                    id="toggle-auth-mode-btn"
                  >
                    {mode === "signin" ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </motion.div>
          ) : mode === "forgot" ? (
            <motion.div
              key="forgot-form"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Back Link */}
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setSuccessMessage("");
                  setMode("signin");
                }}
                className="flex items-center gap-2 text-xs text-gray-400 hover:text-white mb-6 group cursor-pointer"
                id="back-to-login-btn"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                Back to Sign In
              </button>

              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-4">
                  <Lock className="w-5 h-5 text-[#a855f7]" />
                </div>
                <h2 className="font-display font-bold text-2xl text-white tracking-tight mb-2">
                  Reset Password
                </h2>
                <p className="text-sm text-gray-400">
                  Enter your registered email address, and we'll send you a secure link to reset your password.
                </p>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-xl mb-5 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {successMessage && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs py-3 px-4 rounded-xl mb-5 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{successMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-semibold text-gray-400 tracking-wider uppercase font-mono">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="e.g. suresh@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 text-sm focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]/30 transition-all outline-none"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-pink-500 to-[#a855f7] hover:opacity-90 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-lg cursor-pointer mt-6 flex items-center justify-center gap-2.5"
                  id="reset-password-btn"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Link...
                    </>
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="verify-pending"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mx-auto mb-5 animate-bounce">
                <Mail className="w-8 h-8 text-yellow-500" />
              </div>
              <h2 className="font-display font-bold text-2xl text-white mb-2">Verify your email</h2>
              <p className="text-sm text-gray-400 mb-6">
                We've sent a verification email to <span className="text-white font-semibold">{email}</span>. Please check your inbox and verify your email to unlock your workspace.
              </p>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-xl mb-4 flex items-start gap-2.5 text-left">
                  <AlertCircle className="w-4.5 h-4.5 text-red-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {successMessage && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs py-3 px-4 rounded-xl mb-4 flex items-start gap-2.5 text-left">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleResendVerification}
                  disabled={isResending}
                  className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold py-3 px-4 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                  id="resend-verification-btn"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Resending...
                    </>
                  ) : (
                    "Resend Verification Email"
                  )}
                </button>

                <div className="flex gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      // Logout current auth user and go back to signin
                      signOut(auth);
                      setMode("signin");
                      setError("");
                      setSuccessMessage("");
                    }}
                    className="flex-1 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold py-2.5 px-3 rounded-lg transition-all cursor-pointer"
                    id="verify-back-btn"
                  >
                    Go Back
                  </button>
                  <button
                    type="button"
                    onClick={handleForceContinue}
                    className="flex-grow bg-[#a855f7] hover:bg-pink-500 text-white text-xs font-semibold py-2.5 px-3 rounded-lg transition-all cursor-pointer"
                    id="verify-continue-btn"
                  >
                    Enter Workspace
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
