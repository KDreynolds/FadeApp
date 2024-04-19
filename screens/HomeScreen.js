import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [selectedClub, setSelectedClub] = useState('');
  const [ballLocation, setBallLocation] = useState(null);
  const [shotClub, setShotClub] = useState('');
  const [nextShotLocation, setNextShotLocation] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
    })();
  }, []);

  const setClubForShot = () => {
    setShotClub(selectedClub);
    console.log('Club set for shot:', selectedClub);
  };

  const markBallLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setBallLocation(location);
    console.log('Ball location marked:', location);
  };

  const markNextShotLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setNextShotLocation(location);
    console.log('Next shot location marked:', location);
    console.log('Ball Location:', ballLocation);
    console.log('Selected Club:', selectedClub);
    console.log('Shot Club:', shotClub);
    console.log('Condition:', ballLocation !== null && shotClub !== '');

    if (ballLocation !== null && shotClub !== '') {
      const distance = calculateDistance(
        ballLocation.coords.latitude,
        ballLocation.coords.longitude,
        location.coords.latitude,
        location.coords.longitude
      );
      console.log('Calculated Distance:', distance);
      navigation.navigate('ShotInfo', { club: shotClub, distance });
    }
  };
  
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return Math.round(distance * 1000); // Convert to meters and round to nearest integer
  };
  
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const showShotInfo = (club, distance) => {
    Alert.alert(
      'Shot Info',
      `Club: ${club}\nDistance: ${distance} meters`,
      [{ text: 'OK', onPress: () => {
        setBallLocation(nextShotLocation);
        setNextShotLocation(null);
        setShotClub('');
      }}],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shot Tracker</Text>
      <Picker
        selectedValue={selectedClub}
        onValueChange={(itemValue) => setSelectedClub(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select a club" value="" />
        <Picker.Item label="Driver" value="driver" />
        <Picker.Item label="3 Wood" value="wood3" />
        <Picker.Item label="5 Wood" value="wood5" />
        <Picker.Item label="3 Hybrid" value="hybrid3" />
        <Picker.Item label="5 Hybrid" value="hybrid5" />
        <Picker.Item label="4 Iron" value="iron4" />
        <Picker.Item label="5 Iron" value="iron5" />
        <Picker.Item label="6 Iron" value="iron6" />
        <Picker.Item label="7 Iron" value="iron7" />
        <Picker.Item label="8 Iron" value="iron8" />
        <Picker.Item label="9 Iron" value="iron9" />
        <Picker.Item label="P Wedge" value="wedgeP" />
        <Picker.Item label="S Wedge" value="wedgeS" />
        <Picker.Item label="A Wedge" value="wedgeA" />
        <Picker.Item label="Putter" value="putter" />
      </Picker>
      <Button title="Set Club for Shot" onPress={setClubForShot} />
      <Text>Selected Club: {shotClub}</Text>
      <Button title="Mark Ball Location" onPress={markBallLocation} />
      {ballLocation && (
        <Text>
          Ball Location: {ballLocation.coords.latitude}, {ballLocation.coords.longitude}
        </Text>
      )}
      {ballLocation && shotClub && (
        <Button title="Mark Next Shot Location" onPress={markNextShotLocation} />
      )}
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
  picker: {
    width: '100%',
    marginBottom: 20,
  },
});

export default HomeScreen;