import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../ThemeContext";
import { shadows } from "../theme";

const saveOptions = [
  { icon: "wallet-outline" as const, label: "Savings Goal", desc: "Set a target and auto-save", rate: "4.5% APY" },
  { icon: "shield-checkmark-outline" as const, label: "Fixed Deposit", desc: "Lock funds for higher returns", rate: "6.2% APY" },
  { icon: "trending-up-outline" as const, label: "Flex Save", desc: "Save and withdraw anytime", rate: "3.1% APY" },
];

const SaveScreen = ({ navigation }: any) => {
  const { c } = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={20} color={c.foreground} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: c.foreground }]}>Save</Text>
        </View>

        <Text style={[styles.sectionLabel, { color: c.mutedForeground }]}>CHOOSE A SAVINGS PLAN</Text>
        {saveOptions.map((opt) => (
          <TouchableOpacity
            key={opt.label}
            activeOpacity={0.7}
            style={[styles.card, { backgroundColor: c.card, borderColor: c.border + "50" }, shadows.card]}
          >
            <View style={[styles.icon, { backgroundColor: c.primary + "1A" }]}>
              <Ionicons name={opt.icon} size={20} color={c.primary} />
            </View>
            <View style={styles.info}>
              <Text style={[styles.label, { color: c.foreground }]}>{opt.label}</Text>
              <Text style={[styles.desc, { color: c.mutedForeground }]}>{opt.desc}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: c.primary + "1A" }]}>
              <Text style={[styles.badgeText, { color: c.primary }]}>{opt.rate}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 100 },
  header: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 20 },
  backBtn: { padding: 8, borderRadius: 16 },
  title: { fontSize: 18, fontWeight: "700", letterSpacing: -0.3 },
  sectionLabel: { fontSize: 11, fontWeight: "600", letterSpacing: 1.5, marginBottom: 16 },
  card: {
    flexDirection: "row", alignItems: "center", gap: 16, padding: 16, borderRadius: 16,
    borderWidth: 1, marginBottom: 12,
  },
  icon: { width: 44, height: 44, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  info: { flex: 1 },
  label: { fontSize: 14, fontWeight: "600" },
  desc: { fontSize: 12 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontSize: 11, fontWeight: "600" },
});

export default SaveScreen;
