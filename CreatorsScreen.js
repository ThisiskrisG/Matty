import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CreatorCard from '../components/CreatorCard';

const creators = [
  { id: 1, name: 'Matty Social', handle: '@matty', tagline: 'BTC-native social.' },
  { id: 2, name: 'Creator One', handle: '@creator1', tagline: 'Drops and content.' },
  { id: 3, name: 'Creator Two', handle: '@creator2', tagline: 'Visuals, beats, and vibes.' },
];

export default function CreatorsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Creators</Text>
      <Text style={styles.subtitle}>
        Sample creators mapped to IDs in your backend (1,2,3). Swap this list for live data later.
      </Text>
      <FlatList
        data={creators}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <CreatorCard
            creator={item}
            onPress={() => navigation.navigate('Profile', { creator: item })}
          />
        )}
        contentContainerStyle={{ paddingVertical: 10 }}
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
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    color: '#999',
    fontSize: 13,
    marginBottom: 12,
  },
});
