import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import uuid from 'react-native-uuid';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Days, HabitType } from '../api/Habits';
import Button from '../components/Button';
import CheckboxText from '../components/CheckboxText';
import { RootStackParamList } from '../navigation/AuthStack';

export type StackParameters = Pick<HabitType, 'habitText'>;

type Props = StackScreenProps<RootStackParamList, 'CreateHabitDays'>;

const CreateHabitScreen: React.VFC<Props> = ({ navigation, route }) => {
  const [selectedDays, setSelectedDays] = useState<
    { label: Days; selected: boolean }[]
  >([
    {
      label: 'monday',
      selected: false,
    },
    {
      label: 'tuesday',
      selected: false,
    },
    {
      label: 'wednesday',
      selected: false,
    },
    {
      label: 'thursday',
      selected: false,
    },
    {
      label: 'friday',
      selected: false,
    },
    {
      label: 'saturday',
      selected: false,
    },
    {
      label: 'sunday',
      selected: false,
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
    navigation.navigate('CreateHabitTime', {
      days,
      habitText: route.params.habitText,
    });
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

export default CreateHabitScreen;
