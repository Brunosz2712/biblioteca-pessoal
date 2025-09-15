// src/screens/SearchScreen.tsx
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Box, VStack, HStack, Text, Select, CheckIcon } from "native-base";
import Input from "../components/ui/Input";
import BookCard from "../components/ui/BookCard";
import { BooksAPI, Book } from "../services/firebase";
import { useAuth } from "../contexts/AuthContext";

export default function SearchScreen({ navigation }: any) {
  const { user } = useAuth();
  const [all, setAll] = useState<Book[]>([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string | "">("");
  const [genre, setGenre] = useState<string | "">("");

  useEffect(() => {
    (async () => {
      if (!user) return;
      const { items } = await BooksAPI.getPageByUser(user.uid, 200);
      setAll(items);
    })();
  }, [user?.uid]);

  const filtered = all.filter(b => {
    const textMatch = `${b.title} ${b.author}`.toLowerCase().includes(q.toLowerCase());
    const statusMatch = status ? b.status === status : true;
    const genreMatch = genre ? (b.genre || "").toLowerCase() === genre.toLowerCase() : true;
    return textMatch && statusMatch && genreMatch;
  });

  return (
    <Box flex={1} bg="coolGray.50" px={4} pt={3}>
      <VStack space={3}>
        <Input placeholder="Buscar por título ou autor" value={q} onChangeText={setQ} />
        <HStack space={3}>
          <Select flex={1} selectedValue={status} onValueChange={(v)=>setStatus(v)} placeholder="Status" _selectedItem={{ bg: "primary.100", endIcon: <CheckIcon /> }}>
            <Select.Item label="Todos" value="" />
            <Select.Item label="Quero ler" value="quero ler" />
            <Select.Item label="Lendo" value="lendo" />
            <Select.Item label="Lido" value="lido" />
          </Select>
          <Select flex={1} selectedValue={genre} onValueChange={(v)=>setGenre(v)} placeholder="Gênero" _selectedItem={{ bg: "primary.100", endIcon: <CheckIcon /> }}>
            <Select.Item label="Todos" value="" />
            <Select.Item label="Ficção" value="ficção" />
            <Select.Item label="Tecnologia" value="tecnologia" />
          </Select>
        </HStack>
        <FlatList
          data={filtered}
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
          ListEmptyComponent={<Text textAlign="center" mt={8}>Nenhum resultado</Text>}
        />
      </VStack>
    </Box>
  );
}
