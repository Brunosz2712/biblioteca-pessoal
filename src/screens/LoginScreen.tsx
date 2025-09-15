// src/screens/LoginScreen.tsx
import React, { useState } from "react";
import { Box, VStack, Text, Link } from "native-base";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const canSubmit = email.includes("@") && password.length >= 6;

  const onSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      await login(email.trim(), password);
    } catch {
      setError("Falha no login. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flex={1} bg="coolGray.50" px={6} justifyContent="center">
      <VStack space={4}>
        <Text fontSize="2xl" fontWeight="bold">Bem-vindo(a)</Text>
        <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <Input placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />
        {error ? <Text color="red.500">{error}</Text> : null}
        <Button isDisabled={!canSubmit} isLoading={loading} onPress={onSubmit}>Entrar</Button>
        <Link onPress={() => navigation.navigate("ForgotPassword")} mt={2}>Esqueci minha senha</Link>
        <Link onPress={() => navigation.navigate("Register")} mt={2}>Criar conta</Link>
      </VStack>
    </Box>
  );
}
