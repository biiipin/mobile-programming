import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Activity,
  Flame,
  Play,
  Timer,
  TrendingUp,
  Zap,
} from "lucide-react-native";
import React from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "../../constants/colors";
import { Radius, Spacing } from "../../constants/theme";

const STATS = [
  {
    key: "dailyReps",
    label: "Daily Reps",
    value: "248",
    icon: Activity,
    color: Colors.primary,
  },
  {
    key: "workoutTime",
    label: "Workout Time",
    value: "32m",
    icon: Timer,
    color: Colors.secondary,
  },
  {
    key: "calories",
    label: "Calories",
    value: "486",
    icon: Flame,
    color: Colors.warning,
  },
  {
    key: "streak",
    label: "Streak",
    value: "12d",
    icon: Zap,
    color: Colors.accent,
  },
];

const RECENT_WORKOUTS = [
  {
    exercise: "Push-Up",
    reps: 45,
    duration: "8m",
    date: "Today",
  },
  {
    exercise: "Squat",
    reps: 60,
    duration: "12m",
    date: "Yesterday",
  },
  {
    exercise: "Jumping Jack",
    reps: 120,
    duration: "10m",
    date: "2 days ago",
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HERO */}

        <LinearGradient
          colors={[Colors.primaryDark, Colors.primary, Colors.secondaryDark]}
          style={styles.hero}
        >
          <View style={styles.badge}>
            <Zap size={14} color={Colors.accent} />

            <Text style={styles.badgeText}>12 Day Streak</Text>
          </View>

          <Text style={styles.smallText}>Ready to workout?</Text>

          <Text style={styles.heroTitle}>Today's Goal</Text>

          <View style={styles.goalRow}>
            <Text style={styles.goalNumber}>200</Text>

            <Text style={styles.goalUnit}>reps</Text>
          </View>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: "62%",
                },
              ]}
            />
          </View>

          <Text style={styles.progressText}>124 / 200 completed</Text>

          <TouchableOpacity
            style={styles.startButton}
            onPress={() => router.push("/(tabs)/workout")}
          >
            <LinearGradient
              colors={[Colors.accent, Colors.accentDark]}
              style={styles.buttonGradient}
            >
              <Play size={18} color="white" fill="white" />

              <Text style={styles.buttonText}>Quick Start</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>

        {/* STATS */}

        <View style={styles.statsGrid}>
          {STATS.map((item) => (
            <View key={item.key} style={styles.card}>
              <View
                style={[
                  styles.iconBox,
                  {
                    backgroundColor: item.color + "20",
                  },
                ]}
              >
                <item.icon size={20} color={item.color} />
              </View>

              <Text style={styles.value}>{item.value}</Text>

              <Text style={styles.label}>{item.label}</Text>
            </View>
          ))}
        </View>

        {/* RECENT WORKOUTS */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Workouts</Text>

          {RECENT_WORKOUTS.map((item, index) => (
            <View key={index} style={styles.workout}>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      index === 0 ? Colors.primary : Colors.accent,
                  },
                ]}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.workoutName}>{item.exercise}</Text>

                <Text style={styles.meta}>
                  {item.reps} reps · {item.duration}
                </Text>
              </View>

              <Text style={styles.meta}>{item.date}</Text>
            </View>
          ))}
        </View>

        {/* WEEKLY ACTIVITY */}

        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>This Week</Text>

            <TrendingUp size={18} color={Colors.accent} />
          </View>

          <View style={styles.chart}>
            {[40, 70, 50, 90, 60, 100, 30].map((height, index) => (
              <View key={index} style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      height,
                    },
                  ]}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingBottom: 40,
  },

  hero: {
    padding: 24,
    paddingTop: 60,
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
  },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 15,
  },

  badgeText: {
    color: "white",
    fontWeight: "600",
  },

  smallText: {
    color: "rgba(255,255,255,.7)",
    fontSize: 16,
  },

  heroTitle: {
    color: "white",
    fontSize: 34,
    fontWeight: "800",
  },

  goalRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  goalNumber: {
    color: "white",
    fontSize: 48,
    fontWeight: "800",
  },

  goalUnit: {
    color: "white",
    fontSize: 18,
  },

  progressBar: {
    height: 7,
    backgroundColor: "rgba(255,255,255,.3)",
    borderRadius: 20,
    marginTop: 15,
  },

  progressFill: {
    height: "100%",
    backgroundColor: Colors.accent,
    borderRadius: 20,
  },

  progressText: {
    color: "white",
    marginTop: 8,
  },

  startButton: {
    marginTop: 20,
    borderRadius: Radius.md,
    overflow: "hidden",
  },

  buttonGradient: {
    padding: 14,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    padding: 20,
  },

  card: {
    width: "47%",
    backgroundColor: Colors.card,
    padding: 16,
    borderRadius: Radius.lg,
  },

  iconBox: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  value: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: "700",
    marginTop: 10,
  },

  label: {
    color: Colors.textMuted,
  },

  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  sectionTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "700",
  },

  workout: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    padding: 15,
    borderRadius: 14,
    marginTop: 12,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },

  workoutName: {
    color: Colors.text,
    fontWeight: "700",
  },

  meta: {
    color: Colors.textMuted,
    fontSize: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  chart: {
    marginTop: 15,
    height: 150,
    backgroundColor: Colors.card,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    padding: 20,
  },

  barContainer: {
    height: "100%",
    justifyContent: "flex-end",
  },

  bar: {
    width: 18,
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
});
