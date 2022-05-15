import React, { memo, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

import { colors, fontSize, padding } from '../constants/styles';
import { useTasksContext } from '../hooks/useTasksContext';
import * as tasksActions from '../store/actions/tasks';
import TaskDetailsModal from './TaskDetailsModal';

const Task = ({ task, time }) => {
  const [showModal, setShowModal] = useState();
  const [state, dispatch] = useTasksContext();
  const { title } = task;
  const { currentlyTracked } = state;

  const handleOnPress = async () => {
    if (currentlyTracked?.id !== task.id)
      dispatch(await tasksActions.startTracking(task.id));
    else dispatch(await tasksActions.stopTracking(task.id));
  };

  return (
    <>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <View style={styles.container}>
          <View style={styles.leftColumn}>
            <Text numberOfLines={1} style={styles.title}>
              {title}
            </Text>
          </View>
          <View style={styles.rightColumn}>
            <Text style={styles.time}>{time}</Text>
            <TouchableOpacity onPress={handleOnPress}>
              <Icon
                name={
                  currentlyTracked?.id === task.id
                    ? 'stop-circle'
                    : 'play-circle'
                }
                type="font-awesome"
                color="#517fa4"
                size={40}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      <TaskDetailsModal
        task={task}
        time={task.time}
        isVisible={showModal}
        hideModal={() => setShowModal(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginHorizontal: padding.sm,
    marginVertical: padding.xs,
    paddingVertical: padding.xs,
    paddingHorizontal: padding.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  leftColumn: {
    flex: 7,
  },
  rightColumn: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: fontSize._18,
  },
  time: {
    flex: 1,
    textAlign: 'center',
    fontSize: fontSize._20,
  },
});

export default memo(Task);
