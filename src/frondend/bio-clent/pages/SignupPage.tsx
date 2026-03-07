import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  ArrowRight,
  Eye,
  EyeOff,
} from "../components/Icons";
import { Spotlight } from "../components/Spotlight";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { authToast, toast } from "../utils/toast";

interface SignupPageProps {
  onNavigateLogin: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onNavigateLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const signupMutation = useMutation({
    mutationFn: async () => {
      authService.register({
        username: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
    },
    onSuccess: (data) => {
      authToast.registerSuccess();
      setTimeout(() => onNavigateLogin(), 1000);
    },
    onError: (error: Error) => {
      authToast.registerError(error.message);
    },
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate passwords match
    if (name === "confirmPassword" || name === "password") {
      const password = name === "password" ? value : formData.password;
      const confirmPassword =
        name === "confirmPassword" ? value : formData.confirmPassword;

      if (confirmPassword && password !== confirmPassword) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    setPasswordError("");
    signupMutation.mutate();
  };
  return (
    <Spotlight
      className="relative flex min-h-screen w-full flex-col items-center justify-center bg-bg-dark bg-grid-pattern bg-[length:40px_40px] p-4 overflow-hidden font-sans"
      size={1200}
      color="rgba(190, 242, 100, 0.08)"
    >
      {/* Background Blurs - These sit inside the content layer (z-10), so they are on top of the spotlight glow (z-0) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-nexus-teal/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-nexus-lime/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Card Container */}
      <div className="relative z-10 w-full max-w-[480px] rounded-2xl border border-border-dark shadow-2xl overflow-hidden backdrop-blur-sm bg-surface-dark/95">
        <div className="pt-10 pb-6 px-8 flex flex-col items-center">
          <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-nexus-teal to-nexus-lime tracking-tight text-[32px] font-bold leading-tight text-center">
            Create your account
          </h2>
          <p className="text-slate-400 text-base font-normal leading-normal mt-2 text-center">
            Join us today and start your journey.
          </p>
        </div>

        <form
          className="px-8 pb-10 flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label className="text-slate-200 text-sm font-medium leading-normal">
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                <User size={20} />
              </div>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full rounded-xl text-white border border-border-dark bg-bg-dark h-12 pl-12 pr-4 placeholder:text-slate-600 text-base focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all shadow-inner"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-200 text-sm font-medium leading-normal">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                <Mail size={20} />
              </div>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full rounded-xl text-white border border-border-dark bg-bg-dark h-12 pl-12 pr-4 placeholder:text-slate-600 text-base focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all shadow-inner"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-200 text-sm font-medium leading-normal">
              Password
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-xl text-white border border-border-dark bg-bg-dark h-12 pl-12 pr-12 placeholder:text-slate-600 text-base focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all shadow-inner"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer flex items-center justify-center focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-200 text-sm font-medium leading-normal">
              Confirm Password
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors">
                <ShieldCheck size={20} />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full rounded-xl text-white border bg-bg-dark h-12 pl-12 pr-12 placeholder:text-slate-600 text-base focus:outline-none focus:ring-2 transition-all shadow-inner ${
                  passwordError
                    ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                    : "border-border-dark focus:ring-cyan-500/50 focus:border-cyan-500"
                }`}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer flex items-center justify-center focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>

          <div className="flex items-center gap-3 py-1">
            <input
              type="checkbox"
              id="terms"
              className="h-5 w-5 rounded border-border-dark bg-bg-dark text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0 transition-colors cursor-pointer"
            />
            <label
              htmlFor="terms"
              className="text-sm text-slate-400 select-none cursor-pointer"
            >
              I agree to the{" "}
              <a
                href="#"
                className="text-slate-200 font-medium hover:underline hover:text-cyan-400 transition-colors"
              >
                Terms and Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={signupMutation.isPending || !!passwordError}
            className="mt-2 w-full h-12 rounded-xl bg-gradient-to-r from-nexus-teal to-nexus-lime hover:to-lime-400 text-slate-900 font-bold text-base shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {signupMutation.isPending ? "Creating Account..." : "Sign Up"}
            <ArrowRight size={20} />
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-dark"></div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-slate-400 text-sm">
              Already have an account?
              <button
                onClick={onNavigateLogin}
                className="text-white font-medium hover:text-cyan-400 transition-colors ml-1"
              >
                Log in
              </button>
            </p>
          </div>
        </form>
      </div>

      <div className="mt-8 text-center text-xs text-slate-500 relative z-10">
        <p>© 2023 Acme Corp. All rights reserved.</p>
      </div>
    </Spotlight>
  );
};

export default SignupPage;
