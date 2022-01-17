import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActionScreen, {
  StackParameters as ActionStackParameters,
} from '../screens/ActionScreen';
import CompleteHabitScreen, {
  StackParameters as CompleteHabitStackParameters,
} from '../screens/CompleteHabitScreen';
import AuthTab from './AuthTab';
import SelectColorScreen, {
  SelectColorStackParameters,
} from '../screens/SelectColorScreen';
import HabitCreatedScreen from '../screens/HabitCreatedScreen';

export type RootStackParamList = {
  Home: undefined;
  Action: ActionStackParameters;
  CompleteHabit: CompleteHabitStackParameters;
  SelectColor: SelectColorStackParameters;
  HabitCreated: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={AuthTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Action" component={ActionScreen} />
      <Stack.Screen
        options={{
          headerBackVisible: false,
        }}
        name="CompleteHabit"
        component={CompleteHabitScreen}
      />
      <Stack.Screen name="SelectColor" component={SelectColorScreen} />
      <Stack.Screen name="HabitCreated" component={HabitCreatedScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
