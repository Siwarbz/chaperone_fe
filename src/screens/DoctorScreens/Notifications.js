/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import LargeButton from '../../components/LargeButton';
import axios from 'axios';

import {IP} from '../client';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateNotifications} from './utils';
import {useDispatch} from 'react-redux';
import {Login, UpdateNotifications} from '../../store/actions';

const Notification = () => {
  const [seenNotifications, setSeenNotifications] = useState([]);
  const [unseenNotifications, setUnseenNotifications] = useState([]);

  useEffect(() => {
    async function getAllNotifications() {
      try {
        AsyncStorage.getItem('user_id').then(id => {
          axios.get(`${IP}/api/doctor/getAllInfos/${id}`).then(infos => {
            setSeenNotifications(infos.data.user.seenNotifications);
            setUnseenNotifications(infos.data.user.unseenNotifications);

            updateNotifications(
              id,
              infos.data.user.unseenNotifications.concat(
                infos.data.user.seenNotifications,
              ),
              [],
            ).then(response => AsyncStorage.setItem('notification', '0'));
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
    getAllNotifications();
  }, [seenNotifications]);

  return (
    <ScrollView style={styles.container}>
      <View>
        <View>
          {unseenNotifications.map((item, index) => (
            <View
              style={[styles.notification, {backgroundColor: 'grey'}]}
              key={index}>
              <Text style={styles.messageStyle}>{item.message}</Text>
            </View>
          ))}
        </View>

        {seenNotifications.map((item, index) => (
          <View
            style={[styles.notification, {backgroundColor: 'white'}]}
            key={index}>
            <Text style={styles.messageStyle}>{item.message}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  messageStyle: {
    color: '#28283A',
    fontFamily: 'Poppins-Regular',
    margin: 5,
  },
  notification: {
    alignItems: 'center',

    height: 80,
    margin: 5,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#69BBF5',
    padding: 5,
  },
});
