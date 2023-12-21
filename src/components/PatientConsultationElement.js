/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Text, Image, View} from 'react-native';
import {useWindowDimensions} from 'react-native';
import axios from 'axios';
import {IP} from '../screens/client';

export default function PatientConsultationElement({item, navigation}) {
  const Width = useWindowDimensions().width;
  const Height = useWindowDimensions().height;
  const [patient, setPatient] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    async function getAllInfos() {
      try {
        axios
          .get(`${IP}/api/patient/getAllInfos/${item.patientId}`)
          .then(infos => {
            if (infos.data.user) setPatient(infos.data.user);
            console.log(patient);
          });
      } catch (error) {
        console.log(error);
      }
    }
    getAllInfos();
  }, [item.patientId]);
  return (
    <TouchableOpacity onPress={navigation}>
      <View
        style={[
          styles.button,
          {
            width: 0.9 * Width,
            height: 0.15 * Height,
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../../images/profile.png')}
            style={styles.doctorImage}
          />
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.buttonNoun}>{patient.firstName}</Text>
              <Text style={styles.buttonNoun}> {patient.lastName}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.buttonDate}>{item.date} </Text>
              <Text style={styles.buttonDate}>
                De {item.time[0]} à {item.time[1]}{' '}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'absolute',
            right: 5,
            bottom: 10,
          }}>
          <Text
            style={{
              color: '#28283A',
              fontFamily: 'Poppins-Regular',
              marginRight: 10,
            }}>
            {item.status}
          </Text>
          <View
            style={
              item.status === 'Attente de confirmation'
                ? styles.status3
                : item.status === 'confirmé'
                ? styles.status2
                : item.status === 'annulé'
                ? styles.status1
                : item.status === 'passé'
                ? styles.status4
                : styles.status1
            }></View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    fontFamily: 'Poppins-Regular',

    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    paddingBottom: 25,
    flexDirection: 'column',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#69BBF5',
  },
  buttonDate: {
    color: '#3876C2',
    marginTop: 10,
    fontSize: 10,
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
  },
  buttonNoun: {
    color: '#28283A',
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'Poppins-Bold',
  },

  status1: {
    width: 15,
    height: 15,
    borderRadius: 100,

    backgroundColor: 'red',
  },
  status2: {
    width: 15,
    height: 15,
    borderRadius: 100,

    backgroundColor: 'green',
  },
  status3: {
    width: 15,
    height: 15,
    borderRadius: 100,

    backgroundColor: 'orange',
  },
  status4: {
    width: 15,
    height: 15,
    borderRadius: 100,

    backgroundColor: 'blue',
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 10,
  },
});
