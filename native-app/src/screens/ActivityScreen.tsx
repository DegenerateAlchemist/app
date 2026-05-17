import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../ThemeContext";
import { transactions } from "../data/mockData";
import TransactionItem from "../components/TransactionItem";
import { shadows } from "../theme";

const ActivityScreen = ({ navigation }: any) => {
  const { c } = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={20} color={c.foreground} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: c.foreground }]}>Activity</Text>
        </View>

        <View style={[styles.card, { backgroundColor: c.card, borderColor: c.border + "50" }, shadows.card]}>
          {transactions.map((tx) => (
            <TransactionItem
              key={tx.id}
              transaction={tx}
              onPress={() => navigation.navigate("TransactionDetail", { id: tx.id })}
            />
          ))}
        </View>
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
  card: { borderRadius: 24, padding: 6, borderWidth: 1 },
});

export default ActivityScreen;
