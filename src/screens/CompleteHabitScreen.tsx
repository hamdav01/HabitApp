import React, { useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Body from '../components/Body';
import { RootStackParamList } from '../navigation/AuthStack';

export type StackParameters = { readonly habitText: string };

type Props = NativeStackScreenProps<RootStackParamList, 'CompleteHabit'>;

const CompleteHabitScreen: React.VFC<Props> = ({ navigation, route }) => {
  const { habitText } = route.params;
  const body = `Completing ${habitText} habit`;

  useEffect(() => {
    setTimeout(() => {
      navigation.pop();
    }, 2000);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Body align="center" text={body} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 12,
  },
});

export default CompleteHabitScreen;
