import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { deleteHabit, HabitType } from '../api/Habits';
import Button from '../components/Button';
import TextButton from '../components/TextButton';
import { AuthContext } from '../context/auth/AuthProvider';
import { RootStackParamList } from '../navigation/AuthStack';

export type StackParameters = HabitType;

type Props = StackScreenProps<RootStackParamList, 'EditHabit'>;

const EditHabitScreen: React.VFC<Props> = ({ navigation, route }) => {
  const { user } = useContext(AuthContext);
  const [habitText, setHabitText] = useState(route.params.habitText);

  const onDone = () => {
    navigation.navigate('EditHabitDays', { ...route.params, habitText });
  };
  return (
    <SafeAreaView edges={['left', 'right']} style={styles.root}>
      <TextInput
        style={styles.input}
        onChangeText={setHabitText}
        value={habitText}
      />
      <Button
        text="Next"
        disabled={habitText === ''}
        styleButton={styles.button}
        onPress={onDone}
      />
      <TextButton
        styleButtonText={styles.deleteHabitButton}
        text="Delete"
        onPress={async () => {
          await deleteHabit(user.uid, route.params.id);
          navigation.pop();
        }}
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
  button: {
    width: 200,
    height: 50,
    marginVertical: 12,
  },
  deleteHabitButton: {
    marginTop: 8,
    color: '#ff0033',
  },
});

export default EditHabitScreen;
