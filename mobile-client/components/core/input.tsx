import { Input, makeStyles, useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface InputProps {
  label: string;
  onChangeText: any;
  value: any;
  isInvalid?: boolean;
  secure?: boolean;
}

const TextInput = (props: InputProps) => {
  const { label, secure, onChangeText, value } = props;
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };
  return (
    <Input
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secure}
      placeholderTextColor={theme.colors.onBackground}
      keyboardAppearance={theme.mode}
      onFocus={handleFocus}
      onBlur={handleBlur}
      inputContainerStyle={
        isFocus ? styles.inputContainerStyleFocus : styles.inputContainerStyle
      }
      labelStyle={isFocus ? styles.labelStyleFocus : styles.labelStyle}
      containerStyle={styles.containerStyle}
      inputStyle={styles.inputStyle}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  inputContainerStyle: {
    borderColor: theme.colors.onBackground,
    marginVertical: 10,
  },
  inputContainerStyleFocus: {
    borderColor: theme.colors.primary,
    marginVertical: 10,
  },
  labelStyle: {
    color: theme.colors.onBackground,
  },
  labelStyleFocus: {
    color: theme.colors.primary,
  },
  inputStyle: {
    marginLeft: 10,
    color: theme.colors.onBackground,
  },
  containerStyle: {
    width: SCREEN_WIDTH - 50,
  },
}));

export default TextInput;
