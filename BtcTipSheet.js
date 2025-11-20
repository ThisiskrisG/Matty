import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import { API_BASE } from '../api/config';

export default function BtcTipSheet({ visible, onClose, creatorId, creatorName }) {
  const [amount, setAmount] = useState('5.00');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendTip() {
    const value = parseFloat(amount || '0');
    if (!value || value < 0.5) {
      setStatus('Minimum tip is $0.50');
      return;
    }
    setLoading(true);
    setStatus('Creating BTC invoice...');
    try {
      const res = await fetch(API_BASE + '/btc/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: value, creator_id: creatorId }),
      });
      const data = await res.json();
      if (data.url) {
        setStatus('Opening checkout...');
        Linking.openURL(data.url);
      } else {
        setStatus(data.error || 'Error from backend');
      }
    } catch (e) {
      setStatus('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Tip {creatorName}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>✕</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Amount (USD)</Text>
          <TextInput
            style={styles.input}
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={setAmount}
          />
          <TouchableOpacity style={styles.button} onPress={sendTip} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.buttonText}>Send BTC Tip</Text>
            )}
          </TouchableOpacity>
          {!!status && <Text style={styles.status}>{status}</Text>}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#111',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  close: {
    color: '#999',
    fontSize: 20,
  },
  label: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#fff',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#f7931a',
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '700',
    color: '#000',
  },
  status: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 8,
  },
});
