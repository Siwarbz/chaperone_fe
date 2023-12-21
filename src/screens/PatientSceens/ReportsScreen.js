/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import {IP} from '../client';
import {azure} from '../client';

const ReportsScreen = () => {
  const [transcription, setTranscription] = useState([]);
  useEffect(() => {
    async function getAllTranscriptions() {
      try {
        const id = await AsyncStorage.getItem('user_id');
        console.log(id);
        axios
          .get(`${azure}/api/transcription/getTranscriptionByPatientId/${id}`)
          .then(response => {
            console.log(response.data);
            setTranscription(response.data.transcriptions);
          });
      } catch (error) {
        console.log(error);
      }
    }
    getAllTranscriptions();
  }, []);
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {transcription.map((item, index) => (
        <View key={index} style={styles.button1Style}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Transcription', {trans: item._id})
            }>
            <Text style={styles.button1TextStyle}>
              {new Date(item.created_at).getDate()}/
              {new Date(item.created_at).getMonth() + 1}/
              {new Date(item.created_at).getFullYear()} à{' '}
              {new Date(item.created_at).getHours()}:
              {new Date(item.created_at).getMinutes()}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};
export default ReportsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
    fontFamily: 'Poppins-Regular',
  },
  listView: {
    backgroundColor: '#FA5075',
    padding: 10,

    borderRadius: 20,
    margin: 10,
  },

  transcriptionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: '#ffff',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  button1Style: {
    borderRadius: 100,
    borderColor: '#E0A845',
    borderWidth: 2,
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
    fontFamily: 'Poppins-Bold',
    color: '#E0A845',
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  button2TextStyle: {
    padding: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'white',
  },
});
