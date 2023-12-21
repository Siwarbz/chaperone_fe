/* eslint-disable prettier/prettier */
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ImageBackground,
  View,
} from 'react-native';
import {useWindowDimensions} from 'react-native';

export default function LargeButton({item, navigation}) {
  const Width = useWindowDimensions().width;
  const Height = useWindowDimensions().height;
  return (
    <TouchableOpacity
      onPress={navigation}
      style={{
        borderRadius: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 10,
      }}>
      <ImageBackground
        source={item.image}
        style={[
          styles.button,
          {width: 0.9 * Width, height: 0.23 * Height, borderRadius: 10},
        ]}
        resizeMode="cover">
        <View style={styles.textContainer}>
          <Text style={styles.buttonTitle}>{item.title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    fontFamily: 'Poppins-Regular',

    paddingVertical: 14,
    paddingHorizontal: 10,

    flexDirection: 'column',
  },

  buttonTitle: {
    color: 'white',

    fontSize: 20,

    fontFamily: 'Poppins-Bold',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
