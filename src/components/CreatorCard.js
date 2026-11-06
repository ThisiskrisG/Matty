import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CreatorCard({ creator, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.avatar}>
        <Text style={styles.initial}>{creator.name.charAt(0)}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{creator.name}</Text>
        <Text style={styles.handle}>{creator.handle}</Text>
        <Text style={styles.tagline} numberOfLines={2}>
          {creator.tagline}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#111',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#262626',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f7931a33',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  initial: {
    color: '#f7931a',
    fontWeight: '700',
  },
  name: {
    color: '#fff',
    fontWeight: '600',
  },
  handle: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 2,
  },
  tagline: {
    color: '#bbb',
    fontSize: 12,
  },
});
