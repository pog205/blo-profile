// src/utils/fromDelay.ts
import { useCallback, useRef } from "react";

export const useDebounceCallback = (callback: Function, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: any[]) => {
      // Nếu đang gõ/kéo thanh trượt, xóa cái hẹn giờ cũ đi
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Đặt cái hẹn giờ mới
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};