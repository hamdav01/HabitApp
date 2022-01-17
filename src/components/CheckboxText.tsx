import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  readonly label: string;
  readonly selected: boolean;
  readonly onChange: (label: string) => void;
}

const CheckboxText: React.VFC<Props> = ({ label, selected, onChange }) => {
  return (
    <View style={styles.checkboxContainer}>
      <CheckBox
        tintColors={{ true: '#1a73e8' }}
        value={selected}
        onValueChange={() => onChange(label)}
        style={styles.checkbox}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});

export default CheckboxText;
