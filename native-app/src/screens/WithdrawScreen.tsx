import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { shadows } from "../theme";

const banks = [
  { id: "1", name: "Chase Bank", last4: "4821" },
  { id: "2", name: "Bank of America", last4: "7392" },
];

const WithdrawScreen = ({ navigation }: any) => {
  const { c } = useTheme();
  const [selected, setSelected] = useState(banks[0].id);
  const [amount, setAmount] = useState("");

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={20} color={c.foreground} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: c.foreground }]}>Withdraw</Text>
        </View>

        <Text style={[styles.sectionLabel, { color: c.mutedForeground }]}>SELECT BANK ACCOUNT</Text>

        {banks.map((bank) => (
          <TouchableOpacity
            key={bank.id}
            onPress={() => setSelected(bank.id)}
            activeOpacity={0.7}
            style={[
              styles.bankCard,
              {
                backgroundColor: selected === bank.id ? c.primary + "1A" : c.card,
                borderColor: selected === bank.id ? c.primary + "33" : c.border + "50",
              },
              selected === bank.id ? {} : shadows.card,
            ]}
          >
            <View style={[styles.bankIcon, { backgroundColor: selected === bank.id ? c.primary + "26" : c.secondary }]}>
              <Ionicons name="business-outline" size={20} color={selected === bank.id ? c.primary : c.foreground} />
            </View>
            <View>
              <Text style={[styles.bankName, { color: c.foreground }]}>{bank.name}</Text>
              <Text style={[styles.bankLast4, { color: c.mutedForeground }]}>••••{bank.last4}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={[styles.sectionLabel, { color: c.mutedForeground, marginTop: 28 }]}>AMOUNT</Text>
        <View style={[styles.amountWrap, { backgroundColor: c.card, borderColor: c.border + "50" }, shadows.card]}>
          <Text style={[styles.dollarSign, { color: c.foreground }]}>$</Text>
          <TextInput
            placeholder="0.00"
            placeholderTextColor={c.mutedForeground + "66"}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={[styles.amountInput, { color: c.foreground }]}
          />
        </View>

        <TouchableOpacity
          disabled={!amount || parseFloat(amount) === 0}
          activeOpacity={0.8}
          style={{ marginTop: 28 }}
        >
          <LinearGradient
            colors={c.gradientAccent as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.ctaBtn, (!amount || parseFloat(amount) === 0) && { opacity: 0.4 }]}
          >
            <Text style={styles.ctaText}>Withdraw</Text>
          </LinearGradient>
        </TouchableOpacity>
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
  sectionLabel: { fontSize: 11, fontWeight: "600", letterSpacing: 1.5, marginBottom: 12 },
  bankCard: {
    flexDirection: "row", alignItems: "center", gap: 14, padding: 16, borderRadius: 16,
    borderWidth: 1, marginBottom: 10,
  },
  bankIcon: { width: 44, height: 44, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  bankName: { fontSize: 14, fontWeight: "600" },
  bankLast4: { fontSize: 12 },
  amountWrap: {
    flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 16,
    borderRadius: 16, borderWidth: 1,
  },
  dollarSign: { fontSize: 18, fontWeight: "700", marginRight: 4 },
  amountInput: { flex: 1, fontSize: 18, fontWeight: "700" },
  ctaBtn: { paddingVertical: 16, borderRadius: 16, alignItems: "center" },
  ctaText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});

export default WithdrawScreen;
