import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Overlay } from '@rneui/themed';

import { fontSize, padding } from '../constants/styles';
import formatTime from '../utils/tasks/formatTime';

const TaskDetailsModal = ({ task, time, isVisible, hideModal }) => {
  const { title, startedTracking, stoppedTracking } = task;

  const startTime = new Date(startedTracking).toUTCString();
  const stopTime = stoppedTracking
    ? new Date(stoppedTracking).toUTCString()
    : 'in progress';

  return (
    <Overlay isVisible={!!isVisible} onBackdropPress={hideModal}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{`Tracked time: ${formatTime(time)}`}</Text>
        <Text style={styles.text}>{`Started: ${startTime}`}</Text>
        <Text style={styles.text}>{`Finished: ${stopTime}`}</Text>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: padding.sm,
    paddingHorizontal: padding.md,
  },
  title: {
    fontSize: fontSize._20,
    marginBottom: padding.sm,
  },
});

export default TaskDetailsModal;
