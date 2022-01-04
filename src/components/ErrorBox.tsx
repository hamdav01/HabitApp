import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface Props {
  readonly error: string;
  readonly style?: Record<string, unknown>;
}

const ErrorBox: React.VFC<Props> = ({ error, style }) => (
  <Text style={{ ...styles.errorBox, ...style }}>{error}</Text>
);
const styles = StyleSheet.create({
  errorBox: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderColor: '#d33',
    backgroundColor: '#fee7e6',
    borderWidth: 1,
    flexWrap: 'wrap',
    borderRadius: 8,
    textAlign: 'center',
  },
});

export default ErrorBox;
