// src/screens/FavoritesScreen.tsx
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Box, Text } from "native-base";
import BookCard from "../components/ui/BookCard";
import { BooksAPI, Book } from "../services/firebase";
import { useAuth } from "../contexts/AuthContext";

export default function FavoritesScreen({ navigation }: any) {
  const { user } = useAuth();
  const [items, setItems] = useState<Book[]>([]);

  useEffect(() => {
    (async () => {
      if (!user) return;
      const { items } = await BooksAPI.getPageByUser(user.uid, 400);
      setItems(items.filter(b => b.favorite));
    })();
  }, [user?.uid]);

  return (
    <Box flex={1} bg="coolGray.50" px={4} pt={3}>
      <FlatList
        data={items}
        keyExtractor={(i)=>i.id!}
        renderItem={({ item }) => (
          <BookCard
            title={item.title}
            author={item.author}
            favorite={item.favorite}
            status={item.status}
            onPress={() => navigation.navigate("BookDetail", { id: item.id })}
          />
        )}
        ListEmptyComponent={<Text textAlign="center" mt={8}>Nenhum favorito ainda</Text>}
      />
    </Box>
  );
}
