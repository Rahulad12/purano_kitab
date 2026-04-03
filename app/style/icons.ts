/**
 * Icon System - Standardized icon configuration
 */

import { LIGHT_COLORS } from "./colors";

export type IconFamily = "MaterialCommunityIcons" | "Ionicons" | "Feather" | "FontAwesome5";

export const ICON_SIZES = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  xxl: 40,
} as const;

export const ICON_COLORS = {
  primary: LIGHT_COLORS.primary,
  secondary: LIGHT_COLORS.secondary,
  success: LIGHT_COLORS.success,
  warning: LIGHT_COLORS.warning,
  error: LIGHT_COLORS.error,
  info: LIGHT_COLORS.info,
  text: LIGHT_COLORS.text,
  textSecondary: LIGHT_COLORS.textSecondary,
  textTertiary: LIGHT_COLORS.textTertiary,
  price: LIGHT_COLORS.price,
  disabled: LIGHT_COLORS.disabled,
  white: "#FFFFFF",
  black: "#000000",
} as const;

export const ICON_NAMES = {
  home: { family: "Ionicons" as IconFamily, name: "home" },
  search: { family: "Feather" as IconFamily, name: "search" },
  heart: { family: "Feather" as IconFamily, name: "heart" },
  user: { family: "Feather" as IconFamily, name: "user" },
  menu: { family: "Feather" as IconFamily, name: "menu" },
  settings: { family: "Ionicons" as IconFamily, name: "settings" },
  plus: { family: "Feather" as IconFamily, name: "plus" },
  edit: { family: "Feather" as IconFamily, name: "edit-2" },
  trash: { family: "Feather" as IconFamily, name: "trash-2" },
  chevronRight: { family: "Feather" as IconFamily, name: "chevron-right" },
  chevronLeft: { family: "Feather" as IconFamily, name: "chevron-left" },
  back: { family: "Feather" as IconFamily, name: "arrow-left" },
  check: { family: "Feather" as IconFamily, name: "check" },
  close: { family: "Feather" as IconFamily, name: "x" },
  alert: { family: "Feather" as IconFamily, name: "alert-circle" },
  book: { family: "Feather" as IconFamily, name: "book" },
  eye: { family: "Feather" as IconFamily, name: "eye" },
  eyeOff: { family: "Feather" as IconFamily, name: "eye-off" },
  lock: { family: "Feather" as IconFamily, name: "lock" },
  message: { family: "Feather" as IconFamily, name: "message-square" },
  phone: { family: "Feather" as IconFamily, name: "phone" },
  mail: { family: "Feather" as IconFamily, name: "mail" },
  share: { family: "Feather" as IconFamily, name: "share-2" },
  filter: { family: "Feather" as IconFamily, name: "filter" },
  star: { family: "Feather" as IconFamily, name: "star" },
} as const;

export type IconName = keyof typeof ICON_NAMES;
