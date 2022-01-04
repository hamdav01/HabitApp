import React, { createContext, ReactNode, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { login } from './utils/login';

type FirebaseUser = FirebaseAuthTypes.User | null;

interface AuthProvider {
  user?: FirebaseUser;
  setUser: (user: FirebaseUser) => void;
  login: typeof login;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthProvider>({} as AuthProvider);

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.VFC<Props> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser>();
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        register: async (email: string, password: string) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(data => {
                console.log('data', data);
              })
              .catch(error => {
                console.log('errorski,', error);
              });
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
