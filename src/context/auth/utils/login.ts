import auth from '@react-native-firebase/auth';

interface HandleLoginErrors {
  readonly code: string;
}
const handleLoginErrors = (error: HandleLoginErrors) => {
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

interface Login {
  readonly username: string;
  readonly password: string;
}
export const login = async ({ username, password }: Login) => {
  return await auth()
    .signInWithEmailAndPassword(username, password)
    .catch(error => {
      throw new Error(handleLoginErrors(error));
    });
};
