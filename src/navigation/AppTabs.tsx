import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";

export type AppTabsParamList = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<AppTabsParamList>();

// 🔧 Relaxa a tipagem do TS (não afeta runtime)
const TabNavigator = Tab.Navigator as unknown as React.ComponentType<any>;
const TabScreen = Tab.Screen as unknown as React.ComponentType<any>;

export default function AppTabs() {
  return (
    <TabNavigator
      screenOptions={({ route }: any) => ({
        headerTitleAlign: "center",
        tabBarIcon: ({ size, color }: any) => {
          const m: Record<keyof AppTabsParamList, keyof typeof Ionicons.glyphMap> = {
            Home: "book-outline",
            Search: "search-outline",
            Favorites: "heart-outline",
            Profile: "person-outline",
          };
          return <Ionicons name={m[route.name as keyof AppTabsParamList]} size={size} color={color} />;
        },
      })}
    >
      <TabScreen name="Home" component={HomeScreen as any} options={{ title: "Meus Livros" }} />
      <TabScreen name="Search" component={SearchScreen as any} options={{ title: "Buscar" }} />
      <TabScreen name="Favorites" component={FavoritesScreen as any} options={{ title: "Favoritos" }} />
      <TabScreen name="Profile" component={ProfileScreen as any} options={{ title: "Perfil" }} />
    </TabNavigator>
  );
}
