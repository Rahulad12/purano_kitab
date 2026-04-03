/**
 * Shadow System - Elevation shadows for iOS and Android
 */

import { Platform } from "react-native";

export const SHADOWS = {
  ios: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3.84,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    xl: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
    },
    xxl: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 16 },
      shadowOpacity: 0.35,
      shadowRadius: 20,
    },
  },
  android: {
    sm: { elevation: 2 },
    md: { elevation: 4 },
    lg: { elevation: 8 },
    xl: { elevation: 12 },
    xxl: { elevation: 16 },
  },
} as const;

export const getShadow = (level: "sm" | "md" | "lg" | "xl" | "xxl") => {
  return Platform.OS === "ios" ? SHADOWS.ios[level] : SHADOWS.android[level];
};

export type ShadowLevel = keyof typeof SHADOWS.ios;
