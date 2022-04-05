import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Days,
  deleteHabit,
  HabitType,
  TimeOfDay,
  updateHabit,
} from '../api/Habits';
import Button from '../components/Button';
import CheckboxText from '../components/CheckboxText';
import TextButton from '../components/TextButton';
import { AuthContext } from '../context/auth/AuthProvider';
import { RootStackParamList } from '../navigation/AuthStack';

export type StackParameters = HabitType;

type Props = StackScreenProps<RootStackParamList, 'EditHabitsTime'>;

const EditHabitsTimeScreen: React.VFC<Props> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [selectedTimes, setSelectTimes] = useState<
    { label: TimeOfDay; selected: boolean }[]
  >([
    {
      label: 'morning',
      selected: route.params.timeOfDay === 'morning',
    },
    {
      label: 'lunch',
      selected: route.params.timeOfDay === 'lunch',
    },
    {
      label: 'afternoon',
      selected: route.params.timeOfDay === 'afternoon',
    },
    {
      label: 'evening',
      selected: route.params.timeOfDay === 'evening',
    },
    {
      label: 'anytime',
      selected: route.params.timeOfDay === 'anytime',
    },
  ]);

  const onSelectTimeChange = (value: string) => {
    setSelectTimes(selectedTimes =>
      selectedTimes.map(({ label, selected }) => {
        return label === value
          ? { label, selected: !selected }
          : { label, selected: false };
      }),
    );
  };

  const onDone = async () => {
    setLoading(true);
    if (user?.uid) {
      try {
        const timeOfDay = selectedTimes.find(({ selected }) => selected);
        await updateHabit(
          user.uid,
          {
            days: route.params.days,
            id: route.params.id,
            habitText: route.params.habitText,
            timeOfDay: timeOfDay?.label ?? 'anytime',
          },
          route.params.id,
        );
        navigation.navigate('HabitSaved');
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <SafeAreaView edges={['left', 'right']} style={styles.root}>
      <View style={styles.checkboxContainer}>
        {selectedTimes.map(({ label, selected }) => {
          return (
            <CheckboxText
              key={label}
              label={label}
              selected={selected}
              onChange={onSelectTimeChange}
            />
          );
        })}
      </View>
      <Button
        text="Done"
        loading={loading}
        styleButton={styles.button}
        onPress={onDone}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
  },
  button: {
    width: 200,
    height: 50,
    marginVertical: 12,
  },
});

export default EditHabitsTimeScreen;
