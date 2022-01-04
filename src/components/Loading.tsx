import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface Props {
  readonly color?: string;
}

const LoadingComponent: React.VFC<Props> = ({ color = '#6646ee' }) => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={color} />
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingComponent;
