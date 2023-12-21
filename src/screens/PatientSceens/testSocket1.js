/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Button, Text, StyleSheet, Platform} from 'react-native';

import AudioRecord from 'react-native-audio-record';
import {PermissionsAndroid} from 'react-native';

import RNFS from 'react-native-fs';

const TestSockett = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [counter, setCounter] = useState(1);
  const [intervalId, setIntervalId] = useState(null);
  let audioFileCounter = 1;

  // Define the WebSocket object
  const [socket, setSocket] = useState(null);

  const handleSocketOpen = () => {
    setSocketConnected(true);
  };

  const handleSocketClose = () => {
    setSocketConnected(false);
  };

  //const audioRecorderPlayer = new AudioRecorderPlayer();

  // Function to stop recording and send the final audio data to the server

  const stopSendingAudio = async () => {
    setIsSending(false);
    audioFileCounter = 1;
    setCounter(1);
  };

  useEffect(() => {
    // Create and set up the WebSocket connection
    const newSocket = new WebSocket('ws://192.168.1.2:8000/ws/transcribe/'); // This URL works on the emulator because it is localhost
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

  useEffect(() => {
    const startSendingAudio = async () => {
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
            if (socketConnected && isSending) {
              // Create an interval to send audio fragments every 3 seconds

              // Define audio recording options
              const audioConfig = {
                sampleRate: 16000, // Adjust the sample rate as needed
                channels: 1, // Mono audio
                bitsPerSample: 16, // 16-bit audio
                audioSource: 6, // Microphone audio source
              };
              console.log('audio ', counter, ' sended');
              try {
                audioFileCounter += 1;

                // Start audio recording
                AudioRecord.init(audioConfig);
                AudioRecord.start();

                // Record audio for 3 seconds
                setTimeout(async () => {
                  // Stop audio recording
                  const audioDataFile = await AudioRecord.stop();
                  console.log(audioDataFile);

                  const audioData = await RNFS.readFile(
                    audioDataFile,
                    'base64',
                  );
                  socket.send(JSON.stringify({audio_data: audioData}));
                  setCounter(counter + 1);
                  console.log('counter', counter);
                }, 4000); // 3 seconds
                // Continue sending audio if isSending is still true
              } catch (error) {
                console.error('Error starting audio recording:', error);
              }
            }
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
    if (isSending) {
      startSendingAudio();
    }
  }, [isSending, counter]);

  return (
    <View style={styles.container}>
      <Button
        title="Start Sending"
        onPress={() => setIsSending(true)}
        disabled={!socketConnected || isSending}
        style={styles.button}
      />
      <Button
        title="Stop Sending"
        onPress={stopSendingAudio}
        disabled={!socketConnected || !isSending}
        style={styles.button}
      />
      <Text style={styles.transcriptionText}>
        Transcription: {transcription}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  button: {
    marginTop: 16,
    backgroundColor: 'blue',
    color: 'white',
  },
  transcriptionText: {
    marginTop: 16,
    fontSize: 16,
  },
});

export default TestSockett;
