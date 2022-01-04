import React, { useContext, useState } from 'react';
import { StyleSheet, TextInput, ScrollView } from 'react-native';
import Button from '../components/Button';
import { AuthContext } from '../context/auth/AuthProvider';

const handleCreateAccountErrors = (error: { code: string }) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'Email address is already in use';
    case 'auth/invalid-email':
      return 'Email address is not valid';
    case 'auth/operation-not-allowed':
      return 'Cant create an account';
    case 'auth/weak-password':
      return 'The password needs to be longer';
    default:
      return 'Something went wrong';
  }
};

const LoginScreen: React.VFC = () => {
  const [userName, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { register } = useContext(AuthContext);

  const createAccount = async () => {
    if (userName && password) {
      await register(userName, password);
    }
  };
  const disabledButton = !userName || !password;
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <TextInput
        textContentType="username"
        style={styles.input}
        onChangeText={setUserName}
        value={userName}
        placeholder="username"
      />
      <TextInput
        textContentType="password"
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="password"
      />
      <Button
        disabled={disabledButton}
        text="Crate account"
        onPress={createAccount}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    margin: 24,
  },
  input: {
    margin: 6,
    paddingLeft: 6,
    borderWidth: 1,
    width: 250,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
});

export default LoginScreen;
