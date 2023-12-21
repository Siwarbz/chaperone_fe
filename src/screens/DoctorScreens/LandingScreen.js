/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import LargeButton from '../../components/LargeButton';
import PatientLandingScreenData from '../../components/PatientLandingScreenData';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {IP} from '../client';
const item1 = {
  id: '1',
  title: 'Mes téléconsultations',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  image: require('../../images/medicale.png'),
  name: 'chevron-forward-circle',
};

const item2 = {
  id: '5',
  title: 'Mon calendrier',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  image: require('../../images/Journal.png'),
  name: 'chevron-forward-circle',
};
const item3 = {
  id: '5',
  title: 'Chaperone',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  image: require('../../images/IA.png'),
  name: 'chevron-forward-circle',
};

const LandingScreen = () => {
  const [doctorId, setDoctorId] = useState();
  const [doctorName, setDoctorName] = useState();
  const [freeSchedule, setFreeSchedule] = useState();
  useEffect(() => {
    async function getDoctor() {
      try {
        AsyncStorage.getItem('user_id').then(response => {
          setDoctorId(response);
          console.log('doctor', response);
          axios.get(`${IP}/api/doctor/getAllInfos/${response}`).then(res => {
            setFreeSchedule(res.data.doctor.freeSchedule);
            setDoctorName(res.data.user.firstName);
            console.log(freeSchedule);
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
    getDoctor();
  }, []);
  const navigation = useNavigation();

  const navigateToConsultation = () => {
    navigation.navigate('ConsultationScreen');
  };

  const navigateToChaperone = () => {
    navigation.navigate('ChaperoneScreen', {
      userId: doctorId,
      userName: doctorName,
    });
  };
  const navigateToSchedule = () => {
    navigation.navigate('ScheduleScreen', {isEnabled: freeSchedule, doctorId});
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{margin: 20, alignItems: 'center'}}>
        <LargeButton item={item3} navigation={navigateToChaperone} />
      </View>
    </ScrollView>
  );
};
export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
    fontFamily: 'Poppins-Regular',
  },
});
