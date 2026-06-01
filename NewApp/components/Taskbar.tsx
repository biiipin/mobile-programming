import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";
import { TABS } from "../data/dashboardData";

type Props = {
  active: string;
  onChange: (tab: string) => void;
};

export default function Taskbar({ active, onChange }: Props) {
  return (
    <View style={styles.bar}>
      {TABS.map((tab) => {
        const isActive = active === tab.name;

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.item}
            onPress={() => onChange(tab.name)}
          >
            <Text style={{ fontSize: 25 }}>{tab.emoji}</Text>

            <Text style={[styles.label, isActive && styles.active]}>
              {tab.name}
            </Text>

            {isActive && <View style={styles.dot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: 8,
  },

  item: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },

  label: {
    fontSize: 13,
    color: COLORS.gray,
    fontWeight: "600",
  },

  active: {
    color: COLORS.red,
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.red,
    marginTop: 2,
  },
});