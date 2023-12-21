/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Avatar, Card} from 'react-native-elements';
import MapView, {Marker} from 'react-native-maps';
import {IP} from '../client';
import {ScrollView} from 'react-native-gesture-handler';

const ProfileScreen = () => {
  const [user, setUser] = useState({fistrName: '', lastName: '', email: ''});
  useEffect(() => {
    async function getAllInfos() {
      try {
        AsyncStorage.getItem('user_id').then(id => {
          axios.get(`${IP}/api/doctor/getAllInfos/${id}`).then(infos => {
            setUser(infos.data.user);
            console.log(infos.data.user);
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
    getAllInfos();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Avatar
          rounded
          size={100}
          source={require('../../images/profile.png')}
          containerStyle={styles.profileImage}
        />
        <Card containerStyle={styles.cardContainer}>
          <Card.Title style={styles.name}>
            {user.firstName}

            {user.lastName}
          </Card.Title>
          <Card.Divider />
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.bio}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut
            rhoncus felis. Integer vitae ex purus. Nulla ullamcorper dapibus
            tincidunt.
          </Text>
        </Card>
        <Card containerStyle={styles.mapContainer}>
          <Card.Title style={styles.mapTitle}>Address Location</Card.Title>
          <Card.Divider />
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{latitude: 37.78825, longitude: -122.4324}}
              title="Location"
              description="Address details"
            />
          </MapView>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  profileImage: {
    margin: 10,
  },
  cardContainer: {
    width: '90%',
    borderRadius: 10,
    elevation: 3,
    height: 180,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#808080',
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
  },
  mapContainer: {
    marginTop: 20,
    width: '90%',
    height: 200,
    borderRadius: 10,
    elevation: 3,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  map: {
    height: 200,
    borderRadius: 10,
  },
});

export default ProfileScreen;
