import React, { useContext, useMemo, useState } from 'react';
import { StyleSheet, TextInput, ScrollView } from 'react-native';
import Button from '../components/Button';
import ErrorBox from '../components/ErrorBox';
import { AuthContext } from '../context/auth/AuthProvider';
import { validateEmail, validatePassword } from '../utils/Validation';

const LoginScreen: React.VFC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);

  const createAccount = async () => {
    if (email && password) {
      try {
        setLoading(true);
        await register({ email, password });
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };
  const validEmail = useMemo(() => validateEmail(email), [email]);
  const validPassword = useMemo(() => validatePassword(password), [password]);

  const disabled = !validEmail || !validPassword;
  return (
    <ScrollView contentContainerStyle={styles.root}>
      {error && <ErrorBox error={error} style={styles.errorBox} />}
      <TextInput
        keyboardType="email-address"
        textContentType="emailAddress"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="email"
      />
      <TextInput
        textContentType="password"
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="password"
        secureTextEntry
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
