import { color, makeStyles } from "@rneui/base";
import { Colors, Theme } from "@rneui/themed";

export const useGlobalStyles = makeStyles(
  (
    theme: {
      colors: Colors;
    } & Theme
  ) => ({
    primary: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.onPrimary,
    },

    primaryContainer: {
      backgroundColor: theme.colors.primaryContainer,
      color: theme.colors.onPrimaryContainer,
    },

    background: {
      backgroundColor: theme.colors.background,
      color: theme.colors.onBackground,
    },
  })
);
