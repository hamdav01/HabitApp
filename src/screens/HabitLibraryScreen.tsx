import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { getHabits, HabitType, subscribeToHabitChange } from '../api/Habits';
import Habit from '../components/Habit';
import { AuthContext } from '../context/auth/AuthProvider';
import { RootStackParamList } from '../navigation/AuthStack';

type Props = NativeStackScreenProps<RootStackParamList, 'HabitLibrary'>;

const HabitLibraryScreen: React.VFC<Props> = ({ navigation }) => {
  const [habits, setHabits] = useState<HabitType[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const subscriber = subscribeToHabitChange(user.uid, habits => {
      setHabits(habits);
    });
    return () => subscriber();
  }, [user.uid]);

  const renderItem = ({ item }: { item: HabitType }) => (
    <Habit
      habitText={item.habitText}
      onPress={() => {
        navigation.navigate('EditHabit', item);
      }}
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
export default HabitLibraryScreen;
