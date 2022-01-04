import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from '../components/Button';
import Body from '../components/Body';
import Header from '../components/Header';
import TextButton from '../components/TextButton';
import { removeHabit } from '../storage/AsyncStorage';
import { RootStackParamList } from '../navigation/AuthStack';

export type StackParameters = { readonly habitText: string };

type Props = NativeStackScreenProps<RootStackParamList, 'Action'>;

const ActionScreen: React.VFC<Props> = ({ navigation, route }) => {
  const { habitText } = route.params;
  const header = 'Habit complete screen';
  const body = `Did you finish the ${habitText} habit?`;

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Header align="center" text={header} />
      <Body align="center" text={body} />
      <View style={styles.buttonGroup}>
        <Button
          text="Complete"
          onPress={async () => {
            await removeHabit({ habitText });
            navigation.replace('CompleteHabit', { habitText });
          }}
        />
        <TextButton
          text="Remove"
          styleButtonText={styles.removeButtonText}
          styleButton={styles.removeButton}
          onPress={async () => {
            await removeHabit({ habitText });
            navigation.pop();
          }}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    margin: 12,
  },
  buttonGroup: {
    width: 200,
  },
  removeButton: {
    marginTop: 4,
  },
  removeButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default ActionScreen;
