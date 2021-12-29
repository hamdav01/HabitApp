import { useFocusEffect } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../App';
import Habit from './../components/Habit';
import { useAppState } from './../hooks/useAppState';
import { getHabitData, Habits } from './../storage/AsyncStorage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('User');

interface Habit {
  habitText: string;
}

interface Props {
  readonly navigation: NativeStackNavigationProp<RootStackParamList, 'Habits'>;
}

const isEqual = (arr1: Habits, arr2: Habits) => {
  const isEqual = arr1.every(
    ({ habitText }, index: number) => habitText === arr2[index].habitText,
  );
  return isEqual;
};

const HabitScreen: React.VFC<Props> = ({ navigation }) => {
  const [habits, setHabits] = useState<Habits>([]);

  const initHabits = useCallback((active: boolean) => {
    if (active) {
      getHabitData().then(data => {
        const habitsAreEqual =
          habits.length > 0 && isEqual(data.habits, habits);
        if (!habitsAreEqual) {
          setHabits(data.habits);
        }
      });
    }
  }, []);
  useFocusEffect(useCallback(() => initHabits(true), []));
  useAppState(initHabits, false);
  useEffect(() => {
    auth()
      .signInAnonymously()
      .then(async () => {
        firestore()
          .collection('Users')
          .doc('Hampus')
          .set({
            name: 'Ada Lovelace',
            age: 30,
          })
          .then(() => {
            console.log('User added!');
          });
        console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.root}>
      {habits.map(({ habitText }) => (
        <Habit
          key={habitText}
          habitText={habitText}
          onPress={() => navigation.navigate('Action', { habitText })}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    margin: 24,
  },
});

export default HabitScreen;
