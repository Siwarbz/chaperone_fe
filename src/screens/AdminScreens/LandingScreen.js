import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';
import {useNavigation} from '@react-navigation/core';
import {IP} from '../client';
import LargeButton from '../../components/LargeButton';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const item1 = {
  id: '1',
  title: 'Médecins',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  image: require('../../images/medicale.png'),
  name: 'chevron-forward-circle',
};

const item2 = {
  id: '2',
  title: 'Patientes',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  image: require('../../images/Journal.png'),
  name: 'chevron-forward-circle',
};

const item3 = {
  id: '3',
  title: 'Réclamations',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
  image: require('../../images/IA.png'),
  name: 'chevron-forward-circle',
};

const AdminLandingScreen = () => {
  const navigation = useNavigation();

  const navigateToDoctors = () => {
    navigation.navigate('AllDoctors');
  };

  const navigateToPatient = () => {
    navigation.navigate('AllPatient');
  };
  const navigateToReclamation = () => {
    navigation.navigate('AllPatient');
  };

  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    async function getAllDoctors() {
      try {
        axios.get(`${IP}/api/admin/getAllDoctors`).then(response => {
          console.log(response.data.doctors);
          setDoctors(response.data.doctors);
        });
      } catch (error) {
        console.log(error);
      }
    }
    getAllDoctors();
  }, []);
  useEffect(() => {
    async function getAllPatients() {
      try {
        axios.get(`${IP}/api/admin/getAllPatients`).then(response => {
          console.log(response.data.patients);
          setPatients(response.data.patients);
        });
      } catch (error) {
        console.log(error);
      }
    }
    getAllPatients();
  }, []);
  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;

  const leftToSpendAmount = patients.length;

  const spentAmount = doctors.length;

  const targetAmount = spentAmount + leftToSpendAmount;
  const percentage = (spentAmount / targetAmount) * 100;
  const strokeDashoffset =
    circleCircumference - (circleCircumference * percentage) / 100;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>
          Médecin: {spentAmount} patientes: {leftToSpendAmount}
        </Text>
      </View>
      <View style={styles.graphWrapper}>
        <Svg height="160" width="160" viewBox="0 0 180 180">
          <G rotation={-90} originX="90" originY="90">
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="blue"
              fill="transparent"
              strokeWidth="20"
            />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="pink"
              fill="transparent"
              strokeWidth="20"
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset}
            />
          </G>
        </Svg>
        <Text style={styles.text}>{targetAmount}</Text>
      </View>

      <View style={{margin: 20, alignItems: 'center'}}>
        <LargeButton item={item1} navigation={navigateToDoctors} />
      </View>
      <View style={{margin: 20, alignItems: 'center'}}>
        <LargeButton item={item2} navigation={navigateToPatient} />
      </View>
    </View>
  );
};

export default AdminLandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  graphWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    position: 'absolute',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    color: '#394867',
  },
});
