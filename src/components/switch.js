/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, Switch} from 'react-native';

export default function SwitchCheck({isEnabled, toggleSwitch}) {
  return (
    <Switch
      trackColor={{false: 'grey', true: '#69BBF5'}}
      thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
      ios_backgroundColor="grey"
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    fontFamily: 'Poppins-Regular',
    borderRadius: 100,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: '#69BBF5',
    width: 250,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
});
