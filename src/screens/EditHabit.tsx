import { StackScreenProps } from '@react-navigation/stack';
import { type } from 'ramda';
import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { addHabit, HabitType, TimeOfDay, updateHabit } from '../api/Habits';
import Button from '../components/Button';
import CheckboxText from '../components/CheckboxText';
import { AuthContext } from '../context/auth/AuthProvider';
import { RootStackParamList } from '../navigation/AuthStack';

export type StackParameters = HabitType;

type Props = StackScreenProps<RootStackParamList, 'EditHabit'>;

const EditHabitScreen: React.VFC<Props> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [habitText, setHabitText] = useState(route.params.habitText);
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
            habitText,
            timeOfDay: timeOfDay?.label ?? 'anytime',
          },
          route.params.habitText,
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
      <TextInput
        style={styles.input}
        onChangeText={setHabitText}
        value={habitText}
      />
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
        disabled={habitText === ''}
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
  input: {
    marginVertical: 6,
    paddingLeft: 6,
    borderWidth: 1,
    width: 250,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
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

export default EditHabitScreen;
