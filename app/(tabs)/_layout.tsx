import { router, Tabs } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import useAuthStore from '@/hooks/useAuthStore';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Set background color for iOS
            backgroundColor: 'red', // Replace with your desired color
            position: 'absolute',
          },
          default: {
            // Set background color for other platforms
            backgroundColor: 'red', // Replace with your desired color
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="repo"
        options={{
          title: "Repo",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="folder.fill" color={color} />,

          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                if (isLoggedIn) {
                  router.push("/(tabs)/repo");
                } else {
                  router.push("/auth/login"); // Redirect to login if not logged in
                }
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="newtrap"
        options={{
          title: "New Trap",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="bug-report" size={28} color={color} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                if (isLoggedIn) {
                  router.push("/(tabs)/newtrap");
                } else {
                  router.push("/auth/login"); // Redirect to login if not logged in
                }
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" size={28} color={color} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                if (isLoggedIn) {
                  router.push("/(tabs)/settings");
                } else {
                  router.push("/auth/login"); // Redirect to login if not logged in
                }
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
