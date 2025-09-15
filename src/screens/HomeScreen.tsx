// src/screens/HomeScreen.tsx
import React, { useEffect, useState, useCallback } from "react";
import { RefreshControl, FlatList } from "react-native";
import { Box, Fab, Icon, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import BookCard from "../components/ui/BookCard";
import { BooksAPI, Book } from "../services/firebase";
import { useAuth } from "../contexts/AuthContext";

export default function HomeScreen({ navigation }: any) {
  const { user } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [cursor, setCursor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = async (reset = false) => {
    if (!user) return;
    if (reset) { setCursor(null); setBooks([]); }
    const { items, cursor: c } = await BooksAPI.getPageByUser(user.uid, 15, reset ? null : cursor);
    setBooks((prev) => reset ? items : [...prev, ...items]);
    setCursor(c);
    setLoading(false);
    if (refreshing) setRefreshing(false);
  };

  useEffect(() => { load(true); }, [user?.uid]);

  const onRefresh = useCallback(() => { setRefreshing(true); load(true); }, []);

  return (
    <Box flex={1} bg="coolGray.50" px={4} pt={3}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <BookCard
            title={item.title}
            author={item.author}
            favorite={item.favorite}
            status={item.status}
            onPress={() => navigation.navigate("BookDetail", { id: item.id })}
          />
        )}
        ListEmptyComponent={!loading ? <Text textAlign="center" mt={8}>Sua lista está vazia. Adicione seu primeiro livro!</Text> : null}
        onEndReached={() => cursor && load(false)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <Fab renderInPortal={false} size="lg" onPress={() => navigation.navigate("AddBook")} icon={<Icon as={Ionicons} name="add" />} />
    </Box>
  );
}
