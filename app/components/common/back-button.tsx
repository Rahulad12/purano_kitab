import React from "react";
import Button from "../ui/Button";

const BackButton = () => {
  return (
    <Button
      variant="link"
      onPress={() => {
        window.history.back();
      }}
    >
      Back
    </Button>
  );
};

export default BackButton;
