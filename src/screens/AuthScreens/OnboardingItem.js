/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import FlatButton from '../../components/Button';
import {useNavigation} from '@react-navigation/core';

const OnboardingItem = ({item}) => {
  const navigation = useNavigation();
  const navigateToLogin = () => {
    navigation.navigate('LoginScreen');
  };
  const navigateToSignup = () => {
    navigation.navigate('RegisterScreen');
  };
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.container, {width}]}>
      <Image
        source={item.image}
        style={[styles.image, {width, resizeMode: 'contain'}]}
      />

      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <TouchableOpacity
        style={styles.button2Style}
        activeOpacity={0.5}
        onPress={navigateToLogin}>
        <Text style={styles.button2TextStyle}> Se connecter</Text>
      </TouchableOpacity>
      <View style={{marginTop: 10}}></View>

      <FlatButton navigation={navigateToSignup} text="Rejoignez-nous" />
    </View>
  );
};
export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  image: {
    flex: 0.5,
    justifyContent: 'center',
    marginBottom: 20,
    height: 100,
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

  button2Style: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 100,
    borderWidth: 0,
    backgroundColor: '#69BBF5',
    margin: 10,
    width: 250,
  },

  button2TextStyle: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'white',
    textAlign: 'center',
  },
});
