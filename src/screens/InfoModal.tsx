import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Button from '../components/Button';
import { RootStackParamList } from '../navigation/HomeStack';

export type StackParameters = {
  readonly bodyText: string;
  readonly headerText: string;
};
type Props = NativeStackScreenProps<RootStackParamList, 'InfoModal'>;

const InfoModal: React.VFC<Props> = ({ route, navigation }) => {
  const { bodyText, headerText } = route.params;
  return (
    <View style={{ ...styles.root, height: Dimensions.get('screen').height }}>
      <View style={styles.box}>
        <Text style={styles.header}>{headerText}</Text>
        <Text style={styles.body}>{bodyText}</Text>
        <Button text="Ok" onPress={() => navigation.pop()} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    width: '90%',
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
});

export default InfoModal;
