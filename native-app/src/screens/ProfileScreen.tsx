import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../ThemeContext';
import { currentUser } from '../data/mockData';
export default function ProfileScreen() {
  const { c } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: c.background, padding: 20 }}>
      <Text style={{ color: c.foreground }}>Username: {currentUser.username}</Text>
    </View>
  );
}