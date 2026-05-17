import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { shadows } from "../theme";

const depositMethods = [
  { icon: "business-outline" as const, label: "Bank Transfer", desc: "1-2 business days", badge: "Free" },
  { icon: "card-outline" as const, label: "Debit/Credit Card", desc: "Instant", badge: "1.5% fee" },
  { icon: "phone-portrait-outline" as const, label: "Mobile Money", desc: "Instant", badge: "Free" },
];

type Tab = "deposit" | "request";

const DepositScreen = ({ navigation }: any) => {
  const { c } = useTheme();
  const [tab, setTab] = useState<Tab>("deposit");
  const [amount, setAmount] = useState("");

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={20} color={c.foreground} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: c.foreground }]}>Add Money</Text>
        </View>

        {/* Tabs */}
        <View style={[styles.tabs, { backgroundColor: c.secondary + "B3", borderColor: c.border + "50" }]}>
          <TouchableOpacity
            onPress={() => { setTab("deposit"); setAmount(""); }}
            style={[styles.tab, tab === "deposit" && [styles.activeTab, { backgroundColor: c.card }, shadows.card]]}
          >
            <Text style={[styles.tabText, { color: tab === "deposit" ? c.foreground : c.mutedForeground }]}>Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { setTab("request"); setAmount(""); }}
            style={[styles.tab, tab === "request" && [styles.activeTab, { backgroundColor: c.card }, shadows.card]]}
          >
            <Text style={[styles.tabText, { color: tab === "request" ? c.foreground : c.mutedForeground }]}>Request</Text>
          </TouchableOpacity>
        </View>

        {tab === "deposit" && (
          <>
            <Text style={[styles.sectionLabel, { color: c.mutedForeground }]}>CHOOSE DEPOSIT METHOD</Text>
            {depositMethods.map((m) => (
              <TouchableOpacity
                key={m.label}
                activeOpacity={0.7}
                style={[styles.methodCard, { backgroundColor: c.card, borderColor: c.border + "50" }, shadows.card]}
              >
                <View style={[styles.methodIcon, { backgroundColor: c.primary + "1A" }]}>
                  <Ionicons name={m.icon} size={20} color={c.primary} />
                </View>
                <View style={styles.methodInfo}>
                  <Text style={[styles.methodLabel, { color: c.foreground }]}>{m.label}</Text>
                  <Text style={[styles.methodDesc, { color: c.mutedForeground }]}>{m.desc}</Text>
                </View>
                <View style={[styles.methodBadge, { backgroundColor: c.primary + "1A" }]}>
                  <Text style={[styles.methodBadgeText, { color: c.primary }]}>{m.badge}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {tab === "request" && (
          <View style={styles.requestWrap}>
            <View style={[styles.requestIconWrap, { backgroundColor: c.primary + "1A" }]}>
              <Ionicons name="link" size={28} color={c.primary} />
            </View>
            <Text style={[styles.requestTitle, { color: c.foreground }]}>Request Link</Text>
            <Text style={[styles.requestDesc, { color: c.mutedForeground }]}>Create a link to request money from anyone</Text>

            <Text style={[styles.amountDisplay, { color: c.foreground }]}>${amount || "0"}</Text>

            <View style={styles.keypad}>
              {["1","2","3","4","5","6","7","8","9",".","0","del"].map((key) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => {
                    if (key === "del") setAmount((p) => p.slice(0, -1));
                    else if (key === "." && amount.includes(".")) return;
                    else setAmount((p) => p + key);
                  }}
                  activeOpacity={0.6}
                  style={styles.key}
                >
                  <Text style={[styles.keyText, { color: c.foreground }]}>
                    {key === "del" ? "⌫" : key}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              disabled={!amount || parseFloat(amount) === 0}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={c.gradientAccent as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.ctaBtn, (!amount || parseFloat(amount) === 0) && { opacity: 0.4 }]}
              >
                <Text style={styles.ctaText}>Create Request Link</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
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
  tabs: { flexDirection: "row", gap: 4, borderRadius: 16, padding: 4, marginBottom: 24, borderWidth: 1 },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 12, alignItems: "center" },
  activeTab: {},
  tabText: { fontSize: 14, fontWeight: "600" },
  sectionLabel: { fontSize: 11, fontWeight: "600", letterSpacing: 1.5, marginBottom: 16 },
  methodCard: {
    flexDirection: "row", alignItems: "center", gap: 16, padding: 16, borderRadius: 16,
    borderWidth: 1, marginBottom: 12,
  },
  methodIcon: { width: 44, height: 44, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  methodInfo: { flex: 1 },
  methodLabel: { fontSize: 14, fontWeight: "600" },
  methodDesc: { fontSize: 12 },
  methodBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  methodBadgeText: { fontSize: 11, fontWeight: "600" },
  requestWrap: { alignItems: "center" },
  requestIconWrap: { width: 64, height: 64, borderRadius: 16, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  requestTitle: { fontSize: 16, fontWeight: "700" },
  requestDesc: { fontSize: 12, marginBottom: 32 },
  amountDisplay: { fontSize: 48, fontWeight: "800", letterSpacing: -2, marginBottom: 32 },
  keypad: { flexDirection: "row", flexWrap: "wrap", width: "80%", marginBottom: 32 },
  key: { width: "33.33%", paddingVertical: 14, alignItems: "center", borderRadius: 16 },
  keyText: { fontSize: 18, fontWeight: "600" },
  ctaBtn: { width: 280, paddingVertical: 16, borderRadius: 16, alignItems: "center" },
  ctaText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});

export default DepositScreen;
