// App.tsx
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { NativeBaseProvider, extendTheme } from "native-base";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import AuthStack from "./src/navigation/AuthStack";
import RootNavigator from "./src/navigation/RootNavigator";
import { lightTheme } from "./src/theme/theme";

const nbTheme = extendTheme({
  colors: { primary: { 500: lightTheme.colors.primary, 600: lightTheme.colors.primaryAlt } },
  components: {
    Button: { baseStyle: { rounded: "xl" } },
    Input: { baseStyle: { rounded: "xl", _focus: { borderColor: "primary.500" } } },
  },
});

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: lightTheme.colors.background },
};

function Router() {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <RootNavigator /> : <AuthStack />;
}

export default function App() {
  return (
    <AuthProvider>
      <NativeBaseProvider theme={nbTheme}>
        <NavigationContainer theme={navTheme}>
          <Router />
        </NavigationContainer>
      </NativeBaseProvider>
    </AuthProvider>
  );
}
