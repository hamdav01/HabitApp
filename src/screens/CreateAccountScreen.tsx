import React, { useContext, useState } from 'react';
import { StyleSheet, TextInput, ScrollView } from 'react-native';
import Button from '../components/Button';
import ErrorBox from '../components/ErrorBox';
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
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);

  const createAccount = async () => {
    if (username && password) {
      try {
        setLoading(true);
        await register({ username, password });
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };
  const disabled = !username || !password;
  return (
    <ScrollView contentContainerStyle={styles.root}>
      {error && <ErrorBox error={error} style={styles.errorBox} />}
      <TextInput
        textContentType="username"
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="username"
        numberOfLines={1}
      />
      <TextInput
        textContentType="password"
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="password"
        secureTextEntry
        numberOfLines={1}
      />
      <Button
        loading={loading}
        disabled={disabled}
        styleButton={styles.createAccountButton}
        text="Create account"
        onPress={createAccount}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorBox: {
    width: 250,
    color: 'black',
    marginBottom: 6,
  },
  input: {
    marginVertical: 6,
    paddingLeft: 6,
    borderWidth: 1,
    width: 250,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  createAccountButton: {
    width: 250,
    height: 40,
    marginVertical: 6,
  },
});

export default LoginScreen;
