import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppTabs from "./AppTabs";
import AddBookScreen from "../screens/AddBookScreen";
import BookDetailScreen from "../screens/BookDetailScreen";
import EditBookScreen from "../screens/EditBookScreen";

export type RootStackParamList = {
  Tabs: undefined;
  AddBook: undefined;
  BookDetail: { id: string };
  EditBook: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// 🔧 Relaxa a tipagem do TS
const StackNavigator = Stack.Navigator as unknown as React.ComponentType<any>;
const StackScreen = Stack.Screen as unknown as React.ComponentType<any>;

export default function RootNavigator() {
  return (
    <StackNavigator>
      <StackScreen name="Tabs" component={AppTabs as any} options={{ headerShown: false }} />
      <StackScreen name="AddBook" component={AddBookScreen as any} options={{ title: "Adicionar Livro" }} />
      <StackScreen name="BookDetail" component={BookDetailScreen as any} options={{ title: "Detalhes" }} />
      <StackScreen name="EditBook" component={EditBookScreen as any} options={{ title: "Editar Livro" }} />
    </StackNavigator>
  );
}
