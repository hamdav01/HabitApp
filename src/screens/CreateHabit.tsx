import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import uuid from 'react-native-uuid';

import { SafeAreaView } from 'react-native-safe-area-context';
import { addHabit, TimeOfDay } from '../api/Habits';
import Button from '../components/Button';
import CheckboxText from '../components/CheckboxText';
import { AuthContext } from '../context/auth/AuthProvider';
import { RootStackParamList } from '../navigation/AuthStack';

type Props = StackScreenProps<RootStackParamList, 'CreateHabit'>;

const CreateHabitScreen: React.VFC<Props> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [habitText, setHabitText] = useState('');
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
          habitText,
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
      <TextInput
        style={styles.input}
        onChangeText={setHabitText}
        value={habitText}
        placeholder="enter habit text"
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

export default CreateHabitScreen;
