import AsyncStorage from '@react-native-async-storage/async-storage';

import { TASKS_STATE } from './saveTasksState';

const loadTasksState = async () => {
  try {
    const unparsedState = await AsyncStorage.getItem(TASKS_STATE);
    if (!unparsedState) return;

    return JSON.parse(unparsedState);
  } catch (err) {
    console.log('Failed to load tasks state:', err);
  }
};

export default loadTasksState;
