import React from 'react';
import { StyleSheet } from 'react-native';
import Button, { Props as ButtonProps } from './Button';

const TextButton: React.VFC<ButtonProps> = props => {
  return (
    <Button
      {...props}
      styleButtonText={{ ...styles.buttonText, ...props.styleButtonText }}
      styleButton={{
        ...styles.button,
        ...props.styleButton,
      }}
    />
  );
};
const styles = StyleSheet.create({
  buttonText: {
    color: '#000000',
  },
  button: {
    backgroundColor: 'transparent',
    width: 'auto',
    height: 'auto',
  },
});

export default TextButton;
