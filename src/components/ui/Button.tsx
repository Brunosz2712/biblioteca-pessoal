// src/components/ui/Button.tsx
import React from "react";
import { Button as NBButton, IButtonProps } from "native-base";
export default function Button(props: IButtonProps) {
  return <NBButton {...props} />;
}
