import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

// 🔧 Relaxa a tipagem do TS
const StackNavigator = Stack.Navigator as unknown as React.ComponentType<any>;
const StackScreen = Stack.Screen as unknown as React.ComponentType<any>;

export default function AuthStack() {
  return (
    <StackNavigator screenOptions={{ headerShown: false }}>
      <StackScreen name="Login" component={LoginScreen as any} />
      <StackScreen name="Register" component={RegisterScreen as any} />
      <StackScreen name="ForgotPassword" component={ForgotPasswordScreen as any} />
    </StackNavigator>
  );
}
