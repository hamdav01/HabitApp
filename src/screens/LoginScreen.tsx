import React, { useContext, useState } from 'react';
import { StyleSheet, TextInput, ScrollView, Text } from 'react-native';
import Button from '../components/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TextButton from '../components/TextButton';
import { RootStackParamList } from '../navigation/HomeStack';
import { AuthContext } from '../context/auth/AuthProvider';
import ErrorBox from '../components/ErrorBox';

const handleLoginErrors = (error: { code: string }) => {
  switch (error.code) {
    case 'auth/invalid-email':
      return 'That email address is invalid!';
    case 'auth/user-disabled':
      return 'User is disabled';
    case 'auth/user-not-found':
      return 'No user with that email';
    case 'auth/wrong-password':
      return 'Wrong password';
    default:
      return 'Something went wrong';
  }
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
}

const LoginScreen: React.VFC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    if (username && password) {
      try {
        setLoading(true);
        await login({ username, password });
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };
  const disabledButton = !username || !password;
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
        numberOfLines={1}
        secureTextEntry
      />
      <Button
        loading={loading}
        styleButton={styles.loginButton}
        disabled={disabledButton}
        text="Sign in"
        onPress={signIn}
      />
      <TextButton
        styleButtonText={styles.noAccountButton}
        text="Don't have an account ?"
        onPress={() => navigation.navigate('CreateAccount')}
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
  loginButton: {
    width: 250,
    height: 40,
    marginVertical: 6,
  },
  noAccountButton: {
    color: '#1a73e8',
  },
});

export default LoginScreen;
