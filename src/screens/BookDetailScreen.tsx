// src/screens/BookDetailScreen.tsx
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Box, VStack, Text, HStack, Icon, Button as NBButton } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { BooksAPI, Book } from "../services/firebase";

export default function BookDetailScreen({ route, navigation }: any) {
  const { id } = route.params as { id: string };
  const [book, setBook] = useState<Book | null>(null);

  const load = async () => {
    const b = await BooksAPI.getById(id);
    setBook(b);
  };
  useEffect(() => { load(); }, [id]);

  const onDelete = async () => {
    Alert.alert("Excluir", "Deseja remover este livro?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Remover", style: "destructive", onPress: async () => {
        await BooksAPI.remove(id);
        navigation.goBack();
      } }
    ]);
  };

  if (!book) return null;

  return (
    <Box flex={1} bg="coolGray.50" px={4} pt={4}>
      <VStack space={2}>
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="2xl" fontWeight="bold">{book.title}</Text>
          <Icon as={Ionicons} name={book.favorite ? "heart" : "heart-outline"} size="lg" color="red.500" />
        </HStack>
        <Text color="coolGray.700">Autor: {book.author}</Text>
        {book.genre ? <Text color="coolGray.700">Gênero: {book.genre}</Text> : null}
        {book.status ? <Text color="coolGray.700">Status: {book.status}</Text> : null}

        <HStack mt={6} space={3}>
          <NBButton onPress={() => navigation.navigate("EditBook", { id })}>Editar</NBButton>
          <NBButton colorScheme="danger" onPress={onDelete}>Excluir</NBButton>
        </HStack>
      </VStack>
    </Box>
  );
}
