/* eslint-disable prettier/prettier */
// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {Picker} from '@react-native-picker/picker';
import Loader from '../../components/Loader';
import {IP} from '../client';
import {azure} from '../client';
import {
  AppNotification,
  updateNotification,
} from '../../components/appNotifications';
const options = [
  {label: 'Patiente', value: 'patient'},
  {label: 'Médecin', value: 'doctor'},
];
import Iconicons from 'react-native-vector-icons/Ionicons';
import * as yup from 'yup';

const PersonalDataScreen = props => {
  const [selectedOption, setSelectedOption] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('patient');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    text: '',
    type: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState();
  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();

  // Add navigation
  const navigation = useNavigation();
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('Veuillez entrer votre prénom'),
    lastName: yup.string().required('Veuillez entrer votre nom'),
    email: yup.string().email('Email invalide').required('Ajouter un email!'),
    password: yup
      .string()
      .matches(
        passwordRegex,
        'Le mot de passe doit contenir au moins 8 caractères, dont au moins une lettre majuscule, une lettre minuscule et un chiffre',
      )
      .required('Ajouter un mot de passe!'),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref('password'), null],
        'Les mots de passe ne correspondent pas',
      )
      .required('Veuillez confirmer votre mot de passe'),
  });

  const handleSubmitButton = async () => {
    try {
      await validationSchema.validate(
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        },
        {abortEarly: false},
      );

      //Show Loader
      setLoading(true);
      var dataToSend = {
        firstName: firstName,
        lastName: lastName,
        email: email,

        password: password,
        userType: userType,
      };
      var formBody = [];
      for (var key in dataToSend) {
        var encodedKey = encodeURIComponent(key);
        var encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      fetch(`${azure}/api/user/create`, {
        method: 'POST',
        body: formBody,
        headers: {
          //Header Definition
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          //Hide Loader
          setLoading(false);
          console.log(responseJson.error);
          // If server response message same as Data Matched
          if (responseJson.success === true) {
            console.log(
              'Registration Successful. Please verify email to proceed',
            );
            navigation.navigate('VerificationScreen', {
              userId: responseJson.user._id,
            });
          } else {
            updateNotification(setMessage, responseJson.error);
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
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      {message.text ? (
        <AppNotification type={message.type} text={message.text} />
      ) : null}
      <ScrollView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <Loader loading={loading} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../images/login.png')}
              style={{
                width: '50%',
                height: 100,
                resizeMode: 'contain',
                margin: 30,
              }}
            />

            <View>
              <Text style={styles.title}>Créer un compte</Text>
              <Text style={styles.description}>
                Bonjour, veuillez remplir le formulaire pour continuer!
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
          <KeyboardAvoidingView enabled>
            <View style={styles.dropdownContainer}>
              <Picker
                selectedValue={userType}
                onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
                style={styles.pickerStyle}>
                {options.map((option, index) => (
                  <Picker.Item
                    key={index}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={firstName => setFirstName(firstName)}
                underlineColorAndroid="#f000"
                placeholder="Nom"
                placeholderTextColor="#28283A"
                autoCapitalize="sentences"
                returnKeyType="next"
                onSubmitEditing={() =>
                  emailInputRef.current && emailInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={lastName => setLastName(lastName)}
                underlineColorAndroid="#f000"
                placeholder="Prénom"
                placeholderTextColor="#28283A"
                autoCapitalize="sentences"
                returnKeyType="next"
                onSubmitEditing={() =>
                  emailInputRef.current && emailInputRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={email => setEmail(email.toLowerCase())}
                underlineColorAndroid="#f000"
                placeholder="Email"
                placeholderTextColor="#28283A"
                keyboardType="email-address"
                ref={emailInputRef}
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                blurOnSubmit={false}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={password => setPassword(password)}
                underlineColorAndroid="#f000"
                placeholder="Mot de passe"
                placeholderTextColor="#28283A"
                ref={passwordInputRef}
                returnKeyType="next"
                secureTextEntry={!showPassword}
                onSubmitEditing={() =>
                  ageInputRef.current && ageInputRef.current.focus()
                }
                blurOnSubmit={false}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeIconContainer}
                onPress={togglePasswordVisibility}>
                <Iconicons
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={24}
                  color="#28283A"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={confirmPassword =>
                  setConfirmPassword(confirmPassword)
                }
                underlineColorAndroid="#f000"
                placeholder="Confimer Mot de passe"
                placeholderTextColor="#28283A"
                ref={passwordInputRef}
                returnKeyType="next"
                secureTextEntry={true}
                onSubmitEditing={() =>
                  ageInputRef.current && ageInputRef.current.focus()
                }
                blurOnSubmit={false}
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitButton}>
              <Text style={styles.buttonTextStyle}>Rejoignez-nous</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </ScrollView>
    </>
  );
};
export default PersonalDataScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
  },
  dropDownContainer: {color: '#28283A'},
  pickerStyle: {color: '#28283A'},
  buttonStyle: {
    backgroundColor: '#69BBF5',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#69BBF5',
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
    fontFamily: 'Poppins-Regular',
  },
  successTextStyle: {
    color: '#28283A',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
    fontFamily: 'Poppins-Regular',
  },
  dropdownContainer: {
    borderWidth: 2,
    borderRadius: 30,
    borderColor: '#69BBF5',
    fontFamily: 'Poppins-Regular',
    paddingLeft: 10,

    marginLeft: 35,
    marginRight: 35,
    height: 40,
    justifyContent: 'center',
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
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
