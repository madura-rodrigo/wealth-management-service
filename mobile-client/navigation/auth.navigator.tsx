import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from "../screens/login.screen";
import SignUpScreen from "../screens/signup.screen";

export type RootStackParamList = {
  splash: undefined;
  signIn: undefined;
  signUp: undefined;
};

const AuthNavigator = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="signIn">
        <Stack.Screen
          name="signIn"
          component={LoginScreen}
          options={{ title: "Sign In" }}
        ></Stack.Screen>
        <Stack.Screen
          name="signUp"
          component={SignUpScreen}
          options={{ title: "Sign Up" }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
