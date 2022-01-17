import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from './AuthStack';
import HabitScreen from '../screens/HabitScreen';
import SetttingsScreen from '../screens/SettingsScreen';
import HabitLibraryScreen from '../screens/HabitLibraryScreen';
import LogoutButton from '../components/LogoutButton';
import CreateHabitScreen from '../screens/CreateHabit';

export type AuthTabNavigationProp<T extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, T>,
    StackScreenProps<RootStackParamList>
  >;

export type RootTabParamList = {
  Habits: undefined;
  HabitLibrary: undefined;
  Settings: undefined;
  CreateHabit: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const AuthTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerRight: () => <LogoutButton /> }}>
      <Tab.Screen name="Habits" component={HabitScreen} />
      {/* <Tab.Screen name="HabitLibrary" component={HabitLibraryScreen} /> */}
      <Tab.Screen name="CreateHabit" component={CreateHabitScreen} />
      <Tab.Screen name="Settings" component={SetttingsScreen} />
    </Tab.Navigator>
  );
};

export default AuthTab;
