/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LargeButton from '../../components/LargeButton';

import {useNavigation} from '@react-navigation/core';
import Iconicons from 'react-native-vector-icons/AntDesign';

const item1 = {
  id: '1',
  title: 'Télé-consultations',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  image: require('../../images/medicale.png'),
  name: 'chevron-forward-circle',
};

const item2 = {
  id: '2',
  title: 'Examen individuel',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  image: require('../../images/Journal.png'),
  name: 'chevron-forward-circle',
};

const item3 = {
  id: '3',
  title: 'Mon Chaperon',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  image: require('../../images/IA.png'),
  name: 'chevron-forward-circle',
};

const LandingScreen = () => {
  const navigation = useNavigation();

  const navigateToContact = () => {
    navigation.navigate('TrustContact');
  };

  const navigateToChaperone = () => {
    navigation.navigate('ChaperoneScreen');
  };

  return (
    <View style={styles.container}>
      <View style={{margin: 20, alignItems: 'center'}}>
        <LargeButton item={item3} navigation={navigateToChaperone} />
      </View>
      <View style={styles.contactContainer}>
        <Text style={styles.contactTitle}>Contact de confiance</Text>
        <View style={styles.contactBack}>
          <Text style={styles.contactText}>Mon chaperon physique</Text>
          <View style={{flex: 1}}>
            <View style={styles.contactslist}>
              <TouchableOpacity style={styles.iconContainer}>
                <Iconicons name={'pluscircleo'} size={40} color="#E0A845" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <Iconicons name={'pluscircleo'} size={40} color="#E0A845" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <Iconicons name={'pluscircleo'} size={40} color="#E0A845" />
              </TouchableOpacity>
            </View>
            <Text style={styles.contactText}>Je suis chaperon à</Text>
            <View style={styles.contactslist}>
              <TouchableOpacity style={styles.iconContainer}>
                <Iconicons name={'pluscircleo'} size={40} color="#E0A845" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <Iconicons name={'pluscircleo'} size={40} color="#E0A845" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <Iconicons name={'pluscircleo'} size={40} color="#E0A845" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.buttoncontainer}
            onPress={navigateToContact}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Gérer</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
    fontFamily: 'Poppins-Regular',
  },
  contactContainer: {
    borderRadius: 10,
    backgroundColor: '#69BBF5',
    margin: 15,
    padding: 5,
    flex: 1,
  },
  contactBack: {
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 30,
    padding: 10,
    flex: 1,
  },
  contactTitle: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
  contactText: {
    color: '#28283A',
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
  },
  contactslist: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 40,
    marginRight: 40,
  },
  buttoncontainer: {
    alignItems: 'center',
  },
  button: {
    fontFamily: 'Poppins-Regular',
    borderRadius: 100,
    width: 100,
    padding: 10,
    backgroundColor: '#FF8C98',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',

    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  iconContainer: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
});
