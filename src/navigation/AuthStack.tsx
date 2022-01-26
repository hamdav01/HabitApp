import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActionScreen, {
  StackParameters as ActionStackParameters,
} from '../screens/ActionScreen';
import CompleteHabitScreen, {
  StackParameters as CompleteHabitStackParameters,
} from '../screens/CompleteHabitScreen';
import AuthTab from './AuthTab';
import HabitCreatedScreen from '../screens/HabitCreatedScreen';
import CreateHabitScreen from '../screens/CreateHabit';
import HabitLibraryScreen from '../screens/HabitLibraryScreen';
import EditHabitScreen, {
  StackParameters as EditHabitStackParameters,
} from '../screens/EditHabit';
import HabitSavedScreen from '../screens/HabitSavedScreen';

export type RootStackParamList = {
  Home: undefined;
  Action: ActionStackParameters;
  CompleteHabit: CompleteHabitStackParameters;
  HabitCreated: undefined;
  CreateHabit: undefined;
  HabitLibrary: undefined;
  HabitSaved: undefined;
  EditHabit: EditHabitStackParameters;
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
      <Stack.Screen name="CreateHabit" component={CreateHabitScreen} />
      <Stack.Screen name="HabitLibrary" component={HabitLibraryScreen} />
      <Stack.Screen name="HabitCreated" component={HabitCreatedScreen} />
      <Stack.Screen name="HabitSaved" component={HabitSavedScreen} />
      <Stack.Screen name="EditHabit" component={EditHabitScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
