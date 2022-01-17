import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useContext, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Habit from './../components/Habit';
import { useAppState } from './../hooks/useAppState';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/auth/AuthProvider';
import { getHabits, HabitType } from '../api/Habits';
import { AuthTabNavigationProp } from '../navigation/AuthTab';

type Props = AuthTabNavigationProp<'Habits'>;
const HabitScreen: React.VFC<Props> = ({ navigation }) => {
  const [habits, setHabits] = useState<HabitType[]>([]);
  const { user } = useContext(AuthContext);

  const initHabits = useCallback((active: boolean) => {
    if (active && user) {
      getHabits(user.uid).then(setHabits);
    }
  }, []);
  useFocusEffect(useCallback(() => initHabits(true), []));
  useAppState(initHabits, false);
  const renderItem = ({ item }: { item: HabitType }) => (
    <Habit
      color={item.color}
      habitText={item.habitText}
      onPress={() =>
        navigation.navigate('Action', { habitText: item.habitText })
      }
    />
  );

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.root}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={habits}
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
  contentContainer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
});

export default HabitScreen;
