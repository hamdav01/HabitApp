import React, { useContext, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import TextButton from '../components/TextButton';
import { AuthContext } from '../context/auth/AuthProvider';
import { AuthTabNavigationProp } from '../navigation/AuthTab';

type Props = AuthTabNavigationProp<'Settings'>;
const SetttingsScreen: React.VFC<Props> = () => {
  const { user } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState(user.email ?? '');
  const [loading, setLoading] = useState(false);
  return (
    <SafeAreaView edges={['left', 'right']} style={styles.root}>
      <TextInput
        editable={edit}
        textContentType="emailAddress"
        style={styles.input}
        onChangeText={setEmail}
        defaultValue={email}
        numberOfLines={1}
      />
      {!edit ? (
        <Button
          loading={loading}
          styleButton={styles.editButton}
          onPress={() => setEdit(true)}
          text="Edit"
        />
      ) : (
        <View style={styles.buttonGroup}>
          <TextButton
            loading={loading}
            styleButtonText={styles.cancelText}
            onPress={() => setEdit(false)}
            text="Cancel"
          />
          <Button
            loading={loading}
            styleButton={styles.saveButton}
            onPress={async () => {
              try {
                setLoading(true);
                await user.updateEmail(email);
              } catch (error) {
                console.log(error);
              } finally {
                setLoading(false);
              }
            }}
            text="Save"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 8,
  },
  cancelText: {
    color: '#808080',
  },
  editButton: {
    marginTop: 8,
    height: 40,
    width: 120,
  },
  saveButton: {
    width: 120,
    height: 40,
    marginLeft: 12,
  },
  input: {
    marginVertical: 6,
    paddingLeft: 6,
    borderWidth: 1,
    width: 250,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
});

export default SetttingsScreen;
