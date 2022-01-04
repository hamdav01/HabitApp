import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import InfoModal, {
  StackParameters as InfoModalStackParameters,
} from '../screens/InfoModal';

export type RootStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  InfoModal: InfoModalStackParameters;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{
          headerBackVisible: false,
        }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen
        options={{
          headerBackVisible: false,
        }}
        name="InfoModal"
        component={InfoModal}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
