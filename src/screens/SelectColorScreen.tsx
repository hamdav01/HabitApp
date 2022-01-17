import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';

import { SafeAreaView } from 'react-native-safe-area-context';
import { addHabit, getHabits } from '../api/Habits';
import Button from '../components/Button';
import { AuthContext } from '../context/auth/AuthProvider';
import { RootStackParamList } from '../navigation/AuthStack';

export type SelectColorStackParameters = {
  habitText: string;
  selectedTimes: {
    label: string;
    selected: boolean;
  }[];
};
type Props = NativeStackScreenProps<RootStackParamList, 'SelectColor'>;

const SelectColorScreen: React.VFC<Props> = ({ navigation, route }) => {
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const { habitText, selectedTimes } = route.params;
  const onDone = async () => {
    setLoading(true);
    if (user?.uid) {
      try {
        const habits = await getHabits(user.uid);
        const timeOfDay = selectedTimes.flatMap(({ label, selected }) =>
          selected ? [label] : [],
        );
        await addHabit(user.uid, [
          ...habits,
          {
            habitText,
            color,
            timeOfDay,
          },
        ]);
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
      <ColorPicker onColorSelected={setColor} style={styles.color} />
      <Button
        onPress={onDone}
        text="Done"
        styleButton={styles.button}
        loading={loading}
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
  color: {
    width: 350,
    height: 300,
    marginBottom: 24,
  },
  button: {
    width: 200,
    height: 50,
    marginVertical: 12,
  },
});

export default SelectColorScreen;
