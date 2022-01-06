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
  readonly email: string;
  readonly password: string;
}
export const register = async ({ email, password }: CreateAccount) => {
  return await auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(error => {
      throw new Error(handleAccountCreationErrors(error));
    });
};
