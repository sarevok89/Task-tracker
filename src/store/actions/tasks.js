export const SET_UP_STATE = 'SET_UP_STATE';
export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const START_TRACKING_TASK = 'START_TRACKING_TASK';
export const STOP_TRACKING_TASK = 'STOP_TRACKING_TASK';

export const setUpTasksState = (state) => {
  return { type: SET_UP_STATE, state };
};

export const addTask = (title) => {
  const task = {
    id: Date.now(),
    title,
    trackedTime: 0,
  };

  return { type: ADD_TASK, task };
};

export const removeTask = (taskId) => {
  return { type: REMOVE_TASK, taskId };
};

export const startTracking = async (taskId) => {
  return { type: START_TRACKING_TASK, taskId };
};

export const stopTracking = async (taskId) => {
  return { type: STOP_TRACKING_TASK, taskId };
};
