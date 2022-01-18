import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from '../components/Button';
import Body from '../components/Body';
import Header from '../components/Header';
import TextButton from '../components/TextButton';
import { RootStackParamList } from '../navigation/AuthStack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setHabitDone } from '../api/Habits';
import { AuthContext } from '../context/auth/AuthProvider';

export type StackParameters = { readonly habitText: string };

type Props = NativeStackScreenProps<RootStackParamList, 'Action'>;

const ActionScreen: React.VFC<Props> = ({ navigation, route }) => {
  const { habitText } = route.params;
  const { user } = useContext(AuthContext);
  const header = 'Habit complete screen';
  const body = `Did you finish the ${habitText} habit?`;

  return (
    <SafeAreaView
      edges={['left', 'right', 'top', 'bottom']}
      style={styles.root}>
      <Header align="center" text={header} />
      <Body align="center" text={body} />
      <View>
        <Button
          text="Complete"
          onPress={async () => {
            await setHabitDone(user.uid, habitText);
            navigation.replace('CompleteHabit', { habitText });
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 1,
    marginVertical: 12,
  },
  removeButton: {
    marginTop: 12,
  },
  removeButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default ActionScreen;
