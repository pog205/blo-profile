import React, { createContext, useContext, useCallback, useRef } from "react";
import { ProfileState } from "../types";

// --- Context type ---
interface ProfileContextValue {
  profile: ProfileState;
  /**
   * Cập nhật profile field.
   * - Luôn update UI local ngay lập tức.
   * - `immediate = true`  → gọi API ngay (select, color picker).
   * - `immediate = false`  → debounce 500ms rồi mới gọi API (text input, slider).
   */
  handleProfileChange: (
    key: keyof ProfileState,
    value: string | number,
    immediate?: boolean
  ) => void;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

// --- Custom hook ---
export const useProfile = (): ProfileContextValue => {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfile() must be used within <ProfileProvider>");
  }
  return ctx;
};

// --- Provider props ---
interface ProfileProviderProps {
  children: React.ReactNode;
  profile: ProfileState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState>>;
  /** Hàm gọi API mutation (đã có sẵn ở CustomPage) */
  saveToApi: (key: keyof ProfileState, value: string | number) => void;
}

// --- Provider component ---
export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
  profile,
  setProfile,
  saveToApi,
}) => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleProfileChange = useCallback(
    (key: keyof ProfileState, value: string | number, immediate = false) => {
      // 1️⃣ Luôn update UI local trước
      setProfile((prev) => ({ ...prev, [key]: value }));

      // 2️⃣ Gọi API
      if (immediate) {
        // Xóa debounce cũ nếu có, rồi gọi ngay
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
          debounceRef.current = null;
        }
        saveToApi(key, value);
      } else {
        // Debounce 500ms
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
          saveToApi(key, value);
        }, 500);
      }
    },
    [setProfile, saveToApi]
  );

  return (
    <ProfileContext.Provider value={{ profile, handleProfileChange }}>
      {children}
    </ProfileContext.Provider>
  );
};
