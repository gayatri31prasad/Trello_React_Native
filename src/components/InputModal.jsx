import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useBoard } from '../context/BoardContext';

export default function InputModal() {
  const { data, setData } = useBoard();
  const { modal } = data;
  const [text, setText] = useState('');

  useEffect(() => {
    if (modal.visible && modal.action === 'edit') {
      const col = data.columns.find(c => c.id === modal.colId);
      if (modal.mode === 'card') {
        const card = col.cards.find(c => c.id === modal.cardId);
        setText(card?.title || '');
      } else {
        setText(col?.title || '');
      }
    } else {
      setText('');
    }
  }, [modal]);

  const onSave = () => {
    const newData = { ...data };
    const colIndex = newData.columns.findIndex(c => c.id === modal.colId);

    if (modal.mode === 'card') {
      if (modal.action === 'add') {
        newData.columns[colIndex].cards.push({ id: `card-${Date.now()}`, title: text });
      } else {
        const cardIndex = newData.columns[colIndex].cards.findIndex(c => c.id === modal.cardId);
        newData.columns[colIndex].cards[cardIndex].title = text;
      }
    } else {
      if (modal.action === 'add') {
        newData.columns.push({ id: `col-${Date.now()}`, title: text, cards: [] });
      } else {
        newData.columns[colIndex].title = text;
      }
    }

    newData.modal = { ...newData.modal, visible: false };
    setData(newData);
  };

  return (
    <Modal visible={modal.visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.label}>{modal.action === 'edit' ? 'Edit' : 'Add'} {modal.mode}</Text>
          <TextInput value={text} onChangeText={setText} placeholder="Enter text" style={styles.input} />
          <Button title="Save" onPress={onSave} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000088' },
  modal: { backgroundColor: '#fff', padding: 20, borderRadius: 12, width: '80%' },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 5 },
  label: { fontSize: 18, marginBottom: 10 },
});
