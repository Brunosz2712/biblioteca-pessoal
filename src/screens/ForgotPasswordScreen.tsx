// src/screens/ForgotPasswordScreen.tsx
import React, { useState } from "react";
import { Box, VStack, Text } from "native-base";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";

export default function ForgotPasswordScreen() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const onSubmit = async () => {
    await resetPassword(email.trim());
    setMsg("Se o email existir, você receberá instruções para redefinir a senha.");
  };

  return (
    <Box flex={1} bg="coolGray.50" px={6} justifyContent="center">
      <VStack space={4}>
        <Text fontSize="2xl" fontWeight="bold">Recuperar senha</Text>
        <Input placeholder="Seu email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <Button isDisabled={!email.includes("@")} onPress={onSubmit}>Enviar</Button>
        {msg ? <Text color="green.600">{msg}</Text> : null}
      </VStack>
    </Box>
  );
}
