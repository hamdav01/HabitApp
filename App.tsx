import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HabitScreen from './src/HabitScreen';
import ActionModal from './src/ActionModal';

export type RootStackParamList = {
  Habits: undefined;
  ActionModal: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Habits" component={HabitScreen} />
        <Stack.Screen
          name="ActionModal"
          component={ActionModal}
          options={{ presentation: 'transparentModal', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
