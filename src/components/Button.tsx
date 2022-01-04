import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export interface Props {
  readonly text: string;
  readonly onPress: () => void;
  readonly styleButton?: Record<string, unknown>;
  readonly styleButtonText?: Record<string, unknown>;
  readonly disabled?: boolean;
}

const Button: React.VFC<Props> = ({
  text,
  onPress,
  styleButton,
  styleButtonText,
  disabled = false,
}) => {
  const buttonColor = disabled ? styles.disabledButton : styles.enabledButton;
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...buttonColor, ...styleButton }}
      onPress={() => {
        if (!disabled) {
          onPress();
        }
      }}>
      <Text style={{ ...styles.buttonText, ...styleButtonText }}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    color: '#FFFFFF',
  },
  disabledButton: {
    backgroundColor: '#DDDDDD',
  },
  enabledButton: {
    backgroundColor: '#1a73e8',
  },
});

export default Button;
