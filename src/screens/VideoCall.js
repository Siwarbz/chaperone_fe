/* eslint-disable prettier/prettier */
/*
import React from 'react';
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {StyleSheet, View} from 'react-native';
const AppID = '619884632';
const AppSign =
  '817afb2b8cfad6f37fcce3d9b2b8ac8a60db5df77ab3eb04cf042cbb6a868a0a';
export default function VideoCall({navigation, route}) {
  const {userName, userId, roomId} = route.params;
  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        appID={619884632}
        appSign={
          '817afb2b8cfad6f37fcce3d9b2b8ac8a60db5df77ab3eb04cf042cbb6a868a0a'
        }
        userID={userId} // userID can be something like a phone number or the user id on your own user system.
        userName={userName}
        callID={roomId} // callID can be any unique string.
        config={{
          // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onOnlySelfInRoom: () => {
            navigation.navigate('LandingScreen');
          },
          onHangUp: () => {
            navigation.navigate('LandingScreen');
          },
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1},
  profileImage: {
    margin: 10,
  },
  cardContainer: {
    width: '90%',
    borderRadius: 10,
    elevation: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#808080',
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
  },
  button1Style: {
    borderRadius: 100,
    borderColor: '#69BBF5',
    borderWidth: 1,
    backgroundColor: 'white',
    margin: 10,
  },
  button2Style: {
    borderRadius: 100,
    borderWidth: 0,
    backgroundColor: '#69BBF5',
    margin: 10,
  },
  button1TextStyle: {
    fontFamily: 'Poppins-Regular',
    color: '#69BBF5',
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
*/
