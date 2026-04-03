/**
 * Style Index - Export all design tokens and utilities
 */

export { LIGHT_COLORS, DARK_COLORS } from "./colors";
export type { ColorScheme } from "./colors";

export { TYPOGRAPHY } from "./typography";
export type { TypographyKey } from "./typography";

export { SPACING, PADDING, GAP } from "./spacing";
export type { SpacingKey } from "./spacing";

export { SHADOWS, getShadow } from "./shadows";
export type { ShadowLevel } from "./shadows";

export { lightTheme, darkTheme, getTheme } from "./theme";
export type { Theme, ThemeMode } from "./theme";

export {
  API_CONFIG,
  STORAGE_KEYS,
  PAGINATION,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  VALIDATION,
} from "./constants";

export { default as COLORS } from "./primaryColor";
export { default as globalStyles } from "./global";
