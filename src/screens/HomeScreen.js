import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { useTasksContext } from '../hooks/useTasksContext';
import AddTaskComponent from '../components/AddTaskComponent';
import TasksList from '../components/TasksList';
import saveTasksState from '../utils/tasks/saveTasksState';
import loadTasksState from '../utils/tasks/loadTasksState';
import * as tasksActions from '../store/actions/tasks';

const HomeScreen = () => {
  const [state, dispatch] = useTasksContext();
  const { lastUpdated } = state;

  useEffect(() => {
    const asyncWrapper = async () => {
      const storedState = await loadTasksState();
      if (!storedState) return;

      dispatch(tasksActions.setUpTasksState(storedState));
    };

    asyncWrapper();
  }, [dispatch]);

  useEffect(() => {
    const asyncWrapper = async () => {
      await saveTasksState(state);
    };

    asyncWrapper();
  }, [lastUpdated, state]);

  return (
    <View style={styles.screen}>
      <AddTaskComponent />
      <TasksList />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default HomeScreen;
