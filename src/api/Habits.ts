import firestore from '@react-native-firebase/firestore';
import { getTodaysDate } from '../utils/Date';
import uuid from 'react-native-uuid';

export type TimeOfDay =
  | 'morning'
  | 'lunch'
  | 'afternoon'
  | 'evening'
  | 'anytime';
export interface HabitType {
  readonly habitText: string;
  readonly timeOfDay: TimeOfDay;
  readonly completed?: string;
  readonly id: string | number[];
}

export interface HabitsSectionListType {
  title: TimeOfDay;
  data: HabitType[];
}

export const subscribeToHabitChange = (
  id: string,
  setHabit: (habit: HabitType[]) => void,
) => {
  return firestore()
    .collection('Users')
    .doc(id)
    .onSnapshot(content => {
      setHabit(content?.data?.()?.habits as HabitType[]);
    });
};

export const getHabits = async (id: string): Promise<HabitType[]> => {
  const content = await firestore().collection('Users').doc(id).get();
  return content?.data?.()?.habits;
};

export const addHabit = async (id: string, habit: HabitType) => {
  const habits = await getHabits(id);
  return firestore()
    .collection('Users')
    .doc(id)
    .update({ habits: [...habits, habit] });
};

export const setHabitDone = async (id: string, habitId: string | number[]) => {
  const habits = (await getHabits(id)).map(habit =>
    habitId === habit.id ? { ...habit, completed: getTodaysDate() } : habit,
  );
  return firestore().collection('Users').doc(id).update({ habits });
};

export const updateHabit = async (
  id: string,
  habit: HabitType,
  habitId: string | number[],
) => {
  const habits = (await getHabits(id)).map(currentHabit =>
    currentHabit.id === habitId ? habit : currentHabit,
  );
  return firestore().collection('Users').doc(id).update({ habits });
};

export const deleteHabit = async (id: string, habitId: string | number[]) => {
  const habits = await getHabits(id);
  return firestore()
    .collection('Users')
    .doc(id)
    .update({
      habits: habits.filter(habit => habitId !== habit.id),
    });
};
