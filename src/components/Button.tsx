import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export interface Props {
  readonly text: string;
  readonly onPress: () => void;
  readonly styleButton?: Record<string, unknown>;
  readonly styleButtonText?: Record<string, unknown>;
}

const Button: React.VFC<Props> = ({
  text,
  onPress,
  styleButton,
  styleButtonText,
}) => {
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...styleButton }}
      onPress={onPress}>
      <Text style={{ ...styles.buttonText, ...styleButtonText }}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#1a73e8',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    color: '#FFFFFF',
  },
});

export default Button;
