import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  readonly text: string;
  readonly onPress: () => void;
  readonly styleButton?: Record<string, unknown>;
}

const Button: React.VFC<Props> = ({ text, onPress, styleButton }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...styleButton }}
      onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#1a73e8',
  },
  buttonText: {
    padding: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Button;
