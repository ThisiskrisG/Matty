import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Matty Mobile</Text>
      <Text style={styles.subtitle}>
        BTC-native social. Browse creators, send Bitcoin tips, and manage your profile.
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.primary]}
          onPress={() => navigation.navigate('Creators')}
        >
          <Text style={styles.buttonTextPrimary}>Browse creators</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.ghost]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonTextGhost}>Become a creator</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050509',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#bbb',
    fontSize: 14,
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'column',
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: 'center',
    marginBottom: 10,
  },
  primary: {
    backgroundColor: '#f7931a',
  },
  ghost: {
    borderWidth: 1,
    borderColor: '#f7931a',
  },
  buttonTextPrimary: {
    color: '#000',
    fontWeight: '700',
  },
  buttonTextGhost: {
    color: '#f7931a',
    fontWeight: '600',
  },
});
