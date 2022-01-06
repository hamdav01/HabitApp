import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';

export const useAppState = (
  callback?: (active: boolean) => void,
  initCall?: boolean,
) => {
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      const foreGround =
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active';
      callback?.(Boolean(foreGround));
      appState.current = nextAppState;
    });
    if (initCall) {
      callback?.(appState.current === 'active');
    }
    return () => subscription.remove();
  }, []);
};
