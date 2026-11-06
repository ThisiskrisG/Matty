import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import BtcTipSheet from '../components/BtcTipSheet';

export default function ProfileScreen({ route }) {
  const { creator } = route.params;
  const [tipOpen, setTipOpen] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.initial}>{creator.name.charAt(0)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{creator.name}</Text>
            <Text style={styles.handle}>{creator.handle}</Text>
            <Text style={styles.bio}>
              BTC-native creator. Replace this with live profile/bio from your backend.
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.tipButton} onPress={() => setTipOpen(true)}>
          <Text style={styles.tipText}>⚡ Tip {creator.name}</Text>
        </TouchableOpacity>
      </ScrollView>
      <BtcTipSheet
        visible={tipOpen}
        onClose={() => setTipOpen(false)}
        creatorId={creator.id}
        creatorName={creator.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050509',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f7931a33',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  initial: {
    color: '#f7931a',
    fontSize: 24,
    fontWeight: '700',
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  handle: {
    color: '#aaa',
    fontSize: 13,
  },
  bio: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 6,
  },
  tipButton: {
    backgroundColor: '#f7931a',
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  tipText: {
    color: '#000',
    fontWeight: '700',
  },
});
