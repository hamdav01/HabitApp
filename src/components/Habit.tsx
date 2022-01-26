import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const getRandomColorHSL = (s: string, l: string, a: number) => {
  const h = Math.random() * 360;
  return `hsla(${h},${s},${l},${a})`;
};

interface Props {
  readonly habitText: string;
  readonly color?: string;
  readonly onPress: () => void;
}
const Habit: React.VFC<Props> = ({ habitText, onPress, color }) => {
  const backgroundColor = color ? color : getRandomColorHSL('50%', '60%', 1);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.button, backgroundColor }}>
      <Text style={styles.text}>{habitText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 12,
    width: 300,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    padding: 16,
    fontSize: 16,
  },
});

export default Habit;
