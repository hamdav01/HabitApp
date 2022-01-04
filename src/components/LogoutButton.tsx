import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import Button, { Props as ButtonProps } from './Button';
import { AuthContext } from '../context/auth/AuthProvider';

const LogoutButton: React.VFC<Omit<ButtonProps, 'text'>> = props => {
  const { logout } = useContext(AuthContext);
  return (
    <Button {...props} text={'Logout'} onPress={async () => await logout()} />
  );
};
const styles = StyleSheet.create({});

export default LogoutButton;
