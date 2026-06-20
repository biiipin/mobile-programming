import {
  Bell,
  ChevronRight,
  CircleUserRound,
  Dumbbell,
  Goal,
  History,
  LogOut,
  Moon,
  Settings,
  Share2,
  Shield,
} from "lucide-react-native";

import React from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors, Radius, Spacing } from "../../constants/colors";

interface SettingItem {
  icon: React.ElementType;

  label: string;

  value?: string;

  danger?: boolean;
}

const SETTINGS_GROUPS = [
  {
    title: "Preferences",

    items: [
      {
        icon: Bell,
        label: "Notifications",
        value: "On",
      },

      {
        icon: Goal,
        label: "Daily Rep Goal",
        value: "200",
      },

      {
        icon: Moon,
        label: "Appearance",
        value: "Dark",
      },
    ],
  },

  {
    title: "Data",

    items: [
      {
        icon: History,
        label: "Workout History",
        value: "47 sessions",
      },

      {
        icon: Share2,
        label: "Export Data",
      },

      {
        icon: Shield,
        label: "Privacy",
      },
    ],
  },

  {
    title: "Account",

    items: [
      {
        icon: Settings,
        label: "Settings",
      },

      {
        icon: LogOut,
        label: "Sign Out",
        danger: true,
      },
    ],
  },
];

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.screenTitle}>Profile</Text>

        <View style={styles.avatarCard}>
          <View style={styles.avatarWrap}>
            <CircleUserRound size={52} color={Colors.primaryLight} />
          </View>

          <View style={styles.avatarInfo}>
            <Text style={styles.avatarName}>Bipin Ghimire</Text>

            <View style={styles.avatarLevel}>
              <Dumbbell size={12} color={Colors.warning} />

              <Text style={styles.avatarLevelText}>Athlete Level</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>47</Text>

            <Text style={styles.statLabel}>Workouts</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statValue}>5.2k</Text>

            <Text style={styles.statLabel}>Total Reps</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>

            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        {SETTINGS_GROUPS.map((group) => (
          <View key={group.title} style={styles.settingsGroup}>
            <Text style={styles.groupTitle}>{group.title}</Text>

            <View style={styles.groupCard}>
              {group.items.map((item, index) => {
                const Icon = item.icon;

                return (
                  <TouchableOpacity
                    key={item.label}
                    style={[
                      styles.settingRow,

                      index < group.items.length - 1 && styles.settingRowBorder,
                    ]}
                  >
                    <Icon
                      size={18}
                      color={item.danger ? Colors.error : Colors.textSecondary}
                    />

                    <Text
                      style={[
                        styles.settingLabel,

                        item.danger && styles.settingLabelDanger,
                      ]}
                    >
                      {item.label}
                    </Text>

                    {item.value && (
                      <Text style={styles.settingValue}>{item.value}</Text>
                    )}

                    {!item.danger && (
                      <ChevronRight size={16} color={Colors.textMuted} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

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

  scrollContent: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: Spacing.lg,
  },

  screenTitle: {
    color: Colors.text,
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 24,
  },

  avatarCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 20,
  },

  avatarWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.surfaceLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  avatarInfo: {
    flex: 1,
  },

  avatarName: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "700",
  },

  avatarLevel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  avatarLevelText: {
    color: Colors.warning,
    fontSize: 13,
    fontWeight: "600",
  },

  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary + "20",
  },

  editButtonText: {
    color: Colors.primaryLight,
    fontSize: 13,
    fontWeight: "600",
  },

  statsRow: {
    flexDirection: "row",
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginBottom: 28,
  },

  statItem: {
    flex: 1,
    alignItems: "center",
  },

  statValue: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: "700",
  },

  statLabel: {
    color: Colors.textMuted,
    fontSize: 12,
  },

  statDivider: {
    width: 1,
    backgroundColor: Colors.cardBorder,
  },

  settingsGroup: {
    marginBottom: 24,
  },

  groupTitle: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 10,
  },

  groupCard: {
    backgroundColor: Colors.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    overflow: "hidden",
  },

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },

  settingRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },

  settingLabel: {
    flex: 1,
    color: Colors.text,
    fontSize: 15,
  },

  settingLabelDanger: {
    color: Colors.error,
  },

  settingValue: {
    color: Colors.textMuted,
    fontSize: 14,
  },
});
