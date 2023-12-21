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

const Notification = () => {
  const [seenNotifications, setSeenNotifications] = useState([]);
  const [unseenNotifications, setUnseenNotifications] = useState([]);
  const [showSeen, setShowSeen] = useState(true);
  const [showUnseen, setShowUnseen] = useState(false);

  useEffect(() => {
    async function getAllNotifications() {
      try {
        AsyncStorage.getItem('user_id').then(id => {
          console.log(id);
          axios.get(`${IP}/api/patient/getAllInfos/${id}`).then(infos => {
            console.log(infos.data.user);
            setSeenNotifications(infos.data.user.seenNotifications);
            setUnseenNotifications(infos.data.user.unseenNotifications);
            console.log(seenNotifications);
            console.log(unseenNotifications);
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
    getAllNotifications();
  }, []);

  const goToSeen = () => {
    setShowSeen(true);
    setShowUnseen(false);
  };
  const goToUnseen = () => {
    setShowSeen(false);
    setShowUnseen(true);
  };
  const markAsSeen = () => {
    // i need to add an api to save the seen in database
    let seen = seenNotifications;
    seen.push(unseenNotifications);
    setSeenNotifications(seen);
    setUnseenNotifications([]);
  };

  return (
    <ScrollView Style={styles.container}>
      <View style={{flexDirection: 'row', flex: 1, justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => goToUnseen()}
          style={{borderWidth: 1, borderColor: '#172A48'}}>
          <Text style={styles.title}>Nouvelles Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => goToSeen()}
          style={{borderWidth: 1, borderColor: '#172A48'}}>
          <Text style={styles.title}>Anciennes Notifications</Text>
        </TouchableOpacity>
      </View>
      <View>
        {showUnseen && (
          <View>
            <TouchableOpacity onPress={() => markAsSeen()}>
              <Text>J'ai vu tous ces notifications</Text>
            </TouchableOpacity>
            {unseenNotifications.map((item, index) => (
              <View style={{alignItems: 'center'}} key={index}>
                <Text>{item.message}</Text>
              </View>
            ))}
          </View>
        )}
        {showSeen &&
          seenNotifications.map((item, index) => (
            <View style={{alignItems: 'center'}} key={index}>
              {item.message}
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
    alignItems: 'center',
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  title: {
    color: '#172A48',
    fontFamily: 'Poppins-Regular',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 25,
  },
});
