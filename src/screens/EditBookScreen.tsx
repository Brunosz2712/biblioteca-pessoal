// src/screens/EditBookScreen.tsx
import React, { useEffect, useState } from "react";
import { Box, VStack, Text, Switch, HStack, Select, CheckIcon } from "native-base";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { BooksAPI, Book } from "../services/firebase";

export default function EditBookScreen({ route, navigation }: any) {
  const { id } = route.params as { id: string };
  const [book, setBook] = useState<Book | null>(null);
  const [title, setTitle] = useState(""); const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState(""); const [status, setStatus] = useState<any>("lendo");
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    (async () => {
      const b = await BooksAPI.getById(id);
      if (b) {
        setBook(b);
        setTitle(b.title); setAuthor(b.author);
        setGenre(b.genre || ""); setStatus(b.status || "lendo");
        setFavorite(!!b.favorite);
      }
    })();
  }, [id]);

  const onSave = async () => {
    await BooksAPI.update(id, { title, author, genre, status, favorite });
    navigation.goBack();
  };

  if (!book) return null;
  return (
    <Box flex={1} bg="coolGray.50" px={4} pt={4}>
      <VStack space={3}>
        <Text fontSize="xl" fontWeight="bold">Editar Livro</Text>
        <Input placeholder="Título" value={title} onChangeText={setTitle} />
        <Input placeholder="Autor" value={author} onChangeText={setAuthor} />
        <Input placeholder="Gênero (opcional)" value={genre} onChangeText={setGenre} />
        <Select selectedValue={status} onValueChange={(v)=>setStatus(v)} _selectedItem={{ bg: "primary.100", endIcon: <CheckIcon /> }}>
          <Select.Item label="Quero ler" value="quero ler" />
          <Select.Item label="Lendo" value="lendo" />
          <Select.Item label="Lido" value="lido" />
        </Select>
        <HStack alignItems="center" space={3}>
          <Text>Favorito</Text>
          <Switch isChecked={favorite} onToggle={()=>setFavorite((f)=>!f)} />
        </HStack>
        <Button onPress={onSave}>Salvar alterações</Button>
      </VStack>
    </Box>
  );
}
