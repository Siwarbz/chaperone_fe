/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import {IP} from '../client';
import {azure} from '../client';

const Transcription = () => {
  const route = useRoute();
  const item = route.params.trans;
  const [transcription, setTranscription] = useState('');
  useEffect(() => {
    async function getAllTranscriptions() {
      try {
        const id = await AsyncStorage.getItem('user_id');
        console.log(id);
        axios
          .get(`${azure}/api/transcription/getTranscriptionById/${item}`)
          .then(response => {
            console.log(response.data);
            setTranscription(response.data.transcription);
          });
      } catch (error) {
        console.log(error);
      }
    }
    getAllTranscriptions();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Résumé</Text>
      <View style={styles.sumView}>
        <Text style={styles.transcription}>{transcription.sum}</Text>
      </View>
      <Text style={styles.title}>Transcription</Text>
      <View style={styles.transcView}>
        <Text style={styles.transcription}>{transcription.transcription}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    fontFamily: 'Poppins-Regular',
  },
  transcription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    color: '#28283A',
  },
  transcView: {
    backgroundColor: '#69BBF5',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#28283A',
  },

  sumView: {
    backgroundColor: '#E0A845',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});

export default Transcription;
