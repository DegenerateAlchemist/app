import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useTheme } from '../ThemeContext';
export default function SendScreen() {
  const { c } = useTheme();
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  return (
    <View style={{ flex: 1, backgroundColor: c.background, padding: 20 }}>
      <Text style={{ color: c.foreground }}>Send to:</Text>
      <TextInput value={to} onChangeText={setTo} style={{ borderColor: c.border, borderWidth: 1, color: c.foreground }} />
      <Text style={{ color: c.foreground }}>Amount:</Text>
      <TextInput value={amount} onChangeText={setAmount} style={{ borderColor: c.border, borderWidth: 1, color: c.foreground }} />
      <Button title="Send" onPress={() => alert('Sent!')} />
    </View>
  );
}