import React from 'react';
import { StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import { AuthTabNavigationProp } from '../navigation/AuthTab';

type Props = AuthTabNavigationProp<'HabitOptions'>;
const HabitOptionsScreen: React.VFC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView edges={['left', 'right']} style={styles.root}>
      <Button
        text="Create Habit"
        styleButton={styles.button}
        onPress={() => navigation.navigate('CreateHabit')}
      />
      <Button
        text="Habit library"
        styleButton={styles.button}
        onPress={() => navigation.navigate('HabitLibrary')}
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
  button: {
    width: 200,
    height: 50,
    marginVertical: 12,
  },
});

export default HabitOptionsScreen;
