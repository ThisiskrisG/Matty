import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { API_BASE } from '../api/config';

export default function DashboardScreen() {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      {user ? (
        <>
          <Text style={styles.text}>Logged in as <Text style={{ fontWeight: '700' }}>@{user.username}</Text></Text>
          <Text style={styles.text}>Backend: {API_BASE}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.text}>You are not logged in.</Text>
      )}
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
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  text: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 8,
  },
  logoutButton: {
    marginTop: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#f7931a',
    paddingVertical: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#f7931a',
    fontWeight: '600',
  },
});
