import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Overlay } from '@rneui/themed';

import { fontSize, padding } from '../constants/styles';
import formatTime from '../utils/tasks/formatTime';

const getDateTimeString = (timestamp) => {
  if (timestamp === undefined) return '';
  if (timestamp === null) return 'In progress';

  const dateObj = new Date(timestamp);

  return `${dateObj.toLocaleDateString()} ${dateObj.toLocaleTimeString()}`;
};

const TaskDetailsModal = ({
  currentlyTracked,
  task,
  now,
  isVisible,
  hideModal,
}) => {
  let taskTrackedTime = task?.trackedTime;
  if (task && currentlyTracked && task.id === currentlyTracked.id)
    taskTrackedTime =
      Math.max(now, Date.now()) - currentlyTracked.startTime + task.trackedTime;

  return (
    <Overlay
      isVisible={!!isVisible}
      onBackdropPress={hideModal}
      overlayStyle={styles.overlay}
    >
      <Text style={styles.title}>{task?.title}</Text>
      <View>
        <View style={styles.row}>
          <Text style={styles.text}>Tracked time: </Text>
          <Text style={styles.text}>{formatTime(taskTrackedTime)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Started time: </Text>
          <Text style={styles.text}>
            {getDateTimeString(task?.startedTracking)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Finished time: </Text>
          <Text style={styles.text}>
            {getDateTimeString(task?.stoppedTracking)}
          </Text>
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: '90%',
    height: 180,
    justifyContent: 'space-evenly',
    paddingHorizontal: padding.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: fontSize._20,
    marginBottom: padding.sm,
  },
  text: {
    fontSize: fontSize._16,
  },
});

export default TaskDetailsModal;
