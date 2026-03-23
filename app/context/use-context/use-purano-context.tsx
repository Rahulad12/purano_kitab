import { useContext } from "react";
import { PuranoKitabContext } from "../puranokitab-context";

export const usePuranoContext = () => {
  const context = useContext(PuranoKitabContext);
  if (!context) {
    throw new Error(
      "usePuranoContext must be used within a PuranoKitabProvider",
    );
  }
  return context;
};
