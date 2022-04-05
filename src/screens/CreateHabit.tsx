import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import { RootStackParamList } from '../navigation/AuthStack';

type Props = StackScreenProps<RootStackParamList, 'CreateHabit'>;

const CreateHabitScreen: React.VFC<Props> = ({ navigation }) => {
  const [habitText, setHabitText] = useState('');

  const onDone = () => navigation.navigate('CreateHabitDays', { habitText });

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.root}>
      <TextInput
        style={styles.input}
        onChangeText={setHabitText}
        value={habitText}
        placeholder="enter habit text"
      />
      <Button
        text="Next"
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
  button: {
    width: 200,
    height: 50,
    marginVertical: 12,
  },
});

export default CreateHabitScreen;
