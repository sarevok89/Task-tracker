import React from 'react';
import { Alert, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Overlay, Icon } from '@rneui/themed';

import { colors, fontSize, padding } from '../constants/styles';
import formatTime from '../utils/tasks/formatTime';
import useTasksContext from '../hooks/useTasksContext';
import * as tasksActions from '../store/actions/tasks';

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
  const [, dispatch] = useTasksContext();

  let taskTrackedTime = task?.trackedTime;
  if (task && currentlyTracked && task.id === currentlyTracked.id)
    taskTrackedTime =
      Math.max(now, Date.now()) - currentlyTracked.startTime + task.trackedTime;

  const removeTask = () => {
    const handleRemove = () => {
      hideModal();
      dispatch(tasksActions.removeTask(task?.id));
    };

    Alert.alert('Are you sure?', "Removed tasks can't be restored.", [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'OK', onPress: handleRemove },
    ]);
  };

  return (
    <Overlay
      isVisible={!!isVisible}
      onBackdropPress={hideModal}
      overlayStyle={styles.overlay}
    >
      <View style={styles.row}>
        <Text style={styles.title}>{task?.title}</Text>
        <TouchableOpacity onPress={removeTask}>
          <Icon
            name={'trash'}
            type="font-awesome"
            color={colors.lightBlue}
            size={36}
          />
        </TouchableOpacity>
      </View>
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
