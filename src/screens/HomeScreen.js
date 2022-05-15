import React from 'react';
import { View, StyleSheet } from 'react-native';

import useHandleAppState from '../hooks/useHandleAppState';
import AddTaskComponent from '../components/AddTaskComponent';
import TasksList from '../components/TasksList';

const HomeScreen = () => {
  useHandleAppState();

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
