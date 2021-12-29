import AsyncStorage from '@react-native-async-storage/async-storage';
import { compose, groupBy, path, prop } from 'ramda';

const TimeOfDay = {
  MORNING: 'morning',
  LUNCH: 'lunch',
  AFTERNOON: 'afternoon',
  EVENING: 'evening',
  ANY: 'any',
} as const;

type Value<T> = T[keyof T];

const getTodaysDate = () => {
  const today = new Date();
  return (
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  );
};

export const storeHabitData = async <T extends unknown>(value: T) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('Habits', jsonValue);
    return value;
  } catch (e) {
    // saving error
  }
};

interface RemoveHabit {
  readonly habitText: string;
}
export const removeHabit = async ({ habitText }: RemoveHabit) => {
  try {
    const value = await getHabitData();
    if (value === null) {
      throw new Error('Habits don"t exists');
    }
    const updatedHabits = value.habits.filter(
      currentHabit => habitText !== currentHabit.habitText,
    );
    return await storeHabitData({ ...value, habits: updatedHabits });
  } catch (e) {
    // error reading value
  }
};

export const getHabitData: () => Promise<HabitType> = async () => {
  try {
    const date = getTodaysDate();
    const jsonValue = await AsyncStorage.getItem('Habits');
    const value = jsonValue === null ? null : JSON.parse(jsonValue);
    if (value === null || date !== value.startDate) {
      const defaultValues = {
        startDate: date,
        habits: defaultHabits,
      };
      await storeHabitData(defaultValues);
      return defaultValues;
    }

    return value;
  } catch (e) {
    // error reading value
  }
};

const groupByTimeOfDay = compose(
  groupBy(({ timeOfDay: currentTimeOfDay }: Habit) => {
    const timeOfDay = Array.isArray(currentTimeOfDay)
      ? currentTimeOfDay
      : [currentTimeOfDay];
    return timeOfDay.includes(TimeOfDay.MORNING)
      ? TimeOfDay.MORNING
      : timeOfDay.includes(TimeOfDay.LUNCH)
      ? TimeOfDay.LUNCH
      : timeOfDay.includes(TimeOfDay.AFTERNOON)
      ? TimeOfDay.AFTERNOON
      : timeOfDay.includes(TimeOfDay.EVENING)
      ? TimeOfDay.EVENING
      : TimeOfDay.ANY;
  }),
  prop('habits') as (habitType: HabitType) => Habits,
);

const defaultHabits: HabitType['habits'] = [
  {
    habitText: 'Workout snack 1',
    times: 4,
    timeOfDay: 'morning',
  },
  {
    habitText: 'Workout snack 2',
    times: 4,
    timeOfDay: 'lunch',
  },
  {
    habitText: 'Workout snack 3',
    times: 4,
    timeOfDay: 'afternoon',
  },
  {
    habitText: 'Workout snack 4',
    times: 4,
    timeOfDay: 'afternoon',
  },
  {
    habitText: '15-30 minutes of yoga',
  },
  {
    habitText: '10-20 minutes of meditation',
  },
  {
    habitText: '60 minutes of growth time',
    timeOfDay: ['afternoon', 'evening'],
  },
  {
    habitText: 'Make bed',
    timeOfDay: 'morning',
  },
  {
    habitText: '45-60 minutes of walk',
  },
  {
    habitText: 'Reflections',
    timeOfDay: 'evening',
  },
  {
    habitText: 'ACV',
    timeOfDay: ['lunch', 'afternoon'],
  },
];

type TimeOfDayType =
  | undefined
  | Value<typeof TimeOfDay>
  | ReadonlyArray<Value<typeof TimeOfDay>>;

export interface Habit {
  readonly times?: number;
  readonly timeOfDay?: TimeOfDayType;
  readonly habitText: string;
}

export type Habits = ReadonlyArray<Habit>;

export interface HabitType {
  readonly habits: Habits;
  readonly startDate: string;
}
