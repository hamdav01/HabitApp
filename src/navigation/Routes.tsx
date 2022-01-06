import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import LoadingComponent from '../components/Loading';
import { AuthContext } from '../context/auth/AuthProvider';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import firestore from '@react-native-firebase/firestore';

export const Routes = () => {
  const { user, setUser, setUserActions } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const onAuthStateChanged: FirebaseAuthTypes.AuthListenerCallback = user => {
    setUser(user);
    setUserActions(firestore().collection('Users').doc(user?.uid));
    setLoading(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if (loading) {
    return <LoadingComponent />;
  }
  return (
    <NavigationContainer>
      {user ? <AuthStack /> : <HomeStack />}
    </NavigationContainer>
  );
};

export default Routes;
