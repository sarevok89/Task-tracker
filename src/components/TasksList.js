import React, { useState } from 'react';
import { FlatList } from 'react-native';

import Task from './Task';
import formatTime from '../utils/tasks/formatTime';
import useNow from '../hooks/useNow';
import useTasksContext from '../hooks/useTasksContext';
import TaskDetailsModal from './TaskDetailsModal';

const TasksList = () => {
  const now = useNow();
  const [state] = useTasksContext();
  const { currentlyTracked, tasks } = state;
  const [selectedTask, setSelectedTask] = useState();

  const renderItem = ({ item: task }) => {
    const time =
      currentlyTracked?.id !== task.id
        ? task.trackedTime
        : Math.max(now, Date.now()) -
          currentlyTracked.startTime +
          task.trackedTime;

    return (
      <Task
        task={task}
        time={formatTime(time)}
        onPress={() => setSelectedTask(task)}
      />
    );
  };

  return (
    <>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(task) => task.id.toString()}
      />
      <TaskDetailsModal
        task={selectedTask}
        now={now}
        currentlyTracked={currentlyTracked}
        isVisible={!!selectedTask}
        hideModal={() => setSelectedTask(null)}
      />
    </>
  );
};

export default TasksList;
