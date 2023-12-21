/* eslint-disable prettier/prettier */
// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from '../../components/Loader';

const ChaperoneScreen = ({navigation, route}) => {
  const {userId, userName} = route.params;
  const [roomId, setRoomId] = useState('');

  return (
    <View style={styles.mainBody}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <Text style={styles.textStyle}>
              Placez votre téléphone sur un trépied et saisissez le RoomID
              fourni par la patiente afin qu'elle puisse observer vos actions
              lors d'un examen gynécologique.
            </Text>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={RoomId => setRoomId(RoomId)}
                placeholder="Entez room ID"
                placeholderTextColor="#28283A"
                autoCapitalize="none"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate('VideoCall', {
                  userName: userName,
                  userId: userId,
                  roomId: roomId,
                })
              }>
              <Text style={styles.buttonTextStyle}>Diffuser</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default ChaperoneScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    alignContent: 'center',
  },
  registerTextStyle: {
    color: '#172A48',
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
  },
  textStyle: {
    color: '#28283A',
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    margin: 15,
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#E0A845',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#E0A845',
    height: 50,
    alignItems: 'center',
    borderRadius: 100,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  inputStyle: {
    flex: 1,
    color: '#172A48',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#E0A845',
    fontFamily: 'Poppins-Regular',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  successTextStyle: {
    color: '#172A48',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
    fontFamily: 'Poppins-Regular',
  },
});
