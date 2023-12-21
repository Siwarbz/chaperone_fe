/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, Button, Text, StyleSheet, Platform} from 'react-native';
import WS from 'react-native-websocket';
import AudioRecord from 'react-native-audio-record';
import {PermissionsAndroid} from 'react-native';
import {encode} from 'base-64';
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const TestSocket = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [isSending, setIsSending] = useState(false);
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
          if (socketConnected && !isSending) {
            setIsSending(true);

            // Create an interval to send audio fragments every 3 seconds

            // Define audio recording options
            const audioConfig = {
              sampleRate: 16000, // Adjust the sample rate as needed
              channels: 1, // Mono audio
              bitsPerSample: 16, // 16-bit audio
              audioSource: 6, // Microphone audio source
            };
            console.log('audio ', audioFileCounter, ' sended');
            try {
              // Increment audioFileCounter
              audioFileCounter += 1;

              // Start audio recording
              AudioRecord.init(audioConfig);
              AudioRecord.start();

              // Record audio for 3 seconds

              // Stop audio recording

              // Adjust the recording duration as needed
            } catch (error) {
              console.error('Error starting audio recording:', error);
            }
            // Interval for sending audio (3 seconds)

            // Store the interval ID for later use
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
  // Function to stop recording and send the final audio data to the server

  const stopSendingAudio = async () => {
    setIsSending(false);
    audioFileCounter = 1;
    // Clear the interval to stop sending audio
    const audioDataFile = await AudioRecord.stop();
    console.log(audioDataFile);
    // Read the audio file as binary data
    const audioData = await RNFS.readFile(audioDataFile, 'base64');
    socket.send(JSON.stringify({audio_data: audioData}));
  };

  const handleTranscription = message => {
    setTranscription(message.data);
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

  return (
    <View style={styles.container}>
      <Button
        title="Start Sending"
        onPress={startSendingAudio}
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

export default TestSocket;
