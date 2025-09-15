// src/components/ui/Input.tsx
import React from "react";
import { Input as NBInput, IInputProps } from "native-base";
export default function Input(props: IInputProps) {
  return <NBInput size="md" bg="white" borderColor="coolGray.200" {...props} />;
}
