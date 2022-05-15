import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { TasksContextProvider } from './src/contexts/TasksContext';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return (
    <TasksContextProvider>
      <SafeAreaProvider>
        <HomeScreen />
      </SafeAreaProvider>
    </TasksContextProvider>
  );
};

export default App;
