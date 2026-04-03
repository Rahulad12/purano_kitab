/**
 * Toast Notifications - Centralized toast utility
 */

import Toast from "react-native-toast-message";

export const showSuccess = (message: string, title: string = "Success") => {
  Toast.show({
    type: "success",
    text1: title,
    text2: message,
  });
};

export const showError = (message: string, title: string = "Error") => {
  Toast.show({
    type: "error",
    text1: title,
    text2: message,
  });
};

export const showInfo = (message: string, title: string = "Info") => {
  Toast.show({
    type: "info",
    text1: title,
    text2: message,
  });
};

export const showWarning = (message: string, title: string = "Warning") => {
  Toast.show({
    type: "warning",
    text1: title,
    text2: message,
  });
};
