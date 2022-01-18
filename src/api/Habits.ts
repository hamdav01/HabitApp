import firestore from '@react-native-firebase/firestore';
import { getTodaysDate } from '../utils/Date';

export interface HabitType {
  readonly habitText: string;
  readonly timeOfDay: string | string[];
  readonly color?: string;
  readonly completed?: string;
}

export const subscribeToHabitChange = (
  id: string,
  setHabit: (habit: HabitType[]) => void,
) => {
  const todaysDate = getTodaysDate();
  return firestore()
    .collection('Users')
    .doc(id)
    .onSnapshot(content => {
      setHabit(
        (content?.data?.()?.habits as HabitType[]).filter(
          ({ completed }) => completed !== todaysDate,
        ),
      );
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

export const setHabitDone = async (id: string, habitText: string) => {
  const habits = (await getHabits(id)).map(habit =>
    habitText === habit.habitText
      ? { ...habit, completed: getTodaysDate() }
      : habit,
  );
  return firestore().collection('Users').doc(id).update({ habits });
};
