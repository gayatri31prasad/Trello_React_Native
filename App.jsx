import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DraxProvider } from 'react-native-drax';
import { BoardProvider } from './src/context/BoardContext';
import Board from './src/components/Board';
import InputModal from './src/components/InputModal';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BoardProvider>
        <DraxProvider>
          <SafeAreaView style={styles.container}>
            <Board />
            <InputModal />
          </SafeAreaView>
        </DraxProvider>
      </BoardProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
});
