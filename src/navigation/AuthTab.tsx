import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from './AuthStack';
import HabitScreen from '../screens/HabitScreen';
import SetttingsScreen from '../screens/SettingsScreen';
import LogoutButton from '../components/LogoutButton';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HabitOptionsScreen from '../screens/HabitOptions';

export type AuthTabNavigationProp<T extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, T>,
    StackScreenProps<RootStackParamList>
  >;

export type RootTabParamList = {
  Habits: undefined;
  Settings: undefined;
  HabitOptions: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const AuthTab = () => {
  return (
    <Tab.Navigator screenOptions={{ headerRight: () => <LogoutButton /> }}>
      <Tab.Screen
        name="Habits"
        component={HabitScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="HabitOptions"
        component={HabitOptionsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="folder-multiple-plus"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SetttingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthTab;
