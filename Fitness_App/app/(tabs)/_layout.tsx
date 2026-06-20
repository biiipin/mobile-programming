import { Tabs } from "expo-router";
import { ChartColumn, Dumbbell, House, User } from "lucide-react-native";

import React from "react";
import { Platform, StyleSheet } from "react-native";

import { Colors } from "../../constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,

        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({ color, size }) => <House color={color} size={size} />,
        }}
      />

      <Tabs.Screen
        name="workout"
        options={{
          title: "Workout",

          tabBarIcon: ({ color, size }) => (
            <Dumbbell color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="progress"
        options={{
          title: "Progress",

          tabBarIcon: ({ color, size }) => (
            <ChartColumn color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,

    borderTopWidth: 1,

    borderTopColor: Colors.border,

    height: Platform.OS === "ios" ? 88 : 64,

    paddingTop: 8,

    paddingBottom: Platform.OS === "ios" ? 28 : 8,

    elevation: 0,

    shadowOpacity: 0,
  },

  tabBarLabel: {
    fontSize: 11,

    fontWeight: "600",

    marginTop: 2,
  },

  tabBarItem: {
    paddingTop: 4,
  },
});
