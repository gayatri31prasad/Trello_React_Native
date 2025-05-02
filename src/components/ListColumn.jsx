import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { NestableScrollContainer, NestableDraggableFlatList } from "react-native-draggable-flatlist"
import CardItem from './Card';

export default function ListColumn({ list, lists, setLists }) {
  const addCard = () => {
    const title = Alert.prompt('Enter card title');
    if (title) {
      const updated = lists.map(l =>
        l.id === list.id ? { ...l, cards: [...l.cards, { id: Date.now().toString(), title }] } : l
      );
      setLists(updated);
    }
  };

  const deleteList = () => {
    setLists(lists.filter(l => l.id !== list.id));
  };

  const handleDragEnd = ({ data }) => {
    const updated = lists.map(l => l.id === list.id ? { ...l, cards: data } : l);
    setLists(updated);
  };

  return (
    <View style={styles.list}>
      <Text style={styles.title}>{list.title}</Text>
      <Button title="Add Card" onPress={addCard} />
      <Button title="Delete List" onPress={deleteList} color="red" />
      <NestableDraggableFlatList
        data={list.cards}
        keyExtractor={(item) => item.id}
        renderItem={({ item, drag }) => (
          <CardItem card={item} listId={list.id} drag={drag} lists={lists} setLists={setLists} />
        )}
        onDragEnd={handleDragEnd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 8,
    width: 250,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
