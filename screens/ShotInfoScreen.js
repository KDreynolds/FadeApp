import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ShotInfoScreen = ({ route, navigation }) => {
  const { club, distance } = route.params;

  const handleNextShot = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shot Info</Text>
      <Text style={styles.info}>Club: {club}</Text>
      <Text style={styles.info}>Distance: {distance} meters</Text>
      <Button title="Next Shot" onPress={handleNextShot} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ShotInfoScreen;