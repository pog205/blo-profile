import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Mail,
  Lock,
  Eye,
  EyeOff,
  GoogleIcon,
  AppleIcon,
} from "../components/Icons";
import { Spotlight } from "../components/Spotlight";
import { authService } from "../services";
import { authToast } from "../utils/toast";

interface LoginPageProps {
  onNavigateSignup: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onNavigateSignup }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      authToast.loginSuccess(data.username);
      setTimeout(() => navigate("/dashboard"), 500);
    },
    onError: (error: Error) => {
      authToast.loginError(error.message);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };
  return (
    <div className="flex min-h-screen flex-row w-full overflow-hidden bg-bg-dark text-white">
      {/* Left Sidebar - Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-surface-dark overflow-hidden flex-col justify-between p-12 border-r border-border-dark/30">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjktoyCwnva_9VwLwtZoxVvmlSUDIN9ZJzbcJ3OFMA5r2U2QlFkcNevrWf_pMk1G6MkyH9MQ340063OO-JpBNMnx-am4KzVO_VUcA3j3rRHWLrz5TqKfzI1Ey4PtrPoHbDOURH49arK-0gKP0jS9H1G_B3KcZ4O-meJsWR_qRD4LW1n6IQFzecbw9hfPxMbKGTkZUiVJ1MdoXSrqKwOPtpN_jvPVHOEzxZflgB6w17lp0VKSR8LY41egdlYCyD8V_NVz1H3kzwuos"
            alt="Abstract background"
            className="w-full h-full object-cover opacity-40 mix-blend-overlay grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#18181b]/95 via-[#18181b]/60 to-nexus-teal/10 mix-blend-normal"></div>
        </div>

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/assets/pog-logo.png"
              alt="POG Logo"
              className="h-14 w-auto"
            />
          </div>
          <div className="max-w-md">
            <p className="text-3xl font-bold leading-tight tracking-tight text-white mb-4">
              "The most reliable platform for modern teams to build the future."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-gradient-digital"></div>
              <p className="text-sm font-medium text-white/70">
                Trusted by industry leaders
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Form Container with Full Section Spotlight */}
      <Spotlight
        className="flex flex-1 flex-col justify-center items-center p-6 sm:p-12 lg:w-1/2 bg-bg-dark bg-grid-pattern bg-[length:40px_40px] relative"
        size={800}
        color="rgba(6, 182, 212, 0.1)"
      >
        {/* Mobile Header */}
        <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2 z-20">
          <img
            src="/assets/pog-logo.png"
            alt="POG Logo"
            className="h-12 w-auto"
          />
        </div>

        {/* Login Form Card */}
        <div className="w-full max-w-md rounded-2xl border border-white/5 bg-surface-dark/60 lg:bg-transparent lg:border-none lg:p-0 backdrop-blur-sm lg:backdrop-blur-none p-8 relative z-20">
          <div className="space-y-2 text-center lg:text-left mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-digital pb-1">
              Welcome back
            </h1>
            <p className="text-text-secondary text-base">
              Please enter your details to sign in.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium leading-none text-zinc-300"
                >
                  Email
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@company.com"
                    required
                    disabled={loginMutation.isPending}
                    className="flex w-full h-12 rounded-lg border border-border-dark bg-surface-dark/50 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-nexus-teal focus:ring-1 focus:ring-nexus-teal focus:shadow-[0_0_10px_rgba(45,212,191,0.2)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <div className="absolute right-3 top-3 text-zinc-500 group-focus-within:text-nexus-teal transition-colors duration-300 pointer-events-none">
                    <Mail size={20} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium leading-none text-zinc-300"
                >
                  Password
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                    disabled={loginMutation.isPending}
                    className="flex w-full h-12 rounded-lg border border-border-dark bg-surface-dark/50 px-4 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-nexus-teal focus:ring-1 focus:ring-nexus-teal focus:shadow-[0_0_10px_rgba(45,212,191,0.2)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-zinc-500 hover:text-nexus-teal group-focus-within:text-nexus-teal transition-colors duration-300 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-zinc-600 bg-surface-dark/50 text-nexus-teal focus:ring-nexus-teal focus:ring-offset-bg-dark"
                />
                <span className="text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-sm font-bold text-nexus-teal hover:text-cyan-400 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-teal focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-digital text-zinc-900 hover:brightness-110 h-12 w-full shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transform hover:-translate-y-0.5 duration-200"
            >
              {loginMutation.isPending ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border-dark"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-bg-dark px-2 text-zinc-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-teal border border-border-dark bg-surface-dark/50 hover:bg-zinc-800 hover:text-white h-11 px-4 py-2 gap-2 text-zinc-300 hover:border-nexus-teal/30">
              <GoogleIcon className="h-5 w-5" />
              Google
            </button>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nexus-teal border border-border-dark bg-surface-dark/50 hover:bg-zinc-800 hover:text-white h-11 px-4 py-2 gap-2 text-zinc-300 hover:border-nexus-teal/30">
              <AppleIcon className="h-5 w-5" />
              Apple
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-text-secondary">
            Don't have an account?{" "}
            <button
              onClick={onNavigateSignup}
              className="font-bold text-nexus-teal hover:text-cyan-400 transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>
      </Spotlight>
    </div>
  );
};

export default LoginPage;
