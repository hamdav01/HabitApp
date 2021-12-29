import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from '../components/Button';
import { RootStackParamList } from '../../App';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  readonly navigation: NativeStackNavigationProp<RootStackParamList, 'Action'>;
}

const ActionModal: React.VFC<Props> = ({ navigation }) => {
  return (
    <View style={styles.root}>
      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.header}>{'Actions'}</Text>
          <Icon
            size={26}
            name="close-outline"
            onPress={() => navigation.pop()}></Icon>
        </View>
        <Text style={styles.body}>{'What do you wanna do?'}</Text>
        <Button
          styleButton={styles.donButton}
          text="Done"
          onPress={() => navigation.pop()}
        />
        <Button
          styleButton={styles.removeButton}
          text="Remove"
          onPress={() => navigation.pop()}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  donButton: {
    marginBottom: 6,
  },
  removeButton: {
    backgroundColor: 'red',
  },
  box: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    width: '90%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    marginBottom: 24,
  },
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ActionModal;
