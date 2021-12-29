import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

interface Props {
  readonly text: string;
  readonly align?: TextStyle['textAlign'];
}

const Header: React.VFC<Props> = ({ text, align = 'auto' }) => (
  <Text style={{ ...styles.header, textAlign: align }}>{text}</Text>
);
const styles = StyleSheet.create({
  header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 26,
  },
});

export default Header;
