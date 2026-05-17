import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../ThemeContext";
import { shadows } from "../theme";

interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  type: "payment" | "security" | "promo" | "system";
  unread: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Payment Received",
    desc: "Sarah sent you $50.00 for 'Dinner split 🍕'",
    time: "Just now",
    type: "payment",
    unread: true,
  },
  {
    id: "n2",
    title: "Security Update",
    desc: "Biometrics PIN & Login enabled successfully from this iPhone 17 Pro.",
    time: "2 hours ago",
    type: "security",
    unread: true,
  },
  {
    id: "n3",
    title: "Yield Earned! 🚀",
    desc: "Your Fixed Deposit plan earned $12.40 this month at 6.2% APY.",
    time: "Yesterday",
    type: "payment",
    unread: false,
  },
  {
    id: "n4",
    title: "Market Alert: XLM",
    desc: "Stellar Lumen (XLM) increased by +4.8% today. Check your Green Portfolio.",
    time: "2 days ago",
    type: "system",
    unread: false,
  },
];

const NotificationsScreen = ({ navigation }: any) => {
  const { c } = useTheme();
  const [list, setList] = useState<NotificationItem[]>(initialNotifications);

  const markAllRead = () => {
    setList((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "payment":
        return { name: "arrow-down-circle-outline", color: c.success };
      case "security":
        return { name: "shield-checkmark-outline", color: c.primary };
      case "system":
        return { name: "trending-up-outline", color: c.primary };
      default:
        return { name: "notifications-outline", color: c.mutedForeground };
    }
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.background }]} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={20} color={c.foreground} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: c.foreground }]}>Notifications</Text>
        </View>
        {list.some((n) => n.unread) && (
          <TouchableOpacity onPress={markAllRead}>
            <Text style={[styles.markRead, { color: c.primary }]}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {list.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Ionicons name="notifications-off-outline" size={48} color={c.mutedForeground + "40"} />
            <Text style={[styles.emptyTitle, { color: c.foreground }]}>All caught up!</Text>
            <Text style={[styles.emptySub, { color: c.mutedForeground }]}>No new notifications at this time.</Text>
          </View>
        ) : (
          <View style={[styles.card, { backgroundColor: c.card, borderColor: c.border + "50" }, shadows.card]}>
            {list.map((item, i) => {
              const icon = getIcon(item.type);
              return (
                <View
                  key={item.id}
                  style={[
                    styles.itemRow,
                    i < list.length - 1 && { borderBottomWidth: 1, borderBottomColor: c.border + "50" },
                    item.unread && { backgroundColor: c.primary + "06" },
                  ]}
                >
                  <View style={[styles.iconWrap, { backgroundColor: icon.color + "1A" }]}>
                    <Ionicons name={icon.name as any} size={20} color={icon.color} />
                  </View>
                  <View style={styles.info}>
                    <View style={styles.itemHeader}>
                      <Text style={[styles.itemTitle, { color: c.foreground }, item.unread && { fontWeight: "700" }]}>
                        {item.title}
                      </Text>
                      <View style={styles.timeRow}>
                        {item.unread && <View style={[styles.unreadDot, { backgroundColor: c.primary }]} />}
                        <Text style={[styles.time, { color: c.mutedForeground }]}>{item.time}</Text>
                      </View>
                    </View>
                    <Text style={[styles.desc, { color: c.mutedForeground }]}>{item.desc}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 20 },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  backBtn: { padding: 8, borderRadius: 16 },
  title: { fontSize: 18, fontWeight: "700", letterSpacing: -0.3 },
  markRead: { fontSize: 13, fontWeight: "600" },
  content: { paddingHorizontal: 20, paddingBottom: 100 },
  card: { borderRadius: 24, overflow: "hidden", borderWidth: 1 },
  itemRow: { flexDirection: "row", gap: 14, padding: 18 },
  iconWrap: { width: 44, height: 44, borderRadius: 16, alignItems: "center", justifyContent: "center", alignSelf: "flex-start" },
  info: { flex: 1, gap: 4 },
  itemHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  itemTitle: { fontSize: 14, fontWeight: "600" },
  timeRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  unreadDot: { width: 8, height: 8, borderRadius: 4 },
  time: { fontSize: 11 },
  desc: { fontSize: 12, lineHeight: 18 },
  emptyWrap: { alignItems: "center", justifyContent: "center", gap: 12, paddingTop: 100 },
  emptyTitle: { fontSize: 16, fontWeight: "700" },
  emptySub: { fontSize: 13, textAlign: "center" },
});

export default NotificationsScreen;
