/**
 * Error Boundary - Global error handling for the application
 */

import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { SPACING, TYPOGRAPHY } from "../style";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[Error Boundary]", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorScreen error={this.state.error} onReset={this.resetError} />;
    }

    return this.props.children;
  }
}

interface ErrorScreenProps {
  error: Error | null;
  onReset: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ error, onReset }) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
        </View>

        <Text style={[styles.title, { color: theme.colors.text }]}>
          Oops! Something went wrong
        </Text>

        <Text
          style={[styles.description, { color: theme.colors.textSecondary }]}
        >
          We encountered an unexpected error. Please try again or contact
          support if the problem persists.
        </Text>

        {__DEV__ && error && (
          <View
            style={[
              styles.errorDetails,
              {
                backgroundColor: theme.colors.backgroundSecondary,
                borderColor: theme.colors.error,
              },
            ]}
          >
            <Text style={[styles.errorTitle, { color: theme.colors.error }]}>
              Error Details (Development Only)
            </Text>
            <Text
              style={[
                styles.errorMessage,
                { color: theme.colors.textSecondary },
              ]}
            >
              {error.toString()}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={onReset}
        >
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
  },
  content: {
    width: "100%",
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: SPACING.xl,
  },
  errorIcon: {
    fontSize: 64,
  },
  title: {
    ...TYPOGRAPHY.h3,
    textAlign: "center",
    marginBottom: SPACING.md,
  },
  description: {
    ...TYPOGRAPHY.bodyMedium,
    textAlign: "center",
    marginBottom: SPACING.lg,
  },
  errorDetails: {
    width: "100%",
    padding: SPACING.lg,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: SPACING.lg,
    maxHeight: 200,
  },
  errorTitle: {
    ...TYPOGRAPHY.label,
    marginBottom: SPACING.sm,
  },
  errorMessage: {
    ...TYPOGRAPHY.bodySmall,
  },
  button: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: 8,
  },
  buttonText: {
    ...TYPOGRAPHY.label,
    color: "#FFFFFF",
    textAlign: "center",
  },
});
