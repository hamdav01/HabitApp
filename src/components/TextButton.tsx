import React from 'react';
import { StyleSheet } from 'react-native';
import Button, { Props as ButtonProps } from './Button';

const TextButton: React.VFC<ButtonProps> = props => {
  return (
    <Button
      {...props}
      styleButtonText={{ color: styles.buttonText, ...props.styleButtonText }}
      styleButton={{ ...props.styleButton, backgroundColor: 'transparent' }}
    />
  );
};
const styles = StyleSheet.create({
  buttonText: {
    color: '#000000',
  },
});

export default TextButton;
