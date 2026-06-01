import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { QUICK } from "../data/dashboardData";

export default function QuickAccess() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Access</Text>

      <View style={styles.grid}>
        {QUICK.map((item) => (
          <TouchableOpacity key={item.title} style={styles.card}>
            <Text style={{ fontSize: 26 }}>{item.emoji}</Text>
            <Text style={styles.text}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 13,
  },
  title: {
    marginHorizontal: 16,
    fontSize: 13,
    fontWeight: "700",
    color: "#7B7570",
    textTransform: "uppercase",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 16,
    gap: 10,
  },
  card: {
    width: "47%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E8E3DE",
    alignItems: "center",
  },
  text: {
    marginTop: 8,
    fontWeight: "600",
    fontSize: 13,
  },
});