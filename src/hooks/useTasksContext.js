import { useContext } from 'react';

import { TasksContext } from '../contexts/TasksContext';

const useTasksContext = () => {
  return useContext(TasksContext);
};

export default useTasksContext;
