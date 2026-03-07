/**
 * Toast Notification Utilities
 * Wrapper functions for Sonner toast notifications
 */

import { toast as sonnerToast } from 'sonner';

/**
 * Centralized toast notifications
 */
export const toast = {
  /**
   * Success toast
   */
  success: (message: string, description?: string) => {
    sonnerToast.success(message, {
      description,
      duration: 4000,
    });
  },

  /**
   * Error toast
   */
  error: (message: string, description?: string) => {
    sonnerToast.error(message, {
      description,
      duration: 5000,
    });
  },

  /**
   * Info toast
   */
  info: (message: string, description?: string) => {
    sonnerToast.info(message, {
      description,
      duration: 4000,
    });
  },

  /**
   * Warning toast
   */
  warning: (message: string, description?: string) => {
    sonnerToast.warning(message, {
      description,
      duration: 4000,
    });
  },

  /**
   * Loading toast (returns toast ID to dismiss later)
   */
  loading: (message: string) => {
    return sonnerToast.loading(message);
  },

  /**
   * Promise toast - auto handles loading/success/error states
   */
  promise: <T,>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return sonnerToast.promise(promise, options);
  },

  /**
   * Dismiss a specific toast or all toasts
   */
  dismiss: (toastId?: string | number) => {
    sonnerToast.dismiss(toastId);
  },
};

/**
 * Auth-specific toast notifications
 */
export const authToast = {
  loginSuccess: (username?: string) => {
    toast.success(
      'Welcome back!',
      username ? `Logged in as ${username}` : 'Successfully logged in'
    );
  },

  loginError: (error?: string) => {
    toast.error(
      'Login failed',
      error || 'Invalid email or password. Please try again.'
    );
  },

  registerSuccess: () => {
    toast.success(
      'Account created!',
      'Welcome! You can now log in to your account.'
    );
  },

  registerError: (error?: string) => {
    toast.error(
      'Registration failed',
      error || 'Unable to create account. Please try again.'
    );
  },

  logoutSuccess: () => {
    toast.info('Logged out', 'See you next time!');
  },
};

/**
 * API-specific toast notifications
 */
export const apiToast = {
  createSuccess: (entityName: string) => {
    toast.success(`${entityName} created successfully`);
  },

  updateSuccess: (entityName: string) => {
    toast.success(`${entityName} updated successfully`);
  },

  deleteSuccess: (entityName: string) => {
    toast.success(`${entityName} deleted successfully`);
  },

  error: (message: string, error?: any) => {
    const errorMessage = error?.message || error || 'Something went wrong';
    toast.error(message, errorMessage);
  },
};
