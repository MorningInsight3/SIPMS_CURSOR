import { useEffect, useState } from "react";
import * as Linking from "expo-linking";

import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { ThemeProvider, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/useColorScheme";
import SplashScreenComponent from "@/components/splashScreen/SplashScreen";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LogBox } from "react-native";
import useAuthStore from "@/hooks/useAuthStore";

// Protected routes that require authentication
const PROTECTED_ROUTES = ["(tabs)/settings", "traps", "(tabs)/repo", "(tabs)/newtrap"];

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const queryClient = new QueryClient();

  LogBox.ignoreAllLogs();//Ignore all log notifications
  const router = useRouter();
  const segments = useSegments();

  const user = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // Check if app was opened via deep link
  useEffect(() => {
    const checkDeepLink = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        console.log("Opened via deep link:", initialUrl);
        setIsSplashVisible(false); // Skip splash screen
      }
    };

    checkDeepLink();
  }, []);

  // Handle initial navigation after splash screen
  useEffect(() => {
    if (!isSplashVisible) {
      if (!user) {
        router.replace("/auth/login"); // Redirect to login if not logged in
      }
    }
  }, [isSplashVisible, user]);

  // Improved route protection using segments
  useEffect(() => {
    if (!segments.length) return;
    
    const inProtectedRoute = PROTECTED_ROUTES.some(route => 
      segments.join('/').includes(route)
    );
    
    if (inProtectedRoute && !isLoggedIn) {
      console.log("Unauthorized access attempt to protected route:", segments.join('/'));
      router.replace("/auth/login");
    }
  }, [segments, isLoggedIn]);

  if (isSplashVisible) {
    return <SplashScreenComponent setIsSplashVisible={setIsSplashVisible} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Slot />
        </Stack>
        <StatusBar style="auto" />
        <Toast />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
