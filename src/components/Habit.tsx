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
  readonly onPress: () => void;
}
const Habit: React.VFC<Props> = ({ habitText, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.button, backgroundColor: getRandomColor() }}>
      <Text style={styles.text}>{habitText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '90%',
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 12,
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
