import React, { useState } from "react";
import {
  View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Modal, Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../ThemeContext";
import { currentUser, transactions } from "../data/mockData";
import BalanceCard from "../components/BalanceCard";
import ActionButtons from "../components/ActionButtons";
import QuickContacts from "../components/QuickContacts";
import TransactionItem from "../components/TransactionItem";
import { shadows } from "../theme";

const HomeScreen = ({ navigation }: any) => {
  const { c } = useTheme();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const greetingIcon = hour < 12 ? "sunny-outline" : hour < 18 ? "partly-sunny-outline" : "moon-outline";

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={["top"]}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userRow}>
            <View style={styles.avatarWrap}>
              <Image source={{ uri: currentUser.avatar }} style={[styles.avatar, { backgroundColor: c.secondary }]} />
              <View style={[styles.onlineDot, { backgroundColor: c.success, borderColor: c.background }]} />
            </View>
            <View>
              <View style={styles.greetingRow}>
                <Text style={[styles.greeting, { color: c.mutedForeground }]}>{greeting}</Text>
                <Ionicons name={greetingIcon as any} size={14} color={c.mutedForeground} />
              </View>
              <Text style={[styles.name, { color: c.foreground }]}>{currentUser.name}</Text>
            </View>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Notifications")}
              activeOpacity={0.7}
              style={[styles.bellBtn, { backgroundColor: c.card, borderColor: c.border + "80" }, shadows.card]}
            >
              <Ionicons name="notifications-outline" size={20} color={c.foreground} />
              <View style={[styles.notifDot, { backgroundColor: c.primary, borderColor: c.card }]} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Balance */}
        <View style={styles.section}>
          <BalanceCard balance={currentUser.balance} />
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <ActionButtons navigation={navigation} />
        </View>

        {/* Quick Contacts */}
        <View style={styles.section}>
          <QuickContacts navigation={navigation} />
        </View>

        {/* Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: c.mutedForeground }]}>RECENT TRANSACTIONS</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Activity")}>
              <Text style={[styles.seeAll, { color: c.primary }]}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.txCard, { backgroundColor: c.card, borderColor: c.border + "50" }, shadows.card]}>
            {transactions.slice(0, 5).map((tx) => (
              <TransactionItem
                key={tx.id}
                transaction={tx}
                onPress={() => navigation.navigate("TransactionDetail", { id: tx.id })}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingBottom: 100 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 20 },
  userRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  avatarWrap: { position: "relative" },
  avatar: { width: 44, height: 44, borderRadius: 16 },
  onlineDot: { position: "absolute", bottom: -2, right: -2, width: 14, height: 14, borderRadius: 7, borderWidth: 2 },
  greetingRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  greeting: { fontSize: 13, fontWeight: "500" },
  name: { fontSize: 15, fontWeight: "700", letterSpacing: -0.3 },
  bellBtn: { padding: 10, borderRadius: 16, borderWidth: 1, position: "relative" },
  notifDot: { position: "absolute", top: 8, right: 8, width: 8, height: 8, borderRadius: 4, borderWidth: 2 },
  section: { marginBottom: 28 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  sectionTitle: { fontSize: 11, fontWeight: "600", letterSpacing: 1.5 },
  seeAll: { fontSize: 12, fontWeight: "600" },
  txCard: { borderRadius: 24, padding: 6, borderWidth: 1 },
});

export default HomeScreen;
