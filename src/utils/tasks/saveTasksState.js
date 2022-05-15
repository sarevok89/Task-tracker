import AsyncStorage from '@react-native-async-storage/async-storage';

export const TASKS_STATE = 'tasks_state';

const saveTasksState = async (state) => {
  try {
    // console.log('Saving tasks state:', state);
    await AsyncStorage.setItem(TASKS_STATE, JSON.stringify(state));
  } catch (err) {
    console.log('Failed to save tasks state:', err);
  }
};

export default saveTasksState;
