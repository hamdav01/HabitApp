import auth from '@react-native-firebase/auth';

interface HandleAccountCreationErrors {
  readonly code: string;
}
const handleAccountCreationErrors = (error: HandleAccountCreationErrors) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'Email is already in use';
    case 'auth/invalid-email':
      return 'Invalid email format';
    case 'auth/operation-not-allowed':
      return 'Email login not available';
    case 'auth/weak-password':
      return 'Weak password, need stronger';
    default:
      return 'Something went wrong';
  }
};

interface CreateAccount {
  readonly username: string;
  readonly password: string;
}
export const register = async ({ username, password }: CreateAccount) => {
  return await auth()
    .createUserWithEmailAndPassword(username, password)
    .catch(error => {
      throw new Error(handleAccountCreationErrors(error));
    });
};
