import React, { useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/auth/AuthProvider';
import { AuthTabNavigationProp } from '../navigation/AuthTab';

type Props = AuthTabNavigationProp<'Settings'>;
const SetttingsScreen: React.VFC<Props> = () => {
  const { user } = useContext(AuthContext);
  return (
    <SafeAreaView edges={['left', 'right']} style={styles.root}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}></ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
  },
  scrollContainer: {
    marginVertical: 24,
  },
  scrollContentContainer: {
    alignItems: 'center',
  },
});

export default SetttingsScreen;
