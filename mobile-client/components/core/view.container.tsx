import { useTheme } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import ThemeToggler from "./theme.toggler";

const ViewContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        { backgroundColor: theme.colors.background },
        styles.inputContainer,
      ]}
    >
      <ThemeToggler />
      {children}
    </View>
  );
};

export default ViewContainer;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    padding: 2,
  },
});
