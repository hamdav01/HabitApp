import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LoadingComponent from './Loading';

export interface Props {
  readonly text: string;
  readonly onPress: () => void;
  readonly styleButton?: Record<string, unknown>;
  readonly styleButtonText?: Record<string, unknown>;
  readonly disabled?: boolean;
  readonly loading?: boolean;
}

const Button: React.VFC<Props> = ({
  text,
  onPress,
  styleButton,
  styleButtonText,
  disabled = false,
  loading = false,
}) => {
  const buttonColor = disabled ? styles.disabledButton : styles.enabledButton;
  return (
    <TouchableOpacity
      style={{ ...styles.button, ...buttonColor, ...styleButton }}
      onPress={() => {
        if (!disabled && !loading) {
          onPress();
        }
      }}>
      {loading ? (
        <LoadingComponent color="#E8E8E8" />
      ) : (
        <Text style={{ ...styles.buttonText, ...styleButtonText }}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#DDDDDD',
  },
  enabledButton: {
    backgroundColor: '#1a73e8',
  },
});

export default Button;
