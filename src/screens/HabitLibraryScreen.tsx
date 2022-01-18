// import React, { useContext, useEffect, useState } from 'react';
// import { FlatList, ScrollView, StyleSheet } from 'react-native';

// import { SafeAreaView } from 'react-native-safe-area-context';
// import { getHabits, HabitType } from '../api/Habits';
// import Habit from '../components/Habit';
// import { AuthContext } from '../context/auth/AuthProvider';
// import { AuthTabNavigationProp } from '../navigation/AuthTab';

// type Props = AuthTabNavigationProp<'HabitLibrary'>;
// const HabitLibraryScreen: React.VFC<Props> = () => {
//   const [habits, setHabits] = useState<HabitType[]>([]);
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     if (user) {
//       getHabits(user.uid).then(setHabits);
//     }
//   }, []);
//   const renderItem = ({ item }: { item: HabitType }) => (
//     <Habit habitText={item.habitText} onPress={() => {}} />
//   );

//   return (
//     <SafeAreaView edges={['left', 'right']} style={styles.root}>
//       <FlatList
//         contentContainerStyle={styles.contentContainer}
//         data={habits}
//         renderItem={renderItem}
//         keyExtractor={(_, index) => index.toString()}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   root: {
//     flexGrow: 1,
//   },
//   contentContainer: {
//     paddingVertical: 24,
//     alignItems: 'center',
//   },
// });

// export default HabitLibraryScreen;
