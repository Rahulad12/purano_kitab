/**
 * Theme System - Comprehensive theme combining all design tokens
 */

import { LIGHT_COLORS, DARK_COLORS } from "./colors";
import { TYPOGRAPHY } from "./typography";
import { SPACING } from "./spacing";

export type ThemeMode = "light" | "dark";

export interface Theme {
  mode: ThemeMode;
  colors: typeof LIGHT_COLORS;
  typography: typeof TYPOGRAPHY;
  spacing: typeof SPACING;
  radius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    round: number;
  };
  zIndex: {
    base: number;
    overlay: number;
    modal: number;
    notification: number;
  };
}

const createTheme = (mode: ThemeMode): Theme => ({
  mode,
  colors: mode === "light" ? LIGHT_COLORS : DARK_COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 999,
  },
  zIndex: {
    base: 0,
    overlay: 1000,
    modal: 10000,
    notification: 50000,
  },
});

export const lightTheme = createTheme("light");
export const darkTheme = createTheme("dark");

export const getTheme = (mode: ThemeMode): Theme => {
  return mode === "light" ? lightTheme : darkTheme;
};
