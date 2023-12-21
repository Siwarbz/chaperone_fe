/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Iconicons from 'react-native-vector-icons/FontAwesome5';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import {useNavigation} from '@react-navigation/core';
import {createTranscription} from './utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChaperoneScreen = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 140,
            height: 140,
            borderRadius: 100,
            borderStyle: 'dashed',
            borderWidth: 2,
            borderColor: '#28283A',
            marginBottom: 20,
          }}>
          <Iconicons name={'microphone'} size={80} color="#28283A" />
        </View>
      </View>
      <TouchableOpacity
        style={styles.button2Style}
        activeOpacity={0.5}
        onPress={async () => {
          navigation.navigate('StartTranscriptionScreen');
        }}>
        <Text style={styles.button2TextStyle}> Démarrer Transcription</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button1Style}
        activeOpacity={0.5}
        onPress={() => navigation.navigate('ReportsScreen')}>
        <Text style={styles.button1TextStyle}>Voir mes rapports</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChaperoneScreen;
const styles = StyleSheet.create({
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
