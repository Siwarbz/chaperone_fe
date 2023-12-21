/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import Iconicons from 'react-native-vector-icons/FontAwesome5';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {IP} from '../client';

const StartTranscriptionScreen = ({navigation, route}) => {
  const roomId = route.params.roomId;
  const [user, setUser] = useState({firstName: '', lastName: '', email: ''});
  const [recording, setRecording] = useState(false);
  useEffect(() => {
    async function getAllNotifications() {
      try {
        AsyncStorage.getItem('user_id').then(id => {
          axios.get(`${IP}/api/patient/getAllInfos/${id}`).then(infos => {
            setUser(infos.data.user);
            console.log(infos.data.user);
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
    getAllNotifications();
  }, []);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'App needs access to your microphone.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Microphone permission granted');
      } else {
        console.log('Microphone permission denied');
      }
    } catch (error) {
      console.log('Error checking microphone permission:', error);
    }
  };

  const startRecording = async () => {
    try {
      Alert.alert(
        'Confirmation',
        'Êtes-vous sûr de vouloir commencer la transcription ?',
        [
          {
            text: 'Annuler',
            style: 'cancel',
          },
          {
            text: 'Commencer',
            onPress: () => {
              setRecording(true);
            },
          },
        ],
      );

      // Start recording audio here using the appropriate library or API
    } catch (error) {
      console.log('Error starting audio recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      Alert.alert(
        'Confirmation',
        'Êtes-vous sûr de vouloir arrêter la transcription ?',
        [
          {
            text: 'Annuler',
            style: 'cancel',
          },
          {
            text: 'Arrêter',
            onPress: () => {
              setRecording(false);
              axios.get(`https://127.0.0.1:8000/gett`).then(response => {
                console.log(response.data);
              });
              Alert.alert('Transcription terminée');
            },
          },
        ],
      );

      // Stop recording audio here using the appropriate library or API
    } catch (error) {
      console.log('Error stopping audio recording:', error);
    }
  };

  const cancel = async () => {
    try {
      Alert.alert(
        'Attention',
        'Êtes-vous sûr de vouloir annuler la transcription ? RIEN NE SERA ENREGISTRE!',
        [
          {
            text: 'NON',
            style: 'cancel',
          },
          {
            text: 'OUI',
            onPress: () => {
              setRecording(false);
              navigation.navigate('LandingScreen');
            },
          },
        ],
      );

      // Stop recording audio here using the appropriate library or API
    } catch (error) {
      console.log('Error stopping audio recording:', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <Text
        style={{
          fontSize: 16,
          margin: 10,
          fontFamily: 'Poppins-Bold',
          textAlign: 'center',
          color: '#28283A',
        }}>
        Donnez ce RoomID à ton médecin
      </Text>
      <View
        style={{
          fontSize: 16,
          padding: 5,
          marginBottom: 10,
          fontFamily: 'Poppins-Bold',
          textAlign: 'center',
          borderWidth: 1,
          borderColor: 'grey',
          borderRadius: 20,
        }}>
        <Text
          style={{
            fontSize: 18,
            color: '#28283A',
            fontFamily: 'Poppins-Bold',
            textAlign: 'center',
          }}>
          {roomId}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 18,
          marginBottom: 20,
          fontFamily: 'Poppins-Bold',
          color: '#28283A',
        }}>
        Autorisation de microphone
      </Text>
      {recording ? (
        <Text
          style={{
            fontSize: 16,
            marginBottom: 20,
            fontFamily: 'Poppins-Regular',
            width: 250,
            textAlign: 'center',
            color: '#28283A',
          }}>
          Transcription en cours... Appuyez pour arrêter
        </Text>
      ) : (
        <Text
          style={{
            fontSize: 16,
            marginBottom: 20,
            width: 250,
            textAlign: 'center',
            fontFamily: 'Poppins-Regular',
          }}>
          Appuyez sur le microphone pour commencer la transcription
        </Text>
      )}
      <View>
        <TouchableOpacity
          onPress={recording ? stopRecording : startRecording}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 120,
            height: 120,
            borderRadius: 100,
            borderStyle: recording ? 'dashed' : null,
            borderWidth: 2,
            borderColor: recording ? '#E0A845' : '#28283A',
            marginBottom: 10,
          }}>
          <Iconicons
            name={recording ? 'microphone' : 'microphone-slash'}
            size={60}
            color="#28283A"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.shadowContainer}>
        <TouchableOpacity style={styles.adduser}>
          <Iconicons name="user-plus" size={25} color="#E0A845" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button1Style}
        activeOpacity={0.5}
        onPress={() => cancel()}>
        <Text style={styles.button1TextStyle}>Annuler la transcription</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartTranscriptionScreen;
const styles = StyleSheet.create({
  shadowContainer: {
    flexDirection: 'row',
    margin: 15,
  },
  adduser: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    margin: 10,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#E0A845',
  },
  button1Style: {
    borderRadius: 100,
    borderColor: '#E0A845',
    borderWidth: 1,
    backgroundColor: 'white',
    margin: 10,
  },
  button2Style: {
    borderRadius: 100,
    borderWidth: 0,
    backgroundColor: '#E0A845',
    margin: 10,
  },
  button1TextStyle: {
    fontFamily: 'Poppins-Regular',
    color: '#E0A845',
    padding: 10,
    fontSize: 16,
  },
  button2TextStyle: {
    padding: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'white',
  },
});
