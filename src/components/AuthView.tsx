import React, { useState } from "react";
import { Mic, Sparkles, Eye, EyeOff, Lock, Mail, User, Info, Github } from "lucide-react";
import GlassOrbBackground from "./GlassOrbBackground";

interface AuthViewProps {
  onLoginSuccess: (user: { email: string; name: string }) => void;
}

export default function AuthView({ onLoginSuccess }: AuthViewProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Listen for message events from the OAuth popups
  React.useEffect(() => {
    const handleOAuthMessage = (event: MessageEvent) => {
      // Validate origin is from AI Studio preview or localhost
      const origin = event.origin;
      if (
        !origin.endsWith(".run.app") &&
        !origin.includes("localhost") &&
        !origin.includes("127.0.0.1") &&
        !origin.includes("0.0.0.0")
      ) {
        return;
      }

      if (event.data?.type === "OAUTH_AUTH_SUCCESS") {
        const { user, token } = event.data;
        setIsLoading(false);
        if (token) {
          localStorage.setItem("nextroundprep_token", token);
        }
        onLoginSuccess(user);
      } else if (event.data?.type === "OAUTH_AUTH_FAILURE") {
        setIsLoading(false);
        setError(event.data.error || "OAuth login failed. Please check your credentials or try again later.");
      }
    };

    window.addEventListener("message", handleOAuthMessage);
    return () => window.removeEventListener("message", handleOAuthMessage);
  }, [onLoginSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!isLogin && !name) {
      setError("Please specify your name.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const payload = isLogin 
        ? { email, password } 
        : { email, name, password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      // Store JWT token for secure session management
      if (data.token) {
        localStorage.setItem("nextroundprep_token", data.token);
      }

      onLoginSuccess(data.user);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/google/url");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initiate Google sign-in.");
      }

      // Open Google authorization URL directly in the popup
      const width = 500;
      const height = 650;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const authWindow = window.open(
        data.url,
        "google_oauth_popup",
        `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
      );

      if (!authWindow) {
        throw new Error("Popup blocked! Please allow popups for this site to log in with Google.");
      }
    } catch (err: any) {
      setError(err.message || "Could not log in with Google.");
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/github/url");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initiate GitHub sign-in.");
      }

      // Open GitHub authorization URL directly in the popup
      const width = 550;
      const height = 700;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const authWindow = window.open(
        data.url,
        "github_oauth_popup",
        `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
      );

      if (!authWindow) {
        throw new Error("Popup blocked! Please allow popups for this site to log in with GitHub.");
      }
    } catch (err: any) {
      setError(err.message || "Could not log in with GitHub.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#ec4899] opacity-[0.06] rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#22d3ee] opacity-[0.06] rounded-full filter blur-[100px] pointer-events-none" />
      <GlassOrbBackground />

      {/* Main Card */}
      <div className="w-full max-w-[460px] glass-card rounded-[22px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative z-10 border border-[rgba(255,255,255,0.06)]">
        
        {/* Logo Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative w-14 h-14 bg-accent-gradient rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] mb-4">
            <Mic className="w-7 h-7 text-white stroke-[2.5]" />
            <div className="absolute -top-1.5 -right-1.5 bg-[#22d3ee] rounded-full p-1 animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-black" />
            </div>
          </div>
          <h2 className="font-display font-bold text-3xl text-white tracking-tight mb-2">
            {isLogin ? "Welcome back" : "Create Account"}
          </h2>
          <p className="text-sm text-gray-400">
            {isLogin ? "Sign in to continue to NextRoundPrep" : "Get started with your free NextRoundPrep account"}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-xl mb-5 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* OAuth Buttons */}
        <div className="space-y-3 mb-5">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] text-white text-sm font-medium py-3 px-4 rounded-[12px] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
            Continue with Google
          </button>

          <button
            type="button"
            onClick={handleGithubLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.08)] text-white text-sm font-medium py-3 px-4 rounded-[12px] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Github className="w-4 h-4 shrink-0 text-white fill-white" />
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex py-2 items-center mb-5">
          <div className="flex-grow border-t border-[rgba(255,255,255,0.06)]"></div>
          <span className="flex-shrink mx-4 text-xs text-gray-500 font-mono tracking-widest">OR</span>
          <div className="flex-grow border-t border-[rgba(255,255,255,0.06)]"></div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-gray-400 tracking-wider uppercase font-mono">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g. Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full glass-input text-white rounded-[10px] py-3 pl-11 pr-4 text-sm"
                  disabled={isLoading}
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-400 tracking-wider uppercase font-mono">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="e.g. suresh@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass-input text-white rounded-[10px] py-3 pl-11 pr-4 text-sm"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-semibold text-gray-400 tracking-wider uppercase font-mono">
                Password
              </label>
              {isLogin && (
                <button
                  type="button"
                  onClick={() => alert("Mock password reset link sent to your email!")}
                  className="text-xs text-[#a855f7] hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass-input text-white rounded-[10px] py-3 pl-11 pr-11 text-sm"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-[rgba(255,255,255,0.2)] bg-black/50 text-[#a855f7] focus:ring-0 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-xs text-gray-400 select-none cursor-pointer">
                Remember me
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent-gradient hover:opacity-90 text-white font-bold py-3.5 px-4 rounded-[12px] transition-all duration-200 shadow-[0_4px_15px_rgba(168,85,247,0.3)] hover:shadow-[0_4px_25px_rgba(34,211,238,0.4)] cursor-pointer mt-6 flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-wait"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Please wait...
              </>
            ) : isLogin ? (
              "Sign in"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setError("");
                setIsLogin(!isLogin);
              }}
              className="text-[#a855f7] hover:underline font-semibold"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
