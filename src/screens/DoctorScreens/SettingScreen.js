/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';

import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {Logout} from '../../store/actions';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const logout = async () => {
    dispatch(Logout());
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.option}
        onPress={() => console.log('Notifications Pressed')}>
        <Text style={styles.optionText}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => console.log('Langues Pressed')}>
        <Text style={styles.optionText}>Langues</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => console.log('Confidentialité Pressed')}>
        <Text style={styles.optionText}>Confidentialité</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => console.log('À Propos de Fysali Pressed')}>
        <Text style={styles.optionText}>À Propos de Fysali</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => console.log('Réseaux Sociaux Pressed')}>
        <Text style={styles.optionText}>Réseaux Sociaux</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={logout}>
        <Text style={styles.optionText}>Déconnexion</Text>
      </TouchableOpacity>
      <View style={styles.option}>
        <Text style={styles.darkModeText}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
          trackColor={{false: 'grey', true: '#28283A'}} // Customize track colors for false and true states
          thumbColor={'#FF8C98'}
        />
      </View>
    </ScrollView>
  );
};
export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  option: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#172A48',
  },
  darkModeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  darkModeText: {
    fontSize: 16,
    marginRight: 10,
    color: '#172A48',
  },
});
