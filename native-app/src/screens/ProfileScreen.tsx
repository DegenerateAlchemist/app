import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, Switch, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../ThemeContext";
import { currentUser } from "../data/mockData";
import { shadows } from "../theme";

const menuItems = [
  { icon: "shield-checkmark-outline" as const, label: "Security", desc: "Biometrics & PIN" },
  { icon: "business-outline" as const, label: "Linked Banks", desc: "Manage accounts" },
  { icon: "globe-outline" as const, label: "Currency", desc: "USD" },
  { icon: "notifications-outline" as const, label: "Notifications", desc: "Push & email" },
  { icon: "key-outline" as const, label: "Recovery", desc: "Backup options" },
];

const ProfileScreen = ({ navigation }: any) => {
  const { c, theme, setTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={["top"]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={20} color={c.foreground} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: c.foreground }]}>Profile</Text>
        </View>

        {/* Avatar */}
        <View style={styles.profileWrap}>
          <View style={styles.avatarWrap}>
            <Image source={{ uri: currentUser.avatar }} style={[styles.avatar, { backgroundColor: c.secondary }]} />
            <View style={[styles.onlineDot, { backgroundColor: c.success, borderColor: c.background }]} />
          </View>
          <Text style={[styles.profileName, { color: c.foreground }]}>{currentUser.name}</Text>
          <Text style={[styles.profileUsername, { color: c.primary }]}>{currentUser.username}</Text>
          <Text style={[styles.profileEmail, { color: c.mutedForeground }]}>{currentUser.email}</Text>
        </View>

        {/* QR / Share */}
        <View style={[styles.qrCard, { backgroundColor: c.card, borderColor: c.border + "50" }, shadows.card]}>
          <TouchableOpacity style={styles.qrBtn}>
            <View style={[styles.qrIcon, { backgroundColor: c.primary + "1A" }]}>
              <Ionicons name="qr-code-outline" size={20} color={c.primary} />
            </View>
            <Text style={[styles.qrLabel, { color: c.foreground }]}>My QR</Text>
          </TouchableOpacity>
          <View style={[styles.qrDivider, { backgroundColor: c.border }]} />
          <TouchableOpacity style={styles.qrBtn}>
            <View style={[styles.qrIcon, { backgroundColor: c.primary + "1A" }]}>
              <Ionicons name="share-outline" size={20} color={c.primary} />
            </View>
            <Text style={[styles.qrLabel, { color: c.foreground }]}>Share</Text>
          </TouchableOpacity>
        </View>

        {/* Dark Mode */}
        <View style={[styles.darkCard, { backgroundColor: c.card, borderColor: c.border + "50" }, shadows.card]}>
          <View style={[styles.menuIcon, { backgroundColor: c.secondary }]}>
            <Ionicons name={theme === "dark" ? "moon-outline" : "sunny-outline"} size={18} color={c.primary} />
          </View>
          <View style={styles.menuInfo}>
            <Text style={[styles.menuLabel, { color: c.foreground }]}>Dark Mode</Text>
            <Text style={[styles.menuDesc, { color: c.mutedForeground }]}>{theme === "dark" ? "On" : "Off"}</Text>
          </View>
          <Switch
            value={theme === "dark"}
            onValueChange={(v) => setTheme(v ? "dark" : "light")}
            trackColor={{ false: c.secondary, true: c.primary + "60" }}
            thumbColor={theme === "dark" ? c.primary : "#f4f4f4"}
          />
        </View>

        {/* Menu */}
        <View style={[styles.menuCard, { backgroundColor: c.card, borderColor: c.border + "50" }, shadows.card]}>
          {menuItems.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              activeOpacity={0.6}
              style={[styles.menuRow, i < menuItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: c.border + "80" }]}
            >
              <View style={[styles.menuIcon, { backgroundColor: c.secondary }]}>
                <Ionicons name={item.icon} size={18} color={c.foreground} />
              </View>
              <View style={styles.menuInfo}>
                <Text style={[styles.menuLabel, { color: c.foreground }]}>{item.label}</Text>
                <Text style={[styles.menuDesc, { color: c.mutedForeground }]}>{item.desc}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={c.mutedForeground} />
            </TouchableOpacity>
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
  profileWrap: { alignItems: "center", marginBottom: 28 },
  avatarWrap: { position: "relative", marginBottom: 12 },
  avatar: { width: 80, height: 80, borderRadius: 24 },
  onlineDot: { position: "absolute", bottom: -4, right: -4, width: 24, height: 24, borderRadius: 12, borderWidth: 3 },
  profileName: { fontSize: 20, fontWeight: "700", letterSpacing: -0.3 },
  profileUsername: { fontSize: 14, fontWeight: "600" },
  profileEmail: { fontSize: 12, marginTop: 2 },
  qrCard: {
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 32,
    borderRadius: 24, padding: 20, marginBottom: 16, borderWidth: 1,
  },
  qrBtn: { alignItems: "center", gap: 10 },
  qrIcon: { width: 48, height: 48, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  qrLabel: { fontSize: 12, fontWeight: "600" },
  qrDivider: { width: 1, height: 48 },
  darkCard: {
    flexDirection: "row", alignItems: "center", gap: 14, borderRadius: 24, padding: 16, marginBottom: 16, borderWidth: 1,
  },
  menuCard: { borderRadius: 24, overflow: "hidden", borderWidth: 1 },
  menuRow: { flexDirection: "row", alignItems: "center", gap: 14, padding: 16 },
  menuIcon: { width: 40, height: 40, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  menuInfo: { flex: 1 },
  menuLabel: { fontSize: 14, fontWeight: "600" },
  menuDesc: { fontSize: 12 },
});

export default ProfileScreen;
