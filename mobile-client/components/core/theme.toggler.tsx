import { Switch, useTheme, useThemeMode } from "@rneui/themed";
import React, { useEffect } from "react";

const ThemeToggler = () => {
  const { theme } = useTheme();
  const { mode, setMode } = useThemeMode();
  const toggle = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <Switch
      color={theme.colors.primary}
      trackColor={{
        false: theme.colors.primaryContainer,
        true: theme.colors.onPrimaryContainer,
      }}
      onValueChange={toggle}
      value={mode === "light"}
    />
  );
};

export default ThemeToggler;
