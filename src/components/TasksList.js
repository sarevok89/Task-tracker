import React from 'react';
import { FlatList } from 'react-native';

import Task from './Task';
import formatTime from '../utils/tasks/formatTime';
import useNow from '../hooks/useNow';
import { useTasksContext } from '../hooks/useTasksContext';

const TasksList = () => {
  const [state] = useTasksContext();
  const now = useNow();
  const { currentlyTracked, tasks } = state;

  const renderItem = ({ item: task }) => {
    const time =
      currentlyTracked?.id !== task.id
        ? task.trackedTime
        : Math.max(now, Date.now()) -
          currentlyTracked.startTime +
          task.trackedTime;

    return <Task task={task} time={formatTime(time)} />;
  };

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={(task) => task.id.toString()}
    />
  );
};

export default TasksList;
