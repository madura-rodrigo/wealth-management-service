import { createTheme } from "@rneui/themed";

export const theme = createTheme({
  lightColors: {
    primary: "#784a9a",
    onPrimary: "#ffffff",
    primaryContainer: "#f2daff",
    onPrimaryContainer: "#2e004d",
    secondary: "#5954a8",
    onSecondary: "#ffffff",
    secondaryContainer: "#e3dfff",
    onSecondaryContainer: "#140463",
    tertiary: "#006d43",
    onTertiary: "#ffffff",
    tertiaryContainer: "#92f7bc",
    onTertiaryContainer: "#002111",
    error: "#ba1a1a",
    errorContainer: "#ffdad6",
    onError: "#ffffff",
    onErrorContainer: "#410002",
    background: "#fffbff",
    onBackground: "#1f1c00",
    surface: "#fffbff",
    onSurface: "#1f1c00",
    surfaceVariant: "#eadfea",
    onSurfaceVariant: "#4b454d",
    outline: "#7c757e",
  },
  darkColors: {
    primary: "#e1b6ff",
    onPrimary: "#461968",
    primaryContainer: "#5e3280",
    onPrimaryContainer: "#f2daff",
    secondary: "#c5c0ff",
    onSecondary: "#2a2277",
    secondaryContainer: "#413b8e",
    onSecondaryContainer: "#e3dfff",
    tertiary: "#76daa2",
    onTertiary: "#003921",
    tertiaryContainer: "#005231",
    onTertiaryContainer: "#92f7bc",
    error: "#ffb4ab",
    errorContainer: "#93000a",
    onError: "#690005",
    onErrorContainer: "#ffdad6",
    background: "#1f1c00",
    onBackground: "#f2e66a",
    surface: "#1f1c00",
    onSurface: "#f2e66a",
    surfaceVariant: "#4b454d",
    onSurfaceVariant: "#cdc3ce",
    outline: "#968e98",
  },
  mode: "dark",
  components: {
    Button: () => ({
      containerStyle: {
        margin: 10,
        padding: 5,
      },
    }),
  },
});
