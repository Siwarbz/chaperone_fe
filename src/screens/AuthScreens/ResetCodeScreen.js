/* eslint-disable prettier/prettier */
import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Dimensions,
  TextInput,
  Text,
  TouchableOpacity,
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

const ResetCodeScreen = () => {
  // Add navigation
  const navigation = useNavigation();
  const navigateToReset = () => {
    navigation.navigate('ResetPasswordScreen');
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
  /*
    const submitOTP = async () => {
        Keyboard.dismiss();
        if(isObjectValid(OTP)){
            let val ='';
            Object.values(OTP).forEach(v =>{
                val+= v;
            })
            const res = await verifyEmail(val, profile.id)
            if(!res.success) return updateNotification(setMessage, res.error)
            navigation.dispatch(
                StackActions.replace('AccueilPatient',{profile: res.patient})
            )
        }

    };
    */

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
        <View style={{alignItems: 'center'}}>
          <Image
            style={{marginBottom: 0.1 * height, height: 120, width: 100}}
            source={require('../../images/Logo_Fysali.png')}></Image>
        </View>

        <Text
          style={{
            color: '#172A48',
            textAlign: 'center',
            fontSize: 20,
            fontFamily: 'Poppins-Regular',
            marginBottom: 15,
          }}>
          Entrer le code de modification de mot de passe !
        </Text>

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
                    borderColor: '#FA5075',
                    paddingHorizontal: 15,
                  }}
                />
              </View>
            );
          })}
        </View>
        <View
          style={{
            marginTop: 0.07 * height,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FlatButton navigation={navigateToReset} text="Vérifier" />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
export default ResetCodeScreen;
