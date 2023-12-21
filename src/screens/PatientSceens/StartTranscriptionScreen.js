/* eslint-disable prettier/prettier */
/*
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Voice from '@react-native-community/voice';

const StartTranscriptionScreen = () => {
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);

  const speechStartHandler = e => {
    console.log('speechStart successful', e);
  };
  const speechEndHandler = e => {
    setLoading(false);
    console.log('stop handler', e);
  };
  const speechResultsHandler = e => {
    const text = e.value[0];
    setResult(text);
    console.log('speech result handler', e);
  };
  const startRecording = async () => {
    setLoading(true);
    try {
      await Voice.start('fr-FR', {
        showPartial: true, // Show partial results in real-time
        continuous: true, // Enable continuous listening
      });
    } catch (error) {
      console.log('error', error);
    }
  };
  const stopRecording = async () => {
    try {
      await Voice.stop();
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };
  const clear = () => {
    setResult('');
  };
  useEffect(() => {
    Voice.onSpeechStart = speechStartHandler;

    Voice.onSpeechPartialResults = speechResultsHandler;

    console.log(result);
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  useEffect(() => console.log(result), [result]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headingText}>Voice to Text Recognition</Text>
        <View style={styles.textInputStyle}>
          <Text
            style={{
              flex: 1,
              height: '100%',
            }}>
            {result}
          </Text>
        </View>
        <View style={styles.btnContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <TouchableOpacity onPress={startRecording} style={styles.speak}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Speak</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.stop} onPress={stopRecording}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Stop</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.clear} onPress={clear}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Clear</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  headingText: {
    alignSelf: 'center',
    marginVertical: 26,
    fontWeight: 'bold',
    fontSize: 26,
  },
  textInputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 300,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
    color: '#000',
  },
  speak: {
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
  },
  stop: {
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
  },
  clear: {
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    with: '50%',
    justifyContent: 'space-evenly',
    marginTop: 24,
  },
});
export default StartTranscriptionScreen;*/
/*
import LiveAudioStream from 'react-native-live-audio-stream';
import Voice from '@react-native-community/voice';
import {Buffer} from 'buffer';
import React, {useState, useEffect} from 'react';
import {View, Button} from 'react-native';
import RNFS from 'react-native-fs';

//import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const StartTranscriptionScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [micStreamListener, setMicStreamListener] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [transcription, setTranscription] = useState('');
  // Declare a variable to store the concatenated audio data
  let concatenatedAudioData = Buffer.alloc(0); // Initialize an empty Buffer

  // Define the WebSocket object
  const [socket, setSocket] = useState(null);
  // Add a listener to receive audio data chunks

  const handleSocketOpen = () => {
    setSocketConnected(true);
    console.log('socket is open');
  };

  const handleSocketClose = () => {
    setSocketConnected(false);
    console.log('socket is closed');
  };
  const serverURL = 'ws://192.168.1.8:8000/ws/transcribe/'; // Replace with your server URL

  useEffect(() => {
    // Create and set up the WebSocket connection
    const newSocket = new WebSocket('ws://192.168.1.3:8000/ws/transcribe/'); // This URL works on the emulator because it is localhost
    newSocket.addEventListener('open', handleSocketOpen);
    newSocket.addEventListener('close', handleSocketClose);
    newSocket.addEventListener('message', event => {
      // Handle WebSocket message (transcription result)
      setTranscription(event.data);
      console.log(event.data);
    });

    setSocket(newSocket);

    // Clean up the WebSocket connection on unmount
    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, []);

  const startRecording = async () => {
    setIsRecording(true);

    const options = {
      sampleRate: 32000, // default is 44100 but 32000 is adequate for accurate voice recognition
      channels: 1, // 1 or 2, default 1
      bitsPerSample: 16, // 8 or 16, default 16
      audioSource: 6, // android only (see below)
      bufferSize: 4096, // default is 2048
    };
    LiveAudioStream.init(options);
    LiveAudioStream.start();
    LiveAudioStream.on('data', data => {
      var chunk = Buffer.from(data, 'base64'); // Use 3rd-party modules like buffer to decode base64 data
      // Append the chunk to the concatenatedAudioData
      concatenatedAudioData = Buffer.concat([concatenatedAudioData, chunk]);

      console.log(chunk); // This logs the binary audio data dara
      //socket.send(JSON.stringify({audio_data: data}));
    });
  };

  const stopRecording = async () => {
    setIsRecording(false);

    LiveAudioStream.stop();
  };

  return (
    <View>
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? stopRecording : startRecording}
      />
    </View>
  );
};

export default StartTranscriptionScreen;*/

