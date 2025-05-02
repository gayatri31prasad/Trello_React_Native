import React from 'react';
import { ScrollView, View, StyleSheet, Button } from 'react-native';
import Column from './Column';
import { useBoard } from '../context/BoardContext';

export default function Board() {
  const { data, setData } = useBoard();

  return (
    <ScrollView horizontal style={styles.container}>
      {data.columns.map(col => (
        <Column key={col.id} column={col} />
      ))}
      <View style={styles.addCol}>
        <Button title="+ Add Column" onPress={() =>
          setData(prev => ({ ...prev, modal: { visible: true, mode: 'column', action: 'add', colId: null } }))
        } />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  addCol: { justifyContent: 'center', padding: 10 },
});
