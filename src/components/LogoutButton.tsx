import React, { useContext } from 'react';
import { Props as ButtonProps } from './Button';
import { AuthContext } from '../context/auth/AuthProvider';
import TextButton from './TextButton';
import { StyleSheet } from 'react-native';

const LogoutButton: React.VFC<Omit<ButtonProps, 'text' | 'onPress'>> =
  props => {
    const { logout } = useContext(AuthContext);
    return (
      <TextButton
        {...props}
        styleButton={styles.logoutButton}
        styleButtonText={styles.logoutButtonText}
        text={'Logout'}
        onPress={async () => await logout()}
      />
    );
  };
export default LogoutButton;

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 12,
  },
  logoutButtonText: { color: '#1a73e8' },
});
