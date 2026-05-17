import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../ThemeContext";
import { contacts } from "../data/mockData";

const QuickContacts = ({ navigation }: { navigation: any }) => {
  const { c } = useTheme();

  return (
    <View>
      <Text style={[styles.title, { color: c.mutedForeground }]}>QUICK SEND</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Send")}
          activeOpacity={0.7}
          style={styles.contact}
        >
          <View style={[styles.addBtn, { borderColor: c.primary + "50" }]}>
            <Ionicons name="add" size={20} color={c.primary + "99"} />
          </View>
          <Text style={[styles.contactName, { color: c.mutedForeground }]}>New</Text>
        </TouchableOpacity>

        {contacts.map((contact) => (
          <TouchableOpacity
            key={contact.id}
            onPress={() => navigation.navigate("Send", { to: contact.username })}
            activeOpacity={0.7}
            style={styles.contact}
          >
            <View style={styles.avatarWrap}>
              <Image source={{ uri: contact.avatar }} style={[styles.avatar, { backgroundColor: c.secondary }]} />
              <View style={[styles.onlineDot, { backgroundColor: c.success, borderColor: c.background }]} />
            </View>
            <Text style={[styles.contactName, { color: c.mutedForeground }]}>{contact.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 11, fontWeight: "600", letterSpacing: 1.5, marginBottom: 12 },
  scroll: { gap: 16, paddingRight: 20 },
  contact: { alignItems: "center", gap: 8 },
  addBtn: { width: 52, height: 52, borderRadius: 16, borderWidth: 2, borderStyle: "dashed", alignItems: "center", justifyContent: "center" },
  avatarWrap: { position: "relative" },
  avatar: { width: 52, height: 52, borderRadius: 16 },
  onlineDot: { position: "absolute", bottom: -2, right: -2, width: 14, height: 14, borderRadius: 7, borderWidth: 2 },
  contactName: { fontSize: 11, fontWeight: "500" },
});

export default QuickContacts;
