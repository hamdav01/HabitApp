import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../App';
import Habit from './components/Habit';

const Habits = [
  {
    habitText: 'Workout snack',
  },
  {
    habitText: '15-30 minutes of yoga',
  },
  {
    habitText: '10-20 minutes of meditation',
  },
  {
    habitText: '60 minutes of growth time',
  },
  {
    habitText: 'Make bed',
  },
  {
    habitText: '45-60 minutes of walk',
  },
  {
    habitText: 'Reflections',
  },
  {
    habitText: 'ACV',
  },
];

interface Props {
  readonly navigation: NativeStackNavigationProp<
    RootStackParamList,
    'ActionModal'
  >;
}

const HabitScreen: React.VFC<Props> = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      {Habits.map(({ habitText }) => (
        <Habit
          key={habitText}
          habitText={habitText}
          onPress={() => {
            navigation.navigate('ActionModal');
          }}
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
