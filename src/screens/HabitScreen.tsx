import React, { useContext, useEffect, useState } from 'react';
import { SectionList, StyleSheet, Text } from 'react-native';

import Habit from './../components/Habit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/auth/AuthProvider';
import {
  getHabits,
  HabitsSectionListType,
  HabitType,
  subscribeToHabitChange,
  TimeOfDay,
} from '../api/Habits';
import { AuthTabNavigationProp } from '../navigation/AuthTab';
import { getTimeHours, getTodaysDate } from '../utils/Date';
import { capitalizeFirstLetter } from '../utils/String';
import { useAppState } from '../hooks/useAppState';

const valueOfTimeOfDay = (timeOfDay: TimeOfDay) => {
  switch (timeOfDay) {
    case 'morning':
      return 0;
    case 'lunch':
      return 1;
    case 'afternoon':
      return 2;
    case 'evening':
      return 3;
    case 'anytime':
      return 4;
  }
};
const isTimeOfDay = (timeOfDay: string, hour: number) => {
  if (hour <= 11 && ['anytime', 'morning'].includes(timeOfDay)) {
    return true;
  } else if (
    hour >= 11 &&
    hour <= 14 &&
    ['anytime', 'morning', 'lunch'].includes(timeOfDay)
  ) {
    return true;
  } else if (
    hour >= 14 &&
    hour <= 20 &&
    ['anytime', 'morning', 'lunch', 'afternoon'].includes(timeOfDay)
  ) {
    return true;
  } else if (
    hour >= 20 &&
    hour <= 24 &&
    ['anytime', 'morning', 'lunch', 'afternoon', 'evening'].includes(timeOfDay)
  ) {
    return true;
  }
  return false;
};

const filterHabits = (habits: HabitType[]) => {
  const todaysDate = getTodaysDate();
  const hour = getTimeHours();
  return habits
    .reduce<HabitsSectionListType[]>((habits, habit) => {
      if (
        habit.completed === todaysDate ||
        !isTimeOfDay(habit.timeOfDay, hour)
      ) {
        return habits;
      }
      const findTimeOfDayHabit = habits.find(
        ({ title }) => title === habit.timeOfDay,
      ) ?? { data: [] };
      return [
        ...habits.filter(({ title }) => title !== habit.timeOfDay),
        { title: habit.timeOfDay, data: [...findTimeOfDayHabit.data, habit] },
      ];
    }, [])
    .sort((a, b) => valueOfTimeOfDay(a.title) - valueOfTimeOfDay(b.title));
};

type Props = AuthTabNavigationProp<'Habits'>;
const HabitScreen: React.VFC<Props> = ({ navigation }) => {
  const [habits, setHabits] = useState<HabitType[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const subscriber = subscribeToHabitChange(user.uid, habits => {
      setHabits(habits);
    });
    return () => subscriber();
  }, [user.uid]);

  useAppState(async state => {
    if (state) {
      const habits = await getHabits(user.uid);
      setHabits(habits);
    }
  });

  const renderItem = ({ item }: { item: HabitType }) => (
    <Habit
      habitText={item.habitText}
      onPress={() =>
        navigation.navigate('Action', {
          habitText: item.habitText,
          habitId: item.id,
        })
      }
    />
  );

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.root}>
      <SectionList
        contentContainerStyle={styles.contentContainer}
        sections={filterHabits(habits)}
        renderSectionHeader={header => (
          <Text style={styles.header}>
            {capitalizeFirstLetter(header.section.title)}
          </Text>
        )}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
  },
  header: {
    fontSize: 32,
    marginBottom: 12,
  },
  contentContainer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
});

export default HabitScreen;
