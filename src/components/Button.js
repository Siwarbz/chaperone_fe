/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

export default function FlatButton({text, navigation}) {
  return (
    <TouchableOpacity onPress={navigation}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
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
