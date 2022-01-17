import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Body from '../components/Body';
import { RootStackParamList } from '../navigation/AuthStack';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = NativeStackScreenProps<RootStackParamList, 'HabitCreated'>;

const HabitCreatedScreen: React.VFC<Props> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.popToTop();
    }, 2000);
  }, []);

  return (
    <SafeAreaView edges={['left', 'right']} style={styles.root}>
      <Body align="center" text={'Habit created'} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
});

export default HabitCreatedScreen;
