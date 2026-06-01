import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SUBJECTS } from "../data/dashboardData";
import { COLORS } from "../constants/colors";

export default function ContinueLearning() {
  return (
    <View>
      <Text style={styles.title}>Continue Learning</Text>

      {SUBJECTS.map((sub) => (
        <View key={sub.name} style={styles.card}>
          <Text style={styles.name}>{sub.name}</Text>
          <Text style={styles.chapter}>{sub.chapter}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    margin: 16,
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.gray,
    textTransform: "uppercase",
  },
  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  name: {
    fontSize:16,
    fontWeight: "700",
  },
  chapter: {
    fontSize: 14,
    color: COLORS.gray,
  },
});