import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../ThemeContext";
import { shadows } from "../theme";

interface Props {
  balance: number;
}

const BalanceCard = ({ balance }: Props) => {
  const { c } = useTheme();
  const [visible, setVisible] = useState(true);

  return (
    <LinearGradient
      colors={c.gradientBalance as [string, string, string]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, shadows.card]}
    >
      {/* Decorative rings */}
      <View style={styles.ring1} />
      <View style={styles.ring2} />

      <View style={styles.header}>
        <Text style={styles.label}>AVAILABLE BALANCE</Text>
        <TouchableOpacity
          onPress={() => setVisible(!visible)}
          activeOpacity={0.7}
          style={styles.eyeBtn}
        >
          <Ionicons name={visible ? "eye-outline" : "eye-off-outline"} size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.balance}>
        {visible
          ? `$${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
          : "••••••"}
      </Text>

      <View style={styles.statusRow}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>All systems active</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: { borderRadius: 24, padding: 24, paddingBottom: 20, overflow: "hidden", position: "relative" },
  ring1: {
    position: "absolute", top: -64, right: -64, width: 192, height: 192,
    borderRadius: 96, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)",
  },
  ring2: {
    position: "absolute", top: -32, right: -32, width: 128, height: 128,
    borderRadius: 64, borderWidth: 1, borderColor: "rgba(255,255,255,0.07)",
  },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  label: { fontSize: 13, fontWeight: "500", color: "rgba(255,255,255,0.7)", letterSpacing: 1 },
  eyeBtn: { padding: 8, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.1)" },
  balance: { fontSize: 42, fontWeight: "800", color: "#fff", letterSpacing: -2, marginBottom: 12 },
  statusRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#2e9e6a" },
  statusText: { fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: "500", letterSpacing: 0.5 },
});

export default BalanceCard;
