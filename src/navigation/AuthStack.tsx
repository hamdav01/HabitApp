import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HabitScreen from '../screens/HabitScreen';
import ActionScreen, {
  StackParameters as ActionStackParameters,
} from '../screens/ActionScreen';
import CompleteHabitScreen, {
  StackParameters as CompleteHabitStackParameters,
} from '../screens/CompleteHabitScreen';
import LogoutButton from '../components/LogoutButton';

export type RootStackParamList = {
  Habits: undefined;
  Action: ActionStackParameters;
  CompleteHabit: CompleteHabitStackParameters;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Habits"
      screenOptions={{ headerRight: () => <LogoutButton /> }}>
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
  );
};

export default AuthStack;
