import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'TRELLO_BOARD_DATA';

export const saveBoardData = async (data) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Saving error', e);
  }
};

export const getBoardData = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json != null ? JSON.parse(json) : null;
  } catch (e) {
    console.error('Loading error', e);
    return null;
  }
};
