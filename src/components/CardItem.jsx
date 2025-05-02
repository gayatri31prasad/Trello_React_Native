import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CardItem({ card, listId, drag, lists, setLists }) {
    const editCard = () => {
      const title = 'Edited ' + card.title; // Placeholder - use modal in real app
      const updated = lists.map((l) =>
        l.id === listId
          ? {
              ...l,
              cards: l.cards.map((c) =>
                c.id === card.id ? { ...c, title } : c
              ),
            }
          : l
      );
      setLists(updated);
    };
  
    const deleteCard = () => {
      const updated = lists.map((l) =>
        l.id === listId
          ? { ...l, cards: l.cards.filter((c) => c.id !== card.id) }
          : l
      );
      setLists(updated);
    };
  
    return (
      <TouchableOpacity
        style={styles.card}
        onLongPress={drag}
        onPress={editCard}
        delayLongPress={100}
      >
        <Text style={styles.title}>{card.title}</Text>
        <Text onPress={deleteCard} style={styles.delete}>🗑️</Text>
      </TouchableOpacity>
    );
  }

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  delete: {
    fontSize: 18,
    color: 'red',
    paddingLeft: 10,
  },
});
