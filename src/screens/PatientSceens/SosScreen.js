/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Alert,
  Text,
  ActivityIndicator,
  StyleSheet,
  PermissionsAndroid,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
//import messaging from '@react-native-firebase/messaging';
import Iconicons from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {IP} from '../client';
import {azure} from '../client';

import Animated from 'react-native-reanimated';

const SosScreen = ({navigation}) => {
  const [patientId, setPatientId] = useState();
  const [position, setPosition] = useState();
  const [address, setAddress] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [customMessage, setCustomMessage] = useState(
    "J'ai besoin de votre aide!",
  );
  const [contactList, setContactList] = useState([]);

  const buttonColors = [
    {color: '#0099CC', text: 'Test'},
    {color: '#FFC300', text: 'Erreur'},
  ];

  const sendSOS = async () => {
    setShowModal(false);
    /*
    try {
      const apiKey =
        'AAAA1-N2n1w:APA91bHUQkduYuJYL0YVTZBkv78mGJwEfR4jM4YQ7J-VU866gRMXsmcYz9mVNTE9SbkcglLiSoNoLEisto51mY9tNoIWfPz2XyvlR1XEZ8NFajeF_etyZByB5k3qNXTW3aM9ZLErLy2m';
      const headers = {
        Authorization: `Bearer ${apiKey}`, // Set the API key in the Authorization header
        'Content-Type': 'application/json', // You can set other headers as needed
      };

      const response = await axios.post(
        'https://fcm.googleapis.com/fcm/send',
        {
          registration_ids: contactList.map(user => user.deviceToken),
          data: {name: 'notification test'},
          notification: {
            body: 'This is an FCM notification message!',
            title: 'from siwar dev',
          },
        },
        {
          headers: headers, // Include the headers in the request
        },
      );

      // Handle the response data here
      console.log(response.data);
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }*/
  };
  // handeling notifications
  /*
  useEffect(() => {
    // foreground
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('App opened by clicking on notification', remoteMessage);
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'notification caused open app from quit state',
            remoteMessage.notification,
          );
        }
      });

    return unsubscribe;
  });*/
  useEffect(() => {
    async function getAllChaperonInfos() {
      try {
        AsyncStorage.getItem('user_id').then(id => {
          setPatientId(id);
          axios
            .get(`${azure}/api/patient/getAllMyChaperon/${id}`)
            .then(response => {
              setContactList(response.data.trustContactInfos);
              console.log('contactList :', contactList);
            });
        });
      } catch (error) {
        console.log(error);
      }
    }
    getAllChaperonInfos();
  }, []);
  useEffect(() => {
    const sosPermissions = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'This app needs access to your location for SOS functionality.',
          },
        );

        //console.log('ACCESS_FINE_LOCATION', granted);

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //console.log('Location Permissions granted');
          console.log(position);
          Geolocation.getCurrentPosition(
            pos => {
              const crd = pos.coords;
              //note that Nominatim has usage policies, and if we plan to use it extensively or in a commercial application,
              //we consider setting up your own instance of Nominatim to avoid any usage limitations or rate limiting from the public service.
              fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${crd.latitude}&lon=${crd.longitude}`,
              )
                .then(response => response.json())
                .then(data => {
                  if (data.display_name) {
                    const localisation = data.display_name;
                    setAddress(localisation);
                    console.log('Address:', localisation);
                  } else {
                    console.log('Address not found');
                  }
                })
                .catch(error => {
                  console.error('Error fetching address:', error);
                });
              setPosition({
                latitude: crd.latitude,
                longitude: crd.longitude,
                latitudeDelta: 0.0421,
                longitudeDelta: 0.0421,
              });
              console.log(position);
            },
            err => {
              console.log(err);
            },
            {
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 1000,
              distanceFilter: 10, // Update when the user has moved 10 meters
            },
          );
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    };
    sosPermissions();
    console.log(position);
  }, [position]);

  const renderContact = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 2,
          borderColor: '#FF8C98',
          borderRadius: 10,
          padding: 5,
          justifyContent: 'space-around',
          margin: 5,
        }}>
        <Text style={{color: 'black'}}>
          {item.firstName}
          {item.lastName}
        </Text>
        <TouchableOpacity
          onPress={() => deleteContact(item.trustContactId)}
          style={{marginLeft: 10, color: 'red'}}>
          <Icon name="times" size={20} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const deleteContact = id => {
    // Remove the contact with the specified id from the list
    if (contactList.length > 1) {
      setContactList(prevList =>
        prevList.filter(contact => contact.trustContactId !== id),
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,

        backgroundColor: '#fff',
      }}>
      {position ? (
        <MapView
          style={styles.map}
          initialRegion={position}
          showsMyLocationButton={true}
          followsUserLocation={true}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}>
          <Marker
            title="Votre localisation"
            description="This is a description"
            coordinate={position}
          />
        </MapView>
      ) : (
        <ActivityIndicator size="large" color="#0099CC" style={styles.map} />
      )}
      <View
        style={{
          flex: 1,
        }}></View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',

          marginTop: 20,
        }}>
        {buttonColors.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, {backgroundColor: button.color}]}
            onPress={() => {
              // Handle button press here
              // You can add specific functionality for each button
            }}>
            <Text style={styles.buttonText}>{button.text}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => {
            setShowModal(true);
          }}>
          <Animatable.View
            animation="bounce"
            easing="ease-out"
            duration={1000}
            scale={1.5} // Larger scale during pulse
            iterationCount="infinite"
            style={{
              zIndex: 1,

              backgroundColor: 'red',
              borderRadius: 100,

              justifyContent: 'center',
            }}>
            <Text style={styles.buttonText}>Urgence SOS</Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}>
              <Iconicons name="times" size={24} color="black" />
            </TouchableOpacity>
            <View>
              <Text style={{color: 'black'}}>Envoyer une alert</Text>
              <Text style={{color: 'black'}}>Votre localisation</Text>
              {position ? (
                <Text
                  style={{
                    color: 'black',
                    borderWidth: 2,
                    borderColor: '#E0A845',
                    borderRadius: 10,
                    padding: 5,
                    justifyContent: 'space-around',
                    margin: 5,
                  }}>
                  {address}
                </Text>
              ) : (
                <ActivityIndicator size="large" color="#0099CC" />
              )}

              <Text style={{color: 'black'}}>
                à mes contacts de confiance :
              </Text>
              <FlatList
                data={contactList}
                renderItem={renderContact}
                keyExtractor={item => item.trustContactId.toString()}
              />
              <Text style={{color: 'black'}}>Message :</Text>
              <TextInput
                placeholder={customMessage}
                value={customMessage}
                style={styles.messageInput}
                onChangeText={text => setCustomMessage(text)}
              />
              <TouchableOpacity
                onPress={() => {
                  if (position) {
                    sendSOS();
                  }
                }}
                style={styles.modalbutton}>
                <Text style={styles.modalbuttonText}>Envoyer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SosScreen;
const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    padding: 10,
    borderRadius: 25,
    margin: 10,
  },
  buttonText: {
    fontFamily: 'Poppins-Bold',
    color: 'white',
    padding: 10,
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  SOSbutton: {
    position: 'absolute',
    left: 5,
    width: 50, // Adjust the width and height to make it circular
    height: 50, // Adjust the width and height to make it circular
    backgroundColor: 'red',
    borderRadius: 25, // Make it a circular button
  },
  SOSbuttonText: {
    color: 'white',
    fontSize: 18,

    fontWeight: 'Poppins-Bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },

  modalbutton: {
    backgroundColor: '#69BBF5',
    borderRadius: 100,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  modalbuttonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  messageInput: {
    borderColor: '#69BBF5',
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    marginBottom: 10,
    color: 'black',
  },
});
