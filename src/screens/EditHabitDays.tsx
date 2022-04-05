import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Days, HabitType } from '../api/Habits';
import Button from '../components/Button';
import CheckboxText from '../components/CheckboxText';
import { RootStackParamList } from '../navigation/AuthStack';

export type StackParameters = HabitType;

type Props = StackScreenProps<RootStackParamList, 'EditHabitDays'>;

const EditHabitDays: React.VFC<Props> = ({ navigation, route }) => {
  const { days = [] } = route.params;
  const [selectedDays, setSelectedDays] = useState<
    { label: Days; selected: boolean }[]
  >([
    {
      label: 'monday',
      selected: days.includes('monday'),
    },
    {
      label: 'tuesday',
      selected: days.includes('tuesday'),
    },
    {
      label: 'wednesday',
      selected: days.includes('wednesday'),
    },
    {
      label: 'thursday',
      selected: days.includes('thursday'),
    },
    {
      label: 'friday',
      selected: days.includes('friday'),
    },
    {
      label: 'saturday',
      selected: days.includes('saturday'),
    },
    {
      label: 'sunday',
      selected: days.includes('sunday'),
    },
  ]);

  const onSelectedDaysChange = (value: string) => {
    setSelectedDays(selectedTimes =>
      selectedTimes.map(({ label, selected }) => {
        return label === value
          ? { label, selected: !selected }
          : { label, selected };
      }),
    );
  };

  const onDone = () => {
    const days = selectedDays.flatMap(({ label, selected }) =>
      selected ? [label] : [],
    );
    navigation.navigate('EditHabitsTime', { ...route.params, days });
  };
  return (
    <SafeAreaView edges={['left', 'right']} style={styles.root}>
      <View style={styles.checkboxContainer}>
        {selectedDays.map(({ label, selected }) => {
          return (
            <CheckboxText
              key={label}
              label={label}
              selected={selected}
              onChange={onSelectedDaysChange}
            />
          );
        })}
      </View>
      <Button text="Next" styleButton={styles.button} onPress={onDone} />
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

export default EditHabitDays;
