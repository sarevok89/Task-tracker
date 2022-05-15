import React, { createContext, useReducer } from 'react';

import tasksReducer, { initialState } from '../store/reducers/tasks';

export const TasksContext = createContext();
export const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  return (
    <TasksContext.Provider value={[state, dispatch]}>
      {children}
    </TasksContext.Provider>
  );
};
