import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Header({ resetBoard }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Trello Clone</Text>
      <Button title="Reset Board" onPress={resetBoard} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#0079bf',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
