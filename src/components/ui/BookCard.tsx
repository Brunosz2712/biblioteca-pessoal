// src/components/ui/BookCard.tsx
import React from "react";
import { Pressable } from "react-native";
import { Box, HStack, VStack, Text, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { lightTheme } from "../../theme/theme";

type Props = {
  title: string;
  author: string;
  favorite?: boolean;
  status?: string;
  onPress?: () => void;
};
export default function BookCard({ title, author, favorite, status, onPress }: Props) {
  return (
    <Pressable onPress={onPress}>
      <Box bg="white" borderWidth={1} borderColor="coolGray.200" p={4} rounded="xl" mb={3}>
        <HStack alignItems="center" justifyContent="space-between">
          <VStack>
            <Text fontSize="md" fontWeight="bold" color={lightTheme.colors.text}>{title}</Text>
            <Text fontSize="sm" color={lightTheme.colors.textMuted}>{author}</Text>
            {status ? <Text mt={1} fontSize="xs" color="coolGray.600">Status: {status}</Text> : null}
          </VStack>
          {favorite ? <Icon as={Ionicons} name="heart" size="lg" color="red.500" /> : null}
        </HStack>
      </Box>
    </Pressable>
  );
}
