import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  LayoutGrid,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

// Brand icons using Bootstrap Icons
export const GoogleIcon = ({ className }: { className?: string }) => (
  <i className={`bi bi-google ${className}`}></i>
);

export const AppleIcon = ({ className }: { className?: string }) => (
  <i className={`bi bi-apple ${className}`}></i>
);

export { LayoutGrid, Mail, Lock, Eye, EyeOff, User, ShieldCheck, ArrowRight };
