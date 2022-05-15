import React, { memo } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

import { colors, fontSize, padding } from '../constants/styles';
import { useTasksContext } from '../hooks/useTasksContext';
import * as tasksActions from '../store/actions/tasks';

const Task = ({ task, time, onPress }) => {
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
      <TouchableOpacity onPress={onPress}>
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
                color={colors.lightBlue}
                size={40}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
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
    alignItems: 'center',
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
