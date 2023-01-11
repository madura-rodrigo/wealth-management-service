import { ThemeMode, useTheme, useThemeMode } from "@rneui/themed";
import React, { useEffect } from "react";
import { useColorScheme, View } from "react-native";

// type Props = {
//   children: React.ReactNode;
// };

const ColorTransform: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useTheme();
  // const { setMode } = useThemeMode();

  // useEffect(() => {
  //   setMode(theme.mode);
  // }, [theme.mode]);

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <>{children}</>
    </View>
  );
};

export default ColorTransform;
