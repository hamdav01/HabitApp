import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import uuid from 'react-native-uuid';

import { SafeAreaView } from 'react-native-safe-area-context';
import { addHabit, HabitType, TimeOfDay } from '../api/Habits';
import Button from '../components/Button';
import CheckboxText from '../components/CheckboxText';
import { AuthContext } from '../context/auth/AuthProvider';
import { RootStackParamList } from '../navigation/AuthStack';

export type StackParameters = Pick<HabitType, 'habitText' | 'days'>;

type Props = StackScreenProps<RootStackParamList, 'CreateHabitTime'>;

const CreateHabitScreen: React.VFC<Props> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [selectedTimes, setSelectTimes] = useState<
    { label: TimeOfDay; selected: boolean }[]
  >([
    {
      label: 'morning',
      selected: false,
    },
    {
      label: 'lunch',
      selected: false,
    },
    {
      label: 'afternoon',
      selected: false,
    },
    {
      label: 'evening',
      selected: false,
    },
    {
      label: 'anytime',
      selected: true,
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
        await addHabit(user.uid, {
          ...route.params,
          id: uuid.v4(),
          timeOfDay: timeOfDay?.label ?? 'anytime',
        });
        navigation.navigate('HabitCreated');
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

export default CreateHabitScreen;
