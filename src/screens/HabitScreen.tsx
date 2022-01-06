import { useFocusEffect } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useContext, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import Habit from './../components/Habit';
import { useAppState } from './../hooks/useAppState';
import { RootStackParamList } from '../navigation/AuthStack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/auth/AuthProvider';
import firestore from '@react-native-firebase/firestore';

interface Habit {
  habitText: string;
}

interface Props {
  readonly navigation: NativeStackNavigationProp<RootStackParamList, 'Habits'>;
}

const HabitScreen: React.VFC<Props> = ({ navigation }) => {
  const [habits, setHabits] = useState<
    {
      habitText: string;
      timeOfDay: string | string[];
    }[]
  >([]);
  const { userActions } = useContext(AuthContext);

  const initHabits = useCallback((active: boolean) => {
    if (active) {
      userActions?.get().then(content => {
        setHabits(content?.data?.()?.habits);
      });
    }
  }, []);
  useFocusEffect(useCallback(() => initHabits(true), []));
  useAppState(initHabits, false);
  return (
    <SafeAreaView
      mode={'padding'}
      edges={['left', 'right']}
      style={styles.root}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}>
        {habits.map(({ habitText }, index) => (
          <Habit
            key={index}
            habitText={habitText}
            onPress={() => {
              console.log('press');
              navigation.navigate('Action', { habitText });
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
  },
  scrollContainer: {
    marginVertical: 24,
  },
  scrollContentContainer: {
    alignItems: 'center',
  },
});

export default HabitScreen;
