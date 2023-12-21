/* eslint-disable prettier/prettier */
// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';

const SuccessScreen = () => {
  // Add navigation
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
      }}>
      <Image
        source={require('../../images/verify.png')}
        style={{
          height: 150,
          resizeMode: 'contain',
          alignSelf: 'center',
        }}
      />
      <Text style={styles.titleTextStyle}>Vérification</Text>
      <Text style={styles.successTextStyle}>
        Vous avez désormais un accès complet à notre système.
      </Text>
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.buttonTextStyle}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SuccessScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  dropDownContainer: {color: '#172A48'},
  pickerStyle: {color: '#172A48'},
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
    height: 40,
    flex: 1,
    color: '#172A48',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: '#69BBF5',
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
  titleTextStyle: {
    color: '#FF8C98',
    textAlign: 'center',
    fontSize: 20,
    padding: 30,
    fontFamily: 'Poppins-Bold',
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
});
