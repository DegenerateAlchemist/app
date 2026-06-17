import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../ThemeContext";
import type { Transaction } from "../data/mockData";

interface Props {
  transaction: Transaction;
  onPress: () => void;
}

const TransactionItem = ({ transaction, onPress }: Props) => {
  const { c } = useTheme();
  const isReceived = transaction.type === "received";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.container, { backgroundColor: "transparent" }]}
    >
      <View style={styles.avatarWrap}>
        <Image source={{ uri: transaction.avatar }} style={[styles.avatar, { backgroundColor: c.secondary }]} />
        <View style={[styles.badge, { backgroundColor: isReceived ? c.success : c.primary, borderColor: c.card }]}>
          <Ionicons
            name="arrow-forward"
            size={10}
            color="#fff"
            style={{ transform: [{ rotate: isReceived ? "135deg" : "-45deg" }] }}
          />
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={[styles.name, { color: c.foreground }]} numberOfLines={1}>{transaction.name}</Text>
          <Text style={[styles.amount, { color: isReceived ? c.success : c.foreground }]}>
            {isReceived ? "+" : "−"}${transaction.amount.toFixed(2)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.note, { color: c.mutedForeground }]} numberOfLines={1}>
            {transaction.note || (isReceived ? "Received" : "Sent")}
          </Text>
          <View style={styles.dateRow}>
            {transaction.status === "pending" && (
              <View style={[styles.pendingDot, { backgroundColor: c.warning }]} />
            )}
            <Text style={[styles.date, { color: c.mutedForeground }]}>{transaction.date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, borderRadius: 16 },
  avatarWrap: { position: "relative" },
  avatar: { width: 44, height: 44, borderRadius: 16 },
  badge: {
    position: "absolute", bottom: -4, right: -4, width: 20, height: 20,
    borderRadius: 10, alignItems: "center", justifyContent: "center", borderWidth: 2,
  },
  info: { flex: 1 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  name: { fontSize: 14, fontWeight: "600", flex: 1 },
  amount: { fontSize: 14, fontWeight: "700", fontVariant: ["tabular-nums"] },
  note: { fontSize: 12, flex: 1 },
  dateRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  pendingDot: { width: 6, height: 6, borderRadius: 3 },
  date: { fontSize: 11 },
});

export default TransactionItem;
