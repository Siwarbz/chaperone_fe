/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  TextInput,
  Text,
  StyleSheet,
  Image,
  Keyboard,
} from 'react-native';

import FlatButton from '../../components/Button';
import {useState, useRef} from 'react';
import {verifyEmail} from './utils';
import {StackActions} from '@react-navigation/native';
import {
  AppNotification,
  updateNotification,
} from '../../components/appNotifications';
import {useNavigation} from '@react-navigation/core';

var height = Dimensions.get('window').height; //full height
const inputs = Array(4).fill('');
var width = Dimensions.get('window').width;
let newInputIndex = 0;

const isObjectValid = obj => {
  return Object.values(obj).every(val => val.trim());
};

const Verification = ({route}) => {
  const {userId} = route.params;
  // Add navigation
  const navigation = useNavigation();

  const navigateToHomeScreen = () => {
    navigation.navigate('HomeScreen');
  };
  //const {profile} = route.params
  const input = useRef();
  const [OTP, setOTP] = useState({0: '', 1: '', 2: '', 3: ''});
  const [nextInputIndex, setNextInputIndex] = useState(0);
  const handleChangeText = (text, index) => {
    const newOTP = {...OTP};
    newOTP[index] = text;
    setOTP(newOTP);
    const lastInputIndex = inputs.length - 1;
    if (!text) newInputIndex = index === 0 ? 0 : index - 1;
    else newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
    setNextInputIndex(newInputIndex);
  };
  useEffect(() => {
    input.current.focus();
  }, [nextInputIndex]);

  const [message, setMessage] = useState({
    text: '',
    type: '',
  });

  const submitOTP = async () => {
    Keyboard.dismiss();
    if (isObjectValid(OTP)) {
      let val = '';
      Object.values(OTP).forEach(v => {
        val += v;
      });
      const res = await verifyEmail(userId, val);
      console.log(res);
      if (!res.success) return updateNotification(setMessage, res.error);
      navigation.navigate('SuccessScreen');
    }
  };

  return (
    <>
      {message.text ? (
        <AppNotification type={message.type} text={message.text} />
      ) : null}
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: 'center',
          fontFamily: 'Poppins-Regular',
        }}>
        <View>
          <Text style={styles.title}>Vérification de l'Email</Text>
          <Text style={styles.description}>
            Vérifiez votre Email, le code est envoyé!
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: width / 12,
          }}>
          {inputs.map((inp, index) => {
            return (
              <View
                key={index.toString()}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                  value={OTP[index]}
                  onChangeText={text => handleChangeText(text, index)}
                  placeholder="0"
                  ref={nextInputIndex === index ? input : null}
                  keyboardType="numeric"
                  maxLength={1}
                  style={{
                    textAlign: 'center',
                    width: width / 6,
                    height: width / 6,
                    borderWidth: 2,
                    color: '#172A48',
                    borderColor: '#FF8C98',
                    paddingHorizontal: 15,
                  }}
                />
              </View>
            );
          })}
        </View>
        <View style={styles.buttonStyle}>
          <FlatButton navigation={submitOTP} text="Vérifier" />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
export default Verification;
const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },

  buttonStyle: {
    backgroundColor: '#69BBF5',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#69BBF5',
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
    borderColor: '#FF8C98',
    fontFamily: 'Poppins-Regular',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  successTextStyle: {
    color: '#28283A',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
    fontFamily: 'Poppins-Regular',
  },
  dropdownContainer: {
    borderWidth: 2,
    borderRadius: 30,
    borderColor: '#69BBF5',
    fontFamily: 'Poppins-Regular',
    paddingLeft: 10,

    marginLeft: 35,
    marginRight: 35,
    height: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: '#FF8C98',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '300',
    textAlign: 'center',
    color: '#28283A',
    paddingHorizontal: 64,
    marginBottom: 30,
  },
});
