/* eslint-disable prettier/prettier */
// Import React and Component
import React, {useState, createRef, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Login, UpdateNotifications} from '../../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IP} from '../client';
import {azure} from '../client';
import Loader from '../../components/Loader';
import {
  AppNotification,
  updateNotification,
} from '../../components/appNotifications';
import * as yup from 'yup';
import Iconicons from 'react-native-vector-icons/Ionicons';
//import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  //const [fcmToken, setFcmToken] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState({
    text: '',
    type: '',
  });
  const [validationError, setValidationError] = useState();

  const validationSchema = yup.object().shape({
    email: yup.string().email('Email invalide').required('Ajouter un email!'),
    password: yup.string().trim().required('Ajouter un mot de passe!'),
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const passwordInputRef = createRef();

  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem('user_id').then(response =>
      console.log('Async Storage user_id', response),
    );
  }, []);

  const handleSubmit = async () => {
    try {
      await validationSchema.validate(
        {
          email: userEmail,
          password: userPassword,
        },
        {abortEarly: false},
      );
      setLoading(true);
      /*messaging()
      .getToken()
      .then(token => {
        console.log(token);
        setFcmToken(token);
      });*/
      let dataToSend = {
        email: userEmail.toLowerCase(),
        password: userPassword,
        //deviceToken: fcmToken,
      };
      let formBody = [];
      for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      fetch(`${azure}/api/user/signin`, {
        method: 'POST',
        body: formBody,
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          //Hide Loader
          setLoading(false);
          console.log(responseJson);
          // If server response message same as Data Matched
          if (responseJson.success === true) {
            let id = responseJson.user._id;
            axios.get(`${azure}/api/patient/getAllInfos/${id}`).then(infos => {
              let countNotification =
                infos.data.user.unseenNotifications.length;
              console.log('info', countNotification.toString());
              dispatch(
                Login(
                  responseJson.user._id,
                  responseJson.user.userType,
                  countNotification.toString(),
                ),
              );
            });
          } else {
            updateNotification(setMessage, responseJson.error);

            console.log('Please check your email id or password');
          }
        })
        .catch(error => {
          //Hide Loader
          setLoading(false);
          console.error(error);
        });
    } catch (error) {
      // Handle validation errors
      console.log(error.errors);
      setValidationError(error.errors);
    }
  };

  return (
    <>
      {message.text ? (
        <AppNotification type={message.type} text={message.text} />
      ) : null}
      <View style={styles.mainBody}>
        <Loader loading={loading} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View>
            <KeyboardAvoidingView enabled>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={require('../../images/login.png')}
                  style={{
                    width: '70%',
                    height: 200,
                    resizeMode: 'contain',
                    margin: 30,
                  }}
                />
                <View>
                  <Text style={styles.title}>Bienvenue</Text>
                  <Text style={styles.description}>
                    Bonjour, veuillez vous connecter pour continuer!
                  </Text>
                  {validationError && validationError.length > 0 ? (
                    <View>
                      {validationError.map((error, index) => (
                        <Text key={index} style={styles.errorTextStyle}>
                          {error}
                        </Text>
                      ))}
                    </View>
                  ) : null}
                </View>
              </View>

              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={UserEmail => setUserEmail(UserEmail)}
                  placeholder="Email"
                  placeholderTextColor="#28283A"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    passwordInputRef.current && passwordInputRef.current.focus()
                  }
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={UserPassword => setUserPassword(UserPassword)}
                  placeholder="Mot de passe"
                  placeholderTextColor="#28283A"
                  keyboardType="default"
                  ref={passwordInputRef}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry={!showPassword}
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeIconContainer}
                  onPress={togglePasswordVisibility}>
                  <Iconicons
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={24}
                    color="#2835"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={handleSubmit}>
                <Text style={styles.buttonTextStyle}>Se connecter</Text>
              </TouchableOpacity>
              <Text
                style={styles.registerTextStyle}
                onPress={() => navigation.navigate('RegisterScreen')}>
                Vous n'avez pas un compte ? Rejoignez-nous
              </Text>
              <Text
                style={styles.forgetTextStyle}
                onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                Mot de passe oublié ? Réinitialisez-le
              </Text>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    alignContent: 'center',
  },
  registerTextStyle: {
    color: '#28283A',
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
  },
  forgetTextStyle: {
    color: '#69BBF5',
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
  },

  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#E0A845',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#E0A845',
    height: 50,
    alignItems: 'center',
    borderRadius: 100,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  inputStyle: {
    flex: 1,
    color: '#172A48',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#FF8C98',
    fontFamily: 'Poppins-Regular',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Regular', // Use your desired font family
    // Add additional styling properties as needed
    marginTop: 5, // Example additional styling: margin from the top
  },
  successTextStyle: {
    color: '#28283A',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
    fontFamily: 'Poppins-Regular',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    color: '#FF8C98',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '300',
    textAlign: 'center',
    color: '#28283A',
    paddingHorizontal: 64,
    marginBottom: 5,
  },
});