import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Alert,
  StyleSheet,
  PermissionsAndroid,
  TouchableOpacity,
  Platform,
} from 'react-native';
import MicStream from 'react-native-microphone-stream';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {IP} from '../client';
const StartTranscriptionScreen = ({navigation}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [micStreamListener, setMicStreamListener] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [transcription, setTranscription] = useState('');
  // Define the WebSocket object
  const [socket, setSocket] = useState(null);
  const [patientId, setPatientId] = useState('');
  useEffect(() => {
    async function getAllChaperonInfos() {
      try {
        AsyncStorage.getItem('user_id').then(id => {
          setPatientId(id);
        });
      } catch (error) {
        console.log(error);
      }
    }
    getAllChaperonInfos();
  }, []);
  // Add a listener to receive audio data chunks
  const handleSocketOpen = () => {
    setSocketConnected(true);
    console.log('socket is open');
  };
  const handleSocketClose = () => {
    setSocketConnected(false);
    console.log('socket is closed');
  };
  useEffect(() => {
    // Create and set up the WebSocket connection
    const newSocket = new WebSocket(
      'ws://fysaliii.azurewebsites.net/ws/transcribe/',
    ); // This URL works on the emulator because it is localhost
    newSocket.addEventListener('open', handleSocketOpen);
    newSocket.addEventListener('close', handleSocketClose);
    newSocket.addEventListener('message', event => {
      // Handle WebSocket message (transcription result)
      setTranscription(event.data);
      console.log(event.data);
    });
    setSocket(newSocket);
    // Clean up the WebSocket connection on unmount
    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, []);
  const startRecording = async () => {
    setIsRecording(true);
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
        console.log('write external stroage', grants);
        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Permissions granted');
          MicStream.init({
            bufferSize: 4096, // length of the chunk
            sampleRate: 44100, // Sample rate in Hz
            bitsPerChannel: 16, // 16 bit signed
            channelsPerFrame: 1, // mono
          });
          MicStream.start();
          const sendAudioChunkToServer = chunk => {
            // a chunk duration is ≈ 0.04626 seconds
            //console.log(chunk);
            if (socket.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify({audio_data: chunk}));
            }
          };
          // Attach the listener to MicStream
          const listener = MicStream.addListener(sendAudioChunkToServer);
          setMicStreamListener(listener);
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };
  const stopRecording = async () => {
    setIsRecording(false);
    // Stop recording and streaming
    MicStream.stop();
    // Remove the listener
    if (micStreamListener) {
      micStreamListener.remove();
    }
    // send user id to server when the socket is open
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({user_id: patientId}));
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
              socket.send(JSON.stringify({cancel_type: 'stop_with_save'}));
              setIsRecording(false);
              navigation.navigate('LandingScreen');
              socket.close();
            },
          },
        ],
      );
      // Stop recording audio here using the appropriate library or API
    } catch (error) {
      console.log('Error stopping audio recording:', error);
    }
  };
  // send sos to trust contact function
  const sendSos = async () => {
    navigation.navigate('SosScreen');
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      {isRecording && (
        <Text
          style={{
            fontSize: 16,
            margin: 15,
            fontFamily: 'Poppins-Regular',
            textAlign: 'center',
            color: '#28283A',
          }}>
          Transcription en cours...
        </Text>
      )}
      <ScrollView style={styles.transcriptionContainer}>
        <Text style={styles.transcriptionText}>{transcription}</Text>
      </ScrollView>
      <TouchableOpacity
        style={styles.button1Style}
        activeOpacity={0.5}
        onPress={() => cancel()}>
        <Text style={styles.button1TextStyle}>Annuler la transcription</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button2Style}
        activeOpacity={0.5}
        disabled={!socketConnected}
        onPress={() => (isRecording ? stopRecording() : startRecording())}>
        <Text style={styles.button2TextStyle}>
          {isRecording
            ? 'Terminer et générer le rapport'
            : 'Commencer la transcription'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonSOS}
        activeOpacity={0.5}
        onPress={() => sendSos()}>
        <Text style={styles.textSOS}>SOS</Text>
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
  transcriptionContainer: {
    borderWidth: 2,
    borderColor: '#E0A845',
    borderRadius: 10,
    width: '90%',
    padding: 10,
    marginTop: 10,
  },
  transcriptionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#28283A',
  },
  buttonSOS: {
    margin: 5,
    padding: 5,
    borderRadius: 100,
    backgroundColor: '#FF8C98',
  },
  textSOS: {
    padding: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'white',
  },
});
