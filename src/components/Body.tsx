import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

interface Props {
  readonly text: string;
  readonly align?: TextStyle['textAlign'];
}

const Body: React.VFC<Props> = ({ text, align = 'auto' }) => (
  <Text style={{ ...styles.body, textAlign: align }}>{text}</Text>
);
const styles = StyleSheet.create({
  body: {
    fontSize: 16,
    lineHeight: 26,
  },
});

export default Body;
