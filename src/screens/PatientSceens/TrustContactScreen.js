/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';

import axios from 'axios';
import Iconicons from 'react-native-vector-icons/FontAwesome';
import Iconicon from 'react-native-vector-icons/Ionicons';
import {IP} from '../client';
import {
  AppNotification,
  updateNotification,
} from '../../components/appNotifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {changeContactStatus, deleteContact, sendInvitation} from './utils';
import {azure} from '../client';

const TrustContact = () => {
  // The list of persons that I trust to call in case of need during the appointment!
  const [trustContactList, setTrustContactList] = useState([]);
  // The list of persons that I trust Me to call in case of need during the appointment!
  const [trustByContactList, setTrustByContactList] = useState([]);

  const [myTrustContact, setMyTrustContact] = useState(true);
  const [IamTrustContact, setIamTrustContact] = useState(false);
  const [showSendInvit, setShowSendInvit] = useState(false);
  const [message, setMessage] = useState({
    text: '',
    type: '',
  });
  // The email of the person to send invitation
  const [chaperonEmail, setChaperonEmail] = useState('');
  const [patientId, setPatientId] = useState('');
  useEffect(() => {
    async function getAllChaperonInfos() {
      try {
        AsyncStorage.getItem('user_id').then(id => {
          setPatientId(id);
          axios
            .get(`${azure}/api/patient/getAllMyChaperon/${id}`)
            .then(response => {
              setTrustContactList(response.data.trustContactInfos);
              console.log('trustcontactList :', trustContactList);
            });
        });
      } catch (error) {
        console.log(error);
      }
    }
    getAllChaperonInfos();
  }, [trustContactList]);

  useEffect(() => {
    async function getAllIamChaperonInfos() {
      try {
        AsyncStorage.getItem('user_id').then(id => {
          setPatientId(id);
          axios
            .get(`${IP}/api/patient/getAllIamChaperon/${id}`)
            .then(response => {
              setTrustByContactList(response.data.trustContactInfos);
              console.log('trustBycontactList :', trustByContactList);
            });
        });
      } catch (error) {
        console.log(error);
      }
    }
    getAllIamChaperonInfos();
  }, [trustByContactList]);

  const sendChaperonInvitation = async () => {
    sendInvitation(patientId, chaperonEmail).then(response => {
      updateNotification(setMessage, response.error);
      setShowSendInvit(false);
    });
  };

  const handleAccept = async trustContactId => {
    await changeContactStatus(trustContactId, 'Accepted');
  };

  const handleDelete = async trustContactId => {
    await deleteContact(trustContactId);
  };
  return (
    <>
      {message.text ? (
        <AppNotification type={message.type} text={message.text} />
      ) : null}
      <View style={styles.container}>
        <View style={styles.listType}>
          <TouchableOpacity
            style={[
              styles.chaperon,
              myTrustContact ? styles.activeButton : null,
            ]}
            onPress={() => {
              setMyTrustContact(true);
              setIamTrustContact(false);
            }}>
            <Text
              style={[
                styles.chaperonText,
                myTrustContact
                  ? styles.activeButtonText
                  : styles.notActiveButtonText,
              ]}>
              Mon Chaperon physique
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.chaperon,
              IamTrustContact ? styles.activeButton : null,
            ]}
            onPress={() => {
              setMyTrustContact(false);
              setIamTrustContact(true);
            }}>
            <Text
              style={[
                styles.chaperonText,
                IamTrustContact
                  ? styles.activeButtonText
                  : styles.notActiveButtonText,
              ]}>
              Je suis chaperon à
            </Text>
          </TouchableOpacity>
        </View>
        {myTrustContact && (
          <View style={styles.secondpart}>
            <View style={styles.trustContactList}>
              {trustContactList.map((item, index) => (
                <View key={index}>
                  <View style={styles.notification}>
                    <Text style={styles.messageStyle}>
                      {item.firstName} {item.lastName}
                    </Text>
                    <View style={styles.icon}>
                      {item.status === 'Accepted' ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{color: 'black'}}>Confirmé</Text>
                          <TouchableOpacity
                            onPress={() => handleDelete(item.trustContactId)}>
                            <Iconicons
                              name={'trash'}
                              size={35}
                              color="#FF0000"
                            />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{color: 'black'}}>En attente</Text>
                          <TouchableOpacity
                            onPress={() => handleDelete(item.trustContactId)}>
                            <Iconicons
                              name={'times-circle-o'}
                              size={40}
                              color="#FF0000"
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                  {console.log('Item:', item)}

                  <View style={styles.separator} />
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.button2Style}
              activeOpacity={0.5}
              onPress={() => setShowSendInvit(true)}>
              <Text style={styles.button2TextStyle}>
                Inviter un chaperon physique
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {IamTrustContact && (
          <View style={styles.secondpart}>
            <View style={styles.trustContactList}>
              {trustByContactList.map((item, index) => (
                <View key={index}>
                  <View style={styles.notification}>
                    <Text style={styles.messageStyle}>
                      {item.firstName} {item.lastName}
                    </Text>
                    <View style={styles.icon}>
                      {item.status === 'Accepted' ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{color: 'black'}}>Confirmé</Text>
                          <TouchableOpacity
                            onPress={() => handleDelete(item.trustContactId)}>
                            <Iconicons
                              name={'trash'}
                              size={35}
                              color="#FF0000"
                            />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{color: 'black'}}>En attente</Text>
                          <TouchableOpacity
                            onPress={() => {
                              handleAccept(item.trustContactId);
                            }}>
                            <Iconicons
                              name={'check'}
                              size={40}
                              color="#00FF00"
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => {
                              handleDelete(item.trustContactId);
                            }}>
                            <Iconicons
                              name={'times-circle-o'}
                              size={40}
                              color="#FF0000"
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>
                  <View style={styles.separator} />
                  {console.log('Item2:', item)}
                </View>
              ))}
            </View>
          </View>
        )}

        <Modal visible={showSendInvit} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View>
                <TextInput
                  style={styles.modalinput}
                  value={chaperonEmail}
                  onChangeText={text => setChaperonEmail(text)}
                  placeholder="Chaperon Email"
                  autoFocus={true}
                />

                <TouchableOpacity
                  onPress={() => sendChaperonInvitation()}
                  style={styles.modalbutton}>
                  <Text style={styles.modalbuttonText}>Envoyer</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setShowSendInvit(false);
                  }}
                  style={styles.modalbutton}>
                  <Text style={styles.modalbuttonText}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};
export default TrustContact;

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
    textAlign: 'left',
  },
  notification: {
    alignItems: 'flex-start',
    margin: 5,
  },
  button2Style: {
    borderRadius: 100,
    borderWidth: 0,
    backgroundColor: '#E0A845',
    margin: 10,
  },

  button2TextStyle: {
    padding: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'white',
    textAlign: 'center',
  },
  listType: {
    flexDirection: 'row',

    justifyContent: 'space-around',
  },
  chaperonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  chaperon: {
    borderWidth: 1,
    borderColor: 'gray',
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  trustContactList: {
    flex: 1,
    borderRadius: 10,
    borderColor: '#E0A845',
  },
  secondpart: {
    flex: 1,
    margin: 10,
  },
  activeButton: {
    backgroundColor: '#69BBF5',
  },
  activeButtonText: {
    color: 'white',
  },
  notActiveButtonText: {
    color: 'black',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0A845', // You can change the color to your preference
    marginVertical: 5, // Adjust the margin as needed
  },
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
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
  modalinput: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 100,
    padding: 10,
    marginBottom: 10,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  modalbutton: {
    backgroundColor: '#69BBF5',
    borderRadius: 100,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  modalbuttonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  trustContactListPending: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
  },
});
