import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HabitScreen from './src/screens/HabitScreen';
import ActionScreen, {
  StackParameters as ActionStackParameters,
} from './src/screens/ActionScreen';
import CompleteHabitScreen, {
  StackParameters as CompleteHabitStackParameters,
} from './src/screens/CompleteHabitScreen';

export type RootStackParamList = {
  Habits: undefined;
  Action: ActionStackParameters;
  CompleteHabit: CompleteHabitStackParameters;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Habits" component={HabitScreen} />
        <Stack.Screen name="Action" component={ActionScreen} />
        <Stack.Screen
          options={{
            headerBackVisible: false,
          }}
          name="CompleteHabit"
          component={CompleteHabitScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
