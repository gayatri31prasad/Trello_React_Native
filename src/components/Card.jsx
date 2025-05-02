import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../styles/theme';
import { useBoard } from '../context/BoardContext';

export default function Card({ card, colId }) {
  const { setData } = useBoard();

  return (
    <View key={card.id} style={theme.card}>
      <Text>{card.title}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => setData(prev => ({
          ...prev,
          modal: { visible: true, mode: 'card', action: 'edit', colId, cardId: card.id },
        }))}><Text>Edit</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setData(prev => ({
            ...prev,
            columns: prev.columns.map(col =>
              col.id === colId ? { ...col, cards: col.cards.filter(c => c.id !== card.id) } : col
            )
          }));
        }}><Text>🗑️</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
});
