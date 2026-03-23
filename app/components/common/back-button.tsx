import { useRouter } from "expo-router";
import React from "react";
import Button from "../ui/Button";

const BackButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="link"
      onPress={() => {
        router.back();
      }}
    >
      Back
    </Button>
  );
};

export default BackButton;
