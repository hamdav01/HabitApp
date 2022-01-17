import firestore from '@react-native-firebase/firestore';

export interface HabitType {
  readonly habitText: string;
  readonly timeOfDay: string | string[];
  readonly color?: string;
}

export const getHabits = (id: string): Promise<HabitType[]> => {
  return new Promise(resolve => {
    firestore()
      .collection('Users')
      .doc(id)
      .get()
      .then(content => resolve(content?.data?.()?.habits ?? []));
  });
};

export const addHabit = (id: string, habits: HabitType[]) =>
  firestore().collection('Users').doc(id).update({ habits });
