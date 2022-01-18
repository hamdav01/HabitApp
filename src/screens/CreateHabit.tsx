import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import CheckboxText from '../components/CheckboxText';
import { AuthTabNavigationProp } from '../navigation/AuthTab';

type Props = AuthTabNavigationProp<'CreateHabit'>;
const CreateHabitScreen: React.VFC<Props> = ({ navigation }) => {
  const [habitText, setHabitText] = useState('');
  const [selectedTimes, setSelectTimes] = useState([
    {
      label: 'morning',
      selected: false,
    },
    {
      label: 'lunch',
      selected: false,
    },
    {
      label: 'afternoon',
      selected: false,
    },
    {
      label: 'evening',
      selected: false,
    },
    {
      label: 'all',
      selected: false,
    },
  ]);
  const onSelectTimeChange = (value: string) => {
    setSelectTimes(selectedTimes =>
      selectedTimes.map(({ label, selected }) => {
        if (label !== 'All' && value === 'All') {
          return { label, selected: false };
        }
        if (label === 'All' && value !== 'All') {
          return { label, selected: false };
        }
        return label === value
          ? { label, selected: !selected }
          : { label, selected };
      }),
    );
  };
  return (
    <SafeAreaView edges={['left', 'right']} style={styles.root}>
      <TextInput
        style={styles.input}
        onChangeText={setHabitText}
        value={habitText}
        placeholder="enter habit text"
      />
      <View style={styles.checkboxContainer}>
        {selectedTimes.map(({ label, selected }) => {
          return (
            <CheckboxText
              key={label}
              label={label}
              selected={selected}
              onChange={onSelectTimeChange}
            />
          );
        })}
      </View>
      <Button
        text="Next"
        disabled={habitText === ''}
        styleButton={styles.button}
        onPress={() =>
          navigation.navigate('SelectColor', { habitText, selectedTimes })
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginVertical: 6,
    paddingLeft: 6,
    borderWidth: 1,
    width: 250,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
  },
  button: {
    width: 200,
    height: 50,
    marginVertical: 12,
  },
});

export default CreateHabitScreen;
