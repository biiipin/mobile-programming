import {
  Activity,
  Dumbbell,
  Flame,
  Timer,
  TrendingUp,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, {
  Circle,
  Defs,
  LinearGradient as SvgLinearGradient,
  Line,
  Rect,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import { Colors, Radius, Spacing } from "../../constants/colors";

type Period = "week" | "month" | "year";

const periods: { key: Period; label: string }[] = [
  { key: "week", label: "Week" },
  { key: "month", label: "Month" },
  { key: "year", label: "Year" },
];

const WEEKLY_DATA = [
  { day: "Mon", reps: 180 },
  { day: "Tue", reps: 240 },
  { day: "Wed", reps: 160 },
  { day: "Thu", reps: 320 },
  { day: "Fri", reps: 200 },
  { day: "Sat", reps: 380 },
  { day: "Sun", reps: 120 },
];

const EXERCISE_DATA = [
  { name: "Push-Up", value: 35, color: Colors.exercise.pushup },
  { name: "Squat", value: 28, color: Colors.exercise.squat },
  { name: "Jumping Jack", value: 22, color: Colors.exercise.jumpingJack },
  { name: "Skipping", value: 15, color: Colors.exercise.skipping },
];

const METRICS = [
  {
    label: "Total Workouts",
    value: "47",
    icon: Activity,
    color: Colors.primary,
  },
  { label: "Total Reps", value: "5,240", icon: Dumbbell, color: Colors.accent },
  { label: "Total Time", value: "18h", icon: Timer, color: Colors.secondary },
  { label: "Calories", value: "12.4k", icon: Flame, color: Colors.warning },
];

// Simple donut chart component
function DonutChart({
  data,
  size = 160,
  strokeWidth = 28,
}: {
  data: { name: string; value: number; color: string }[];
  size?: number;
  strokeWidth?: number;
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let offset = 0;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map((segment) => {
        const segmentLength = (segment.value / total) * circumference;
        const dashOffset = -offset;
        offset += segmentLength;

        return (
          <Circle
            key={segment.name}
            cx={center}
            cy={center}
            r={radius}
            stroke={segment.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
            strokeDashoffset={dashOffset}
            fill="none"
            strokeLinecap="round"
            rotation="-90"
            origin={`${center}, ${center}`}
          />
        );
      })}
      <SvgText
        x={center}
        y={center - 6}
        textAnchor="middle"
        fill={Colors.text}
        fontSize={22}
        fontWeight="700"
      >
        {total}
      </SvgText>
      <SvgText
        x={center}
        y={center + 16}
        textAnchor="middle"
        fill={Colors.textMuted}
        fontSize={12}
        fontWeight="500"
      >
        Sessions
      </SvgText>
    </Svg>
  );
}

// Bar chart component
function BarChart({
  data,
  height = 160,
}: {
  data: { day: string; reps: number }[];
  height?: number;
}) {
  const maxReps = Math.max(...data.map((d) => d.reps));
  const barWidth = 36;
  const totalWidth = data.length * (barWidth + 12);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Svg width={totalWidth} height={height}>
        <Defs>
          <SvgLinearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={Colors.primary} stopOpacity="1" />
            <Stop offset="1" stopColor={Colors.primaryDark} stopOpacity="0.6" />
          </SvgLinearGradient>
        </Defs>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
          <Line
            key={ratio}
            x1={0}
            y1={height - 20 - ratio * (height - 40)}
            x2={totalWidth}
            y2={height - 20 - ratio * (height - 40)}
            stroke={Colors.border}
            strokeWidth={1}
            strokeDasharray="4,4"
          />
        ))}
        {/* Bars */}
        {data.map((d, i) => {
          const barHeight = (d.reps / maxReps) * (height - 40);
          const x = i * (barWidth + 12);
          return (
            <React.Fragment key={d.day}>
              <Rect
                x={x}
                y={height - 20 - barHeight}
                width={barWidth}
                height={barHeight}
                rx={6}
                fill="url(#barGrad)"
              />
              <SvgText
                x={x + barWidth / 2}
                y={height - 4}
                textAnchor="middle"
                fill={Colors.textMuted}
                fontSize={11}
                fontWeight="500"
              >
                {d.day}
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>
    </ScrollView>
  );
}

export default function ProgressScreen() {
  const [period, setPeriod] = useState<Period>("week");

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>Progress</Text>
        <Text style={styles.screenSubtitle}>Track your fitness journey</Text>

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {periods.map((p) => (
            <TouchableOpacity
              key={p.key}
              style={[
                styles.periodButton,
                period === p.key && styles.periodButtonActive,
              ]}
              onPress={() => setPeriod(p.key)}
            >
              <Text
                style={[
                  styles.periodText,
                  period === p.key && styles.periodTextActive,
                ]}
              >
                {p.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Metrics Cards */}
        <View style={styles.metricsGrid}>
          {METRICS.map((metric) => (
            <View key={metric.label} style={styles.metricCard}>
              <View
                style={[
                  styles.metricIconWrap,
                  { backgroundColor: metric.color + "18" },
                ]}
              >
                <metric.icon size={18} color={metric.color} />
              </View>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricLabel}>{metric.label}</Text>
            </View>
          ))}
        </View>

        {/* Activity Chart */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Daily Activity</Text>
            <TrendingUp size={16} color={Colors.accent} />
          </View>
          <View style={styles.chartContainer}>
            <BarChart data={WEEKLY_DATA} height={160} />
          </View>
        </View>

        {/* Exercise Distribution */}
        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Exercise Distribution</Text>
          </View>
          <View style={styles.donutContainer}>
            <DonutChart data={EXERCISE_DATA} size={160} />
            <View style={styles.legend}>
              {EXERCISE_DATA.map((ex) => (
                <View key={ex.name} style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: ex.color }]}
                  />
                  <Text style={styles.legendText}>{ex.name}</Text>
                  <Text style={styles.legendPercent}>{ex.value}%</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: Spacing.lg,
  },
  screenTitle: {
    color: Colors.text,
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 4,
  },
  screenSubtitle: {
    color: Colors.textMuted,
    fontSize: 15,
    marginBottom: 24,
  },

  // Period Selector
  periodSelector: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 4,
    marginBottom: 24,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: Radius.sm,
  },
  periodButtonActive: {
    backgroundColor: Colors.primary,
  },
  periodText: {
    color: Colors.textMuted,
    fontSize: 14,
    fontWeight: "600",
  },
  periodTextActive: {
    color: "#fff",
  },

  // Metrics Grid
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    minWidth: "44%",
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  metricIconWrap: {
    width: 34,
    height: 34,
    borderRadius: Radius.sm,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  metricValue: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 2,
  },
  metricLabel: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: "500",
  },

  // Chart Card
  chartCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  chartTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "700",
  },
  chartContainer: {
    marginHorizontal: -4,
  },

  // Donut
  donutContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  legend: {
    flex: 1,
    gap: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    color: Colors.textSecondary,
    fontSize: 13,
    flex: 1,
  },
  legendPercent: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: "600",
  },
});
