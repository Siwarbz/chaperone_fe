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
import {azure} from '../client';

const HealthDataScreen = props => {
  // Add navigation7
  const [inputValue, setInputValue] = useState();
  const [showHeartbeat, setShowHeartbeat] = useState(false);
  const [heartbeat, setHeartbeat] = useState('');
  const [showGlycemy, setShowGlycemy] = useState(false);
  const [glycemy, setGlycemy] = useState();
  const [showHeight, setShowHeight] = useState(false);
  const [height, setHeight] = useState();
  const [showWeight, setShowWeight] = useState(false);
  const [weight, setWeight] = useState();
  const [showThermo, setShowThermo] = useState(false);
  const [thermo, setThermo] = useState();
  const [showAge, setShowAge] = useState(false);
  const [age, setAge] = useState();
  const [userId, setUserId] = useState();
  const [updatedAt, setUpdatedAt] = useState();

  useEffect(() => {
    async function getAllInfos() {
      try {
        AsyncStorage.getItem('user_id').then(userId => {
          setUserId(userId);
          axios
            .get(`${azure}/api/patient/getAllInfos/${userId}`)
            .then(infos => {
              setHeartbeat(infos.data.patient.heartbeat);
              setHeight(infos.data.patient.height);
              setWeight(infos.data.patient.weight);
              setThermo(infos.data.patient.temperature);
              setGlycemy(infos.data.patient.glycemia);

              setAge(infos.data.patient.age);
              setUpdatedAt(infos.data.patient.updatedAt);
            });
        });
      } catch (error) {
        console.log(error);
      }
    }
    getAllInfos();
  }, [updatedAt]);

  const modifyHeartbeat = async () => {
    await changeHeartbeat(userId, heartbeat);
    setShowHeartbeat(false);
  };
  const modifyHeight = async () => {
    await changeHeight(userId, height);
    setShowHeight(false);
  };
  const modifyWeight = async () => {
    await changeWeight(userId, weight);
    setShowWeight(false);
  };
  const modifyGlycemia = async () => {
    await changeGlycemia(userId, glycemy);
    setShowGlycemy(false);
  };
  const modifyAge = async () => {
    await changeAge(userId, age);
    setShowAge(false);
  };
  const modifyTemperature = async () => {
    await changeTemperature(userId, thermo);
    setShowThermo(false);
  };

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
            <TouchableOpacity onPress={() => setShowHeartbeat(true)}>
              <View style={[styles.tile, styles.largeTile]}>
                <Iconicons
                  name="pen"
                  size={20}
                  color="#D75C62"
                  style={styles.penIcon}
                />
                <Iconicons name="heartbeat" size={40} color="white" />
                <Text style={styles.tileText}>Tension artérielle</Text>
                <Text style={styles.tileText}>{heartbeat}</Text>
              </View>
            </TouchableOpacity>

            <View style={{flexDirection: 'column'}}>
              <TouchableOpacity onPress={() => setShowGlycemy(true)}>
                <View style={[styles.tile, styles.mediumTile]}>
                  <Iconicons
                    name="pen"
                    size={15}
                    color="#D75C62"
                    style={styles.penIcon}
                  />
                  <Iconicons name="tint" size={30} color="white" />
                  <Text style={styles.tileText}>Glycémie</Text>
                  <Text style={styles.tileText}>{glycemy}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowHeight(true)}>
                <View style={[styles.tile, styles.smallTile]}>
                  <Iconicons
                    name="pen"
                    size={15}
                    color="#D75C62"
                    style={styles.penIcon}
                  />
                  <Iconicons name="ruler-vertical" size={20} color="white" />
                  <Text style={styles.tileText}>Taille</Text>
                  <Text style={styles.tileText}>{height} cm</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column'}}>
              <TouchableOpacity onPress={() => setShowWeight(true)}>
                <View style={[styles.tile, styles.mediumTile]}>
                  <Iconicons
                    name="pen"
                    size={15}
                    color="#D75C62"
                    style={styles.penIcon}
                  />
                  <Iconicons name="weight" size={30} color="white" />
                  <Text style={styles.tileText}>Poids</Text>
                  <Text style={styles.tileText}>{weight} kg</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowAge(true)}>
                <View style={[styles.tile, styles.smallTile]}>
                  <Iconicons
                    name="pen"
                    size={15}
                    color="#D75C62"
                    style={styles.penIcon}
                  />
                  <Iconicons name="calendar-alt" size={20} color="white" />
                  <Text style={styles.tileText}>Age</Text>
                  <Text style={styles.tileText}>{age}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setShowThermo(true)}>
              <View style={[styles.tile, styles.largeTile]}>
                <Iconicons
                  name="pen"
                  size={20}
                  color="#D75C62"
                  style={styles.penIcon}
                />
                <Iconicons name="thermometer-half" size={40} color="white" />
                <Text style={styles.tileText}>Température corporelle</Text>
                <Text style={styles.tileText}>{thermo} °C</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.tileText}>
              Dernière modification: {new Date(updatedAt).getDate()}/
              {new Date(updatedAt).getMonth() + 1}/
              {new Date(updatedAt).getFullYear()} à{' '}
              {new Date(updatedAt).getHours()}:
              {new Date(updatedAt).getMinutes()}
            </Text>
          </View>
        </View>

        <Modal
          visible={
            showHeartbeat ||
            showGlycemy ||
            showAge ||
            showHeight ||
            showWeight ||
            showThermo
          }
          animationType="slide"
          transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {showAge && (
                <View>
                  <TextInput
                    style={styles.input}
                    value={age}
                    onChangeText={text => setAge(text)}
                    placeholder="Modifier age"
                    autoFocus={true}
                  />

                  <TouchableOpacity onPress={modifyAge} style={styles.button}>
                    <Text style={styles.buttonText}>Enregistrer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      //when the user chooses to  cancel we keep the old value and undisplay the modal

                      setShowAge(false);
                    }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Annuler</Text>
                  </TouchableOpacity>
                </View>
              )}
              {showHeartbeat && (
                <View>
                  <TextInput
                    style={styles.input}
                    value={heartbeat}
                    onChangeText={text => setHeartbeat(text)}
                    placeholder="Modifier tension"
                    autoFocus={true}
                  />

                  <TouchableOpacity
                    onPress={modifyHeartbeat}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Enregistrer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      //when the user chooses to  cancel we keep the old value and undisplay the modal
                      setHeartbeat('');
                      setShowHeartbeat(false);
                    }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Annuler</Text>
                  </TouchableOpacity>
                </View>
              )}
              {showGlycemy && (
                <View>
                  <TextInput
                    style={styles.input}
                    value={glycemy}
                    onChangeText={text => setGlycemy(text)}
                    placeholder="Modifier glycémie"
                    autoFocus={true}
                  />

                  <TouchableOpacity
                    onPress={modifyGlycemia}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Enregistrer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShowGlycemy(false);
                    }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Annuler</Text>
                  </TouchableOpacity>
                </View>
              )}
              {showWeight && (
                <View>
                  <TextInput
                    style={styles.input}
                    value={weight}
                    onChangeText={text => setWeight(text)}
                    placeholder="Modifier poids"
                    autoFocus={true}
                  />

                  <TouchableOpacity
                    onPress={modifyWeight}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Enregistrer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShowWeight(false);
                    }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Annuler</Text>
                  </TouchableOpacity>
                </View>
              )}
              {showHeight && (
                <View>
                  <TextInput
                    style={styles.input}
                    value={height}
                    onChangeText={text => setHeight(text)}
                    placeholder="Modifier taille"
                    autoFocus={true}
                  />

                  <TouchableOpacity
                    onPress={modifyHeight}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Enregistrer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShowHeight(false);
                    }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Annuler</Text>
                  </TouchableOpacity>
                </View>
              )}
              {showThermo && (
                <View>
                  <TextInput
                    style={styles.input}
                    value={thermo}
                    onChangeText={text => setThermo(text)}
                    placeholder="Modifier température"
                    autoFocus={true}
                  />

                  <TouchableOpacity
                    onPress={modifyTemperature}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Enregistrer</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setShowThermo(false);
                    }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Annuler</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Modal>
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
    color: 'black',
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
