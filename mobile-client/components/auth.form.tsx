import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Colors, Theme, useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../navigation/auth.navigator";
import { useGlobalStyles } from "../theme/styles";
import FlatButton from "./core/flat.button";
import TextInput from "./core/input";
import { ThemeType } from "./core/theme.type";
import ViewContainer from "./core/view.container";

interface AuthProps {
  isLogin: boolean;
  onSignUp?: any;
}

const AuthForm = (props: AuthProps) => {
  const { isLogin, onSignUp } = props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useTheme();
  const globlStyles = useGlobalStyles(theme);

  const navigator = useNavigation<StackNavigationProp<RootStackParamList>>();

  const switchAuthModeHandler = () => {
    if (isLogin) {
      navigator.replace("signUp");
    } else {
      navigator.replace("signIn");
    }
  };

  const submitHandler = () => {
    if (!isLogin) {
      onSignUp({
        firstName,
        lastName,
        email,
        password,
      });
    } else {
    }
  };

  return (
    <ViewContainer>
      <View style={styles(theme).textInputContainerStyles}>
        {!isLogin && (
          <TextInput
            label="First Name"
            onChangeText={setFirstName}
            value={firstName}
          />
        )}
        {!isLogin && (
          <TextInput
            label="Last Name"
            onChangeText={setLastName}
            value={lastName}
          />
        )}
        <TextInput label="Email" onChangeText={setEmail} value={email} />
        <TextInput
          label="Password"
          onChangeText={setPassword}
          value={password}
          secure
        />
        <View>
          <Button
            style={{ backgroundColor: theme.colors.primary }}
            buttonStyle={{ borderRadius: 20 }}
            titleStyle={{ color: theme.colors.onPrimary }}
            title={isLogin ? "Log In" : "Sign Up"}
            onPress={submitHandler}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ color: theme.colors.onBackground }}>
          {isLogin ? "Create a " : "Instead of "}
        </Text>
        <FlatButton
          style={styles(theme).flatButtonStyle}
          onPress={switchAuthModeHandler}
        >
          {isLogin ? "New user" : "Log in"}
        </FlatButton>
      </View>
    </ViewContainer>
  );
};

export default AuthForm;

const styles = (theme: ThemeType) =>
  StyleSheet.create({
    textInputContainerStyles: {
      marginTop: 80,
      padding: 12,
    },
    flatButtonStyle: {
      fontWeight: "bold",
      color: theme.colors.secondary,
    },
  });
