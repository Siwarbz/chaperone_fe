import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import {Avatar, Card} from 'react-native-elements';
import {IP} from '../client';

const ProfileScreen = ({navigation}) => {
  const [user, setUser] = useState({firstName: '', lastName: '', email: ''});
  useEffect(() => {
    async function getAllNotifications() {
      try {
        AsyncStorage.getItem('user_id').then(id => {
          axios.get(`${IP}/api/admin/getAllInfos/${id}`).then(infos => {
            setUser(infos.data.user);
            console.log(infos.data.user);
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
    getAllNotifications();
  }, []);
  return (
    <ScrollView style={styles.container}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Avatar
          rounded
          size="xlarge"
          source={require('../../images/profile.png')}
          containerStyle={styles.profileImage}
        />
        <Card containerStyle={styles.cardContainer}>
          <Card.Title style={styles.name}>
            {user.firstName} {user.lastName}
          </Card.Title>
          <Card.Divider />
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.bio}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut
            rhoncus felis. Integer vitae ex purus. Nulla ullamcorper dapibus
            tincidunt.
          </Text>
        </Card>

        <TouchableOpacity
          style={styles.button2Style}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('HealthDataScreen')}>
          <Text style={styles.button2TextStyle}>Données admin</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  profileImage: {
    margin: 10,
  },
  cardContainer: {
    width: '90%',
    borderRadius: 10,
    elevation: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#808080',
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
  },
  button1Style: {
    borderRadius: 100,
    borderColor: '#69BBF5',
    borderWidth: 1,
    backgroundColor: 'white',
    margin: 10,
  },
  button2Style: {
    borderRadius: 100,
    borderWidth: 0,
    backgroundColor: '#69BBF5',
    margin: 10,
  },
  button1TextStyle: {
    fontFamily: 'Poppins-Regular',
    color: '#69BBF5',
    padding: 10,
    fontSize: 16,
  },
  button2TextStyle: {
    padding: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'white',
  },
});

export default ProfileScreen;
