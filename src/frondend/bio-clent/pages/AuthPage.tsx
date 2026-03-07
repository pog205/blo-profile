import React, { useState } from "react";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <LoginPage onNavigateSignup={() => setIsLogin(false)} />
  ) : (
    <SignupPage onNavigateLogin={() => setIsLogin(true)} />
  );
};

export default AuthPage;
