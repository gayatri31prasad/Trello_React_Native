import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { DraxView } from 'react-native-drax';
import Card from './Card';
import { theme } from '../styles/theme';
import { useBoard } from '../context/BoardContext';

export default function Column({ column }) {
  const { setData } = useBoard();

  return (
    <View style={theme.column}>
      <View style={styles.header}>
        <Text style={styles.title}>{column.title}</Text>
        <Button title="Edit" onPress={() =>
          setData(prev => ({ ...prev, modal: { visible: true, mode: 'column', action: 'edit', colId: column.id } }))
        } />
        <Button title="🗑️" onPress={() =>
          setData(prev => ({
            ...prev,
            columns: prev.columns.filter(c => c.id !== column.id)
          }))
        } />
      </View>
      <Button title="+ Card" onPress={() =>
        setData(prev => ({ ...prev, modal: { visible: true, mode: 'card', action: 'add', colId: column.id } }))
      } />
      <ScrollView style={{marginTop:8}}>
        {column.cards.map(card => (
          <DraxView key={card.id} draggable payload={{ card, colId: column.id }}>
            <Card card={card} colId={column.id} />
          </DraxView>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row',  alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold',flex: 1 },
});
