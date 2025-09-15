// src/screens/RegisterScreen.tsx
import React, { useState } from "react";
import { Box, VStack, Text } from "native-base";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";

export default function RegisterScreen() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const valid = name.length >= 2 && email.includes("@") && password.length >= 6;

  const onSubmit = async () => {
    try {
      setLoading(true); setError(null);
      await register(email.trim(), password, name.trim());
    } catch {
      setError("Falha no cadastro. Tente novamente.");
    } finally { setLoading(false); }
  };

  return (
    <Box flex={1} bg="coolGray.50" px={6} justifyContent="center">
      <VStack space={4}>
        <Text fontSize="2xl" fontWeight="bold">Criar conta</Text>
        <Input placeholder="Nome" value={name} onChangeText={setName} />
        <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <Input placeholder="Senha (mín. 6)" value={password} onChangeText={setPassword} secureTextEntry />
        {error ? <Text color="red.500">{error}</Text> : null}
        <Button isDisabled={!valid} isLoading={loading} onPress={onSubmit}>Cadastrar</Button>
      </VStack>
    </Box>
  );
}
