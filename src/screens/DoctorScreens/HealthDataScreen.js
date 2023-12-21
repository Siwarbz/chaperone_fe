/* eslint-disable prettier/prettier */

// Import React and Component
import React, {useState, createRef, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Modal,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {IP} from '../client';
import {useNavigation} from '@react-navigation/core';
import Iconicons from 'react-native-vector-icons/FontAwesome5';
import Loader from '../../components/Loader';
import {
  changeAge,
  changeGlycemia,
  changeHeartbeat,
  changeHeight,
  changeTemperature,
  changeWeight,
} from './utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HealthDataScreen = ({route}) => {
  const patientId = route.params.patientId;
  const [heartbeat, setHeartbeat] = useState('');

  const [glycemy, setGlycemy] = useState('');

  const [height, setHeight] = useState('');

  const [weight, setWeight] = useState('');

  const [thermo, setThermo] = useState('');

  const [age, setAge] = useState('');

  const [updatedAt, setUpdatedAt] = useState('');

  useEffect(() => {
    async function getAllInfos() {
      try {
        axios.get(`${IP}/api/patient/getAllInfos/${patientId}`).then(infos => {
          setHeartbeat(infos.data.patient.heartbeat);
          setHeight(infos.data.patient.height);
          setWeight(infos.data.patient.weight);
          setThermo(infos.data.patient.temperature);
          setGlycemy(infos.data.patient.glycemia);

          setAge(infos.data.patient.age);
          setUpdatedAt(infos.data.patient.updatedAt);
        });
      } catch (error) {
        console.log(error);
      }
    }
    getAllInfos();
  }, [updatedAt]);

  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',

        alignItems: 'center',
      }}>
      <View style={styles.container}>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity>
              <View style={[styles.tile, styles.largeTile]}>
                <Iconicons name="heartbeat" size={40} color="#D75C62" />
                <Text style={styles.tileText}>Tension artérielle</Text>
                <Text style={styles.tileText}>{heartbeat}</Text>
              </View>
            </TouchableOpacity>

            <View style={{flexDirection: 'column'}}>
              <TouchableOpacity>
                <View style={[styles.tile, styles.mediumTile]}>
                  <Iconicons name="tint" size={30} color="#D75C62" />
                  <Text style={styles.tileText}>Glycémie</Text>
                  <Text style={styles.tileText}>{glycemy}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={[styles.tile, styles.smallTile]}>
                  <Iconicons name="ruler-vertical" size={20} color="#AD722A" />
                  <Text style={styles.tileText}>Taille</Text>
                  <Text style={styles.tileText}>{height} cm</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column'}}>
              <TouchableOpacity>
                <View style={[styles.tile, styles.mediumTile]}>
                  <Iconicons name="weight" size={30} color="#D75C62" />
                  <Text style={styles.tileText}>Poids</Text>
                  <Text style={styles.tileText}>{weight} kg</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={[styles.tile, styles.smallTile]}>
                  <Iconicons
                    name="pen"
                    size={15}
                    color="#D75C62"
                    style={styles.penIcon}
                  />
                  <Iconicons name="calendar-alt" size={20} color="#69BBF5" />
                  <Text style={styles.tileText}>Age</Text>
                  <Text style={styles.tileText}>{age}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <View style={[styles.tile, styles.largeTile]}>
                <Iconicons name="thermometer-half" size={40} color="#D75C62" />
                <Text style={styles.tileText}>Température corporelle</Text>
                <Text style={styles.tileText}>{thermo} °C</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.tileText}>
              Dernière modification: {new Date(updatedAt).getUTCDate()}/
              {new Date(updatedAt).getUTCMonth()}/
              {new Date(updatedAt).getUTCFullYear()} à{' '}
              {new Date(updatedAt).getUTCHours()}:
              {new Date(updatedAt).getUTCMinutes()} (UTC)
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default HealthDataScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  largeTile: {
    backgroundColor: '#69BBF5',
    width: 200,
    height: 200,
  },
  mediumTile: {
    backgroundColor: '#E0A845',
    width: 90,
    height: 90,
  },
  smallTile: {
    backgroundColor: '#FF8C98',
    width: 90,
    height: 90,
  },
  tileText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    color: '#172A48',
    fontFamily: 'Poppins-Bold',
  },

  penIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 100,
    padding: 10,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    backgroundColor: '#69BBF5',
    borderRadius: 100,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});
