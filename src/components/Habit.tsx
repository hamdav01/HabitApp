import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

interface Props {
  readonly habitText: string;
  readonly color?: string;
  readonly onPress: () => void;
}
const Habit: React.VFC<Props> = ({ habitText, onPress, color }) => {
  const backgroundColor = color ? color : getRandomColor();
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
