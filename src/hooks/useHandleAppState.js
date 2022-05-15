import { useEffect } from 'react';

import loadTasksState from '../utils/tasks/loadTasksState';
import saveTasksState from '../utils/tasks/saveTasksState';
import * as tasksActions from '../store/actions/tasks';
import useTasksContext from './useTasksContext';

const useHandleAppState = () => {
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
};

export default useHandleAppState;
