import React, { createContext, ReactNode, useState } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { login } from './utils/login';
import { register } from './utils/register';
import { logout } from './utils/logout';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

type FirebaseUser = FirebaseAuthTypes.User | null;

type UserActions =
  FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>;
interface AuthProvider {
  user?: FirebaseUser;
  setUser: (user: FirebaseUser) => void;
  login: typeof login;
  register: typeof register;
  logout: typeof logout;
  userActions: UserActions | undefined;
  setUserActions: React.Dispatch<React.SetStateAction<UserActions | undefined>>;
}

export const AuthContext = createContext<AuthProvider>({} as AuthProvider);

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.VFC<Props> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser>();
  const [userActions, setUserActions] = useState<UserActions>();
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userActions,
        setUserActions,
        login,
        register,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
