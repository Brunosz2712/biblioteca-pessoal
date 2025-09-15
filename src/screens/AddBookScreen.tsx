// src/screens/AddBookScreen.tsx
import React, { useState } from "react";
import { Box, VStack, Text, Switch, HStack, Select, CheckIcon } from "native-base";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { BooksAPI } from "../services/firebase";
import { useAuth } from "../contexts/AuthContext";

export default function AddBookScreen({ navigation }: any) {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState<"quero ler" | "lendo" | "lido" | undefined>("quero ler");
  const [favorite, setFavorite] = useState(false);
  const canSave = title.trim().length >= 2 && author.trim().length >= 2;

  const onSave = async () => {
    if (!user) return;
    await BooksAPI.add({
      userId: user.uid,
      title: title.trim(),
      author: author.trim(),
      genre: genre || undefined,
      status,
      favorite,
      createdAt: BooksAPI.now(),
    });
    navigation.goBack();
  };

  return (
    <Box flex={1} bg="coolGray.50" px={4} pt={4}>
      <VStack space={3}>
        <Text fontSize="xl" fontWeight="bold">Novo Livro</Text>
        <Input placeholder="Título" value={title} onChangeText={setTitle} />
        <Input placeholder="Autor" value={author} onChangeText={setAuthor} />
        <Input placeholder="Gênero (opcional)" value={genre} onChangeText={setGenre} />
        <Select selectedValue={status} onValueChange={(v)=>setStatus(v as any)} _selectedItem={{ bg: "primary.100", endIcon: <CheckIcon /> }}>
          <Select.Item label="Quero ler" value="quero ler" />
          <Select.Item label="Lendo" value="lendo" />
          <Select.Item label="Lido" value="lido" />
        </Select>
        <HStack alignItems="center" space={3}>
          <Text>Favorito</Text>
          <Switch isChecked={favorite} onToggle={()=>setFavorite((f)=>!f)} />
        </HStack>
        <Button onPress={onSave} isDisabled={!canSave}>Salvar</Button>
      </VStack>
    </Box>
  );
}
