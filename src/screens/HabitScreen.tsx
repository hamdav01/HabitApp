import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import Habit from './../components/Habit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/auth/AuthProvider';
import { HabitType, subscribeToHabitChange } from '../api/Habits';
import { AuthTabNavigationProp } from '../navigation/AuthTab';

type Props = AuthTabNavigationProp<'Habits'>;
const HabitScreen: React.VFC<Props> = ({ navigation }) => {
  const [habits, setHabits] = useState<HabitType[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const subscriber = subscribeToHabitChange(user.uid, setHabits);
    return () => subscriber();
  }, [user.uid]);
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
