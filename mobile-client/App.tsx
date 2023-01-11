import AuthNavigator from "./navigation/auth.navigator";
import { ThemeProvider } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "./theme/theme";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadAssets();
  });

  const loadAssets = async () => {
    //Load fornts and images
    setIsReady(true);
  };

  const onLayoutRootView = React.useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <ThemeProvider theme={theme}>
        <AuthNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
