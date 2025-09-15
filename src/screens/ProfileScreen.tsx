// src/screens/ProfileScreen.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Box, VStack, Text, HStack, Button as NBButton } from "native-base";
import { useAuth } from "../contexts/AuthContext";
import { BooksAPI, Book } from "../services/firebase";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const { items } = await BooksAPI.getPageByUser(user.uid, 500);
      setBooks(items);
    })();
  }, [user?.uid]);

  const stats = useMemo(() => ({
    total: books.length,
    lidos: books.filter(b => b.status === "lido").length,
    lendo: books.filter(b => b.status === "lendo").length,
    quero: books.filter(b => b.status === "quero ler").length,
  }), [books]);

  return (
    <Box flex={1} bg="coolGray.50" px={4} pt={4}>
      <VStack space={3}>
        <Text fontSize="xl" fontWeight="bold">Perfil</Text>
        <Text>Email: {user?.email}</Text>
        <HStack space={4} mt={2}>
          <Box bg="white" p={4} rounded="xl" borderWidth={1} borderColor="coolGray.200"><Text>Total: {stats.total}</Text></Box>
          <Box bg="white" p={4} rounded="xl" borderWidth={1} borderColor="coolGray.200"><Text>Lidos: {stats.lidos}</Text></Box>
          <Box bg="white" p={4} rounded="xl" borderWidth={1} borderColor="coolGray.200"><Text>Lendo: {stats.lendo}</Text></Box>
          <Box bg="white" p={4} rounded="xl" borderWidth={1} borderColor="coolGray.200"><Text>Quero ler: {stats.quero}</Text></Box>
        </HStack>
        <NBButton onPress={logout} colorScheme="red" mt={6}>Sair</NBButton>
      </VStack>
    </Box>
  );
}
