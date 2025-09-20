import React from 'react';
import { View, Text, Button } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Srajan Mineral Water App</Text>
      <Button title="Driver Login" onPress={() => navigation.navigate('DriverLogin')} />
      <Button title="Customer Login" onPress={() => navigation.navigate('CustomerLogin')} />
      <Button title="Admin Login" onPress={() => navigation.navigate('AdminLogin')} />
    </View>
  );
}
