/**
 * App Constants - Global constants
 */

export const API_CONFIG = {
  BASE_URL: process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api",
  TIMEOUT: 30000,
  RETRY_COUNT: 3,
  CACHE_TIME: 5 * 60 * 1000,
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
  USER_DATA: "user_data",
  THEME_MODE: "theme_mode",
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
};

export const ERROR_MESSAGES = {
  NETWORK: "Network connection failed. Please try again.",
  UNAUTHORIZED: "Please log in to continue.",
  NOT_FOUND: "The requested item was not found.",
  VALIDATION: "Please check your input and try again.",
  SERVER: "Server error. Please try again later.",
  UNKNOWN: "An unexpected error occurred.",
};

export const SUCCESS_MESSAGES = {
  LOGIN: "Welcome back!",
  REGISTER: "Account created successfully!",
  BOOK_ADDED: "Book listed successfully!",
  ADDED_FAVORITE: "Added to favorites!",
  REMOVED_FAVORITE: "Removed from favorites!",
};

export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
};
