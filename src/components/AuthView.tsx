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
  signInWithRedirect, 
  getRedirectResult,
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

  // Handle Firebase redirect result on mount (for robust OAuth inside iframes)
  useEffect(() => {
    const handleRedirectResultAsync = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          const user = result.user;
          setIsLoading(true);
          const providerName = result.providerId === "github.com" ? "github" : "google";
          
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
        }
      } catch (err: any) {
        console.error("Redirect auth result error:", err);
        if (
          err.code === "auth/unauthorized-domain" || 
          (err.message && err.message.includes("unauthorized-domain")) ||
          (err.message && err.message.includes("auth/unauthorized-domain"))
        ) {
          setError(`Unauthorized domain: This domain is not authorized in your Firebase Console. Please authorize ${window.location.hostname} under Authentication -> Authorized Domains in the Firebase Console.`);
        } else {
          setError("Failed to complete redirect sign-in: " + (err.message || "Please try again."));
        }
      } finally {
        setIsLoading(false);
      }
    };
    handleRedirectResultAsync();
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
      const fallbackName = email.split("@")[0] || "User";
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }

      setIsLoading(true);
      try {
        // Create user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update display name
        await updateProfile(user, { displayName: fallbackName });

        // Sync profile to Firestore
        await syncUserProfile(user.uid, email, fallbackName, "local");

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
  const handleSocialLogin = async (providerName: "google" | "github") => {
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const provider = providerName === "google" 
        ? new GoogleAuthProvider() 
        : new GithubAuthProvider();

      // Use signInWithRedirect since signInWithPopup is blocked by third-party cookie restrictions inside iframes
      await signInWithRedirect(auth, provider);
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
        setError(`Unauthorized domain: This domain is not authorized in your Firebase Console. Please authorize ${window.location.hostname} under Authentication -> Authorized Domains in the Firebase Console.`);
      } else {
        setError(`Failed to sign in with ${providerName === "google" ? "Google" : "GitHub"}. Please try again or open the app in a new browser tab.`);
      }
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
              {/* Tab Switcher - Segmented Control */}
              <div className="flex bg-[#0f0e1a]/80 p-1 rounded-full border border-white/5 mb-6" id="auth-tabs">
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setSuccessMessage("");
                    setMode("signin");
                  }}
                  className={`flex-1 text-center py-2.5 px-4 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    mode === "signin"
                      ? "bg-[#1d1b32] text-white shadow-md border border-white/10"
                      : "text-gray-400 hover:text-white"
                  }`}
                  id="tab-signin-btn"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setError("");
                    setSuccessMessage("");
                    setMode("signup");
                  }}
                  className={`flex-1 text-center py-2.5 px-4 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                    mode === "signup"
                      ? "bg-[#1d1b32] text-white shadow-md border border-white/10"
                      : "text-gray-400 hover:text-white"
                  }`}
                  id="tab-signup-btn"
                >
                  Create Account
                </button>
              </div>

              {/* Error and Success Feedback Banner */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-xl mb-5 flex items-start gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{error}</span>
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

              {/* Social Login button */}
              <button
                type="button"
                onClick={() => handleSocialLogin("google")}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2.5 bg-[#0e0d16] hover:bg-[#161426] border border-white/10 text-white text-sm font-semibold py-3 px-4 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                id="google-login-btn"
              >
                <svg className="w-4.5 h-4.5 shrink-0" viewBox="0 0 24 24">
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
                Continue with Google
              </button>

              {/* Form Divider */}
              <div className="relative flex py-2 items-center my-5">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="flex-shrink mx-4 text-[11px] text-gray-500 font-medium tracking-widest uppercase">OR</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-[10px] font-semibold text-gray-500 tracking-widest uppercase font-mono">
                    EMAIL
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0d0c15] border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 text-sm focus:border-[#d2b48c] focus:ring-1 focus:ring-[#d2b48c]/30 transition-all outline-none"
                      disabled={isLoading}
                      required
                      id="email-input"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-[10px] font-semibold text-gray-500 tracking-widest uppercase font-mono">
                      PASSWORD
                    </label>
                    {mode === "signin" && (
                      <button
                        type="button"
                        onClick={() => setMode("forgot")}
                        className="text-xs text-[#c5a880] hover:underline hover:text-white transition-colors"
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
                      placeholder="At least 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#0d0c15] border border-white/10 text-white rounded-xl py-3 pl-11 pr-11 text-sm focus:border-[#d2b48c] focus:ring-1 focus:ring-[#d2b48c]/30 transition-all outline-none"
                      disabled={isLoading}
                      required
                      id="password-input"
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
                  <div className="space-y-2">
                    <label className="block text-[10px] font-semibold text-gray-500 tracking-widest uppercase font-mono">
                      CONFIRM PASSWORD
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                      <input
                        type="password"
                        placeholder="At least 8 characters"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-[#0d0c15] border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 text-sm focus:border-[#d2b48c] focus:ring-1 focus:ring-[#d2b48c]/30 transition-all outline-none"
                        disabled={isLoading}
                        required
                        id="confirm-password-input"
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
                      className="rounded border-white/20 bg-black/50 text-[#d2b48c] focus:ring-0 w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="rememberMe" className="text-xs text-gray-400 select-none cursor-pointer">
                      Remember me
                    </label>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#d2b48c] hover:bg-[#dfc49f] text-[#0a0a14] font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-lg cursor-pointer mt-6 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-wait"
                  id="submit-auth-btn"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#0a0a14]/30 border-t-[#0a0a14] rounded-full animate-spin" />
                      Please wait...
                    </>
                  ) : mode === "signin" ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>
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
