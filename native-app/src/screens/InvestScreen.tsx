import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../ThemeContext";
import { useWallet } from "../WalletContext";
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop, Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { shadows } from "../theme";

const investOptions = [
  { icon: "bar-chart-outline" as const, label: "Stocks & ETFs", desc: "Invest in global markets", tag: "Popular", growth: "+14.8%" },
  { icon: "logo-bitcoin" as const, label: "Crypto", desc: "Buy and hold digital assets", tag: "Volatile", growth: "+42.1%" },
  { icon: "leaf-outline" as const, label: "Green Funds", desc: "Sustainable & ESG portfolios", tag: "New", growth: "+8.4%" },
];

const InvestScreen = ({ navigation }: any) => {
  const { c } = useTheme();
  const { balance } = useWallet();
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  const handleInvestPress = (assetLabel: string) => {
    setSelectedAsset(assetLabel);
  };

  const handleBuy = (amt: number) => {
    if (!selectedAsset) return;
    if (amt > balance) {
      Alert.alert("Insufficient Funds", "You don't have enough balance to complete this investment.");
      return;
    }
    Alert.alert("Investment Subscribed", `Successfully purchased $${amt} of ${selectedAsset}.`);
    setSelectedAsset(null);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={20} color={c.foreground} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: c.foreground }]}>Investments</Text>
        </View>

        {/* Portfolio Performance Chart Card */}
        <View style={[styles.chartCard, { backgroundColor: c.card, borderColor: c.border + "50" }, shadows.card]}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={[styles.chartSub, { color: c.mutedForeground }]}>PORTFOLIO PERFORMANCE</Text>
              <Text style={[styles.chartVal, { color: c.foreground }]}>$14,284.50</Text>
            </View>
            <View style={[styles.growthBadge, { backgroundColor: c.success + "1A" }]}>
              <Text style={[styles.growthBadgeText, { color: c.success }]}>+24.3% YoY</Text>
            </View>
          </View>

          {/* SVG Wave Chart */}
          <View style={styles.svgContainer}>
            <Svg viewBox="0 0 500 150" width="100%" height={120}>
              <Defs>
                <SvgLinearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor={c.primary} stopOpacity={0.25} />
                  <Stop offset="100%" stopColor={c.primary} stopOpacity={0} />
                </SvgLinearGradient>
              </Defs>
              <Path
                d="M 0 130 C 50 110, 100 80, 150 90 C 200 100, 250 50, 300 60 C 350 70, 400 20, 500 10 L 500 150 L 0 150 Z"
                fill="url(#chartGradient)"
              />
              <Path
                d="M 0 130 C 50 110, 100 80, 150 90 C 200 100, 250 50, 300 60 C 350 70, 400 20, 500 10"
                fill="none"
                stroke={c.primary}
                strokeWidth={3.5}
                strokeLinecap="round"
              />
              <Circle
                cx={500}
                cy={10}
                r={6}
                fill={c.primary}
                stroke="#fff"
                strokeWidth={2}
              />
            </Svg>
          </View>
        </View>

        <Text style={[styles.sectionLabel, { color: c.mutedForeground }]}>CHOOSE AN INVESTMENT</Text>
        {investOptions.map((opt) => (
          <TouchableOpacity
            key={opt.label}
            activeOpacity={0.7}
            onPress={() => handleInvestPress(opt.label)}
            style={[styles.card, { backgroundColor: c.card, borderColor: c.border + "50" }, shadows.card]}
          >
            <View style={[styles.icon, { backgroundColor: c.primary + "1A" }]}>
              <Ionicons name={opt.icon} size={20} color={c.primary} />
            </View>
            <View style={styles.info}>
              <Text style={[styles.label, { color: c.foreground }]}>{opt.label}</Text>
              <Text style={[styles.desc, { color: c.mutedForeground }]}>{opt.desc}</Text>
            </View>
            <View style={styles.badgeCol}>
              <View style={[styles.badge, { backgroundColor: c.primary + "1A" }]}>
                <Text style={[styles.badgeText, { color: c.primary }]}>{opt.tag}</Text>
              </View>
              <Text style={[styles.growthText, { color: c.success }]}>{opt.growth}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {selectedAsset && (
          <View style={[styles.investActionCard, { backgroundColor: c.card, borderColor: c.border + "50" }]}>
            <Text style={[styles.actionTitle, { color: c.foreground }]}>Invest in {selectedAsset}</Text>
            <Text style={[styles.actionDesc, { color: c.mutedForeground }]}>
              Subscribe directly into {selectedAsset} using your available balance.
            </Text>
            <View style={styles.actionBtnRow}>
              <TouchableOpacity style={{ flex: 1 }} onPress={() => handleBuy(100)} activeOpacity={0.8}>
                <LinearGradient
                  colors={c.gradientAccent as [string, string]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.actionBuyBtn}
                >
                  <Text style={styles.actionBuyBtnText}>Buy $100</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedAsset(null)}
                style={[styles.actionCancelBtn, { backgroundColor: c.secondary }]}
              >
                <Text style={[styles.actionCancelBtnText, { color: c.foreground }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
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
  chartCard: { borderRadius: 24, padding: 20, marginBottom: 28, borderWidth: 1 },
  chartHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  chartSub: { fontSize: 10, fontWeight: "700", letterSpacing: 1.5 },
  chartVal: { fontSize: 24, fontWeight: "800", marginTop: 4 },
  growthBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  growthBadgeText: { fontSize: 11, fontWeight: "600" },
  svgContainer: { height: 120, width: "100%", justifyContent: "center" },
  sectionLabel: { fontSize: 11, fontWeight: "600", letterSpacing: 1.5, marginBottom: 16 },
  card: {
    flexDirection: "row", alignItems: "center", gap: 16, padding: 16, borderRadius: 16,
    borderWidth: 1, marginBottom: 12,
  },
  icon: { width: 44, height: 44, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  info: { flex: 1 },
  label: { fontSize: 14, fontWeight: "600" },
  desc: { fontSize: 12 },
  badgeCol: { alignItems: "flex-end", gap: 4 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  badgeText: { fontSize: 11, fontWeight: "600" },
  growthText: { fontSize: 12, fontWeight: "700" },
  investActionCard: { borderRadius: 24, padding: 20, marginTop: 12, borderWidth: 1 },
  actionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  actionDesc: { fontSize: 13, marginBottom: 18, lineHeight: 18 },
  actionBtnRow: { flexDirection: "row", gap: 10 },
  actionBuyBtn: { paddingVertical: 14, borderRadius: 16, alignItems: "center" },
  actionBuyBtnText: { color: "#fff", fontSize: 14, fontWeight: "700" },
  actionCancelBtn: { paddingVertical: 14, paddingHorizontal: 24, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  actionCancelBtnText: { fontSize: 14, fontWeight: "700" },
});

export default InvestScreen;
