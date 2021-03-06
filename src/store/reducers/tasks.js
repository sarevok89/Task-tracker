import {
  ADD_TASK,
  SET_UP_STATE,
  REMOVE_TASK,
  START_TRACKING_TASK,
  STOP_TRACKING_TASK,
} from '../actions/tasks';

export const initialState = {
  lastUpdated: Date.now(),
  tasks: [],
  currentlyTracked: null,
};

export default (state, action) => {
  const now = Date.now();

  switch (action.type) {
    case SET_UP_STATE: {
      return action.state;
    }
    case ADD_TASK:
      return {
        ...state,
        lastUpdated: now,
        tasks: [action.task, ...state.tasks],
      };
    case REMOVE_TASK: {
      const { currentlyTracked } = state;
      const updatedTasks = [...state.tasks].filter(
        (task) => task.id !== action.taskId
      );
      const updatedCurrentlyTracked =
        action.taskId === currentlyTracked?.id ? null : currentlyTracked;

      return {
        ...state,
        currentlyTracked: updatedCurrentlyTracked,
        lastUpdated: now,
        tasks: updatedTasks,
      };
    }
    case START_TRACKING_TASK: {
      const updatedTasks = [...state.tasks];
      const task = updatedTasks.find((task) => task.id === action.taskId);
      task.startedTracking = now;
      task.stoppedTracking = null;

      const currentlyTrackedTask = updatedTasks.find(
        (task) => task.id === state?.currentlyTracked?.id
      );

      if (currentlyTrackedTask) {
        const trackedTime = now - state.currentlyTracked.startTime;
        currentlyTrackedTask.stoppedTracking = now;
        currentlyTrackedTask.trackedTime += trackedTime;
      }

      return {
        ...state,
        lastUpdated: now,
        currentlyTracked: {
          id: task.id,
          startTime: now,
        },
        tasks: updatedTasks,
      };
    }
    case STOP_TRACKING_TASK: {
      const updatedTasks = [...state.tasks];
      const task = updatedTasks.find((task) => task.id === action.taskId);
      task.stoppedTracking = now;

      const trackedTime = now - state.currentlyTracked.startTime;
      task.trackedTime += trackedTime;

      return {
        ...state,
        currentlyTracked: null,
        lastUpdated: now,
        tasks: updatedTasks,
      };
    }
    default:
      return state;
  }
};
