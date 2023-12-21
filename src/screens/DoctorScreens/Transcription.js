/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const Transcription = () => {
  // const item = route.params.item;
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Résumé</Text>
      <View style={styles.sumView}>
        <Text style={styles.transcription}>
          Le gynécologue et la patiente discutent des douleurs abdominales de la
          patiente, de sa contraception actuelle et de la possibilité d'examens
          supplémentaires pour identifier les causes. Le gynécologue offre des
          conseils rassurants et explique qu'ils travailleront ensemble pour
          trouver la meilleure solution pour la patiente.
        </Text>
      </View>
      <Text style={styles.title}>Transcription</Text>
      <View style={styles.transcView}>
        <Text style={styles.transcription}>
          {' '}
          Gynécologue : Bonjour, comment allez-vous aujourd'hui ? Patiente :
          Bonjour, je vais bien merci. Gynécologue : C'est bien de l'entendre.
          Comment se sont passés les jours depuis notre dernière consultation ?
          Patiente : Dans l'ensemble, ça a été. J'ai remarqué quelques douleurs
          abdominales légères, mais rien de trop préoccupant. Gynécologue : Je
          vois. Pouvez-vous me décrire un peu plus ces douleurs ? Sont-elles
          constantes ou surviennent-elles à des moments spécifiques Patiente :
          Elles viennent et vont, mais elles ne durent jamais très longtemps.
          Parfois, c'est une sensation de tiraillement, et d'autres fois, c'est
          plus comme une douleur sourde. Gynécologue : Compris. Avez-vous
          remarqué si ces douleurs sont liées à votre cycle menstruel d'une
          manière quelconque ? Patiente : Maintenant que vous le mentionnez,
          elles semblent effectivement survenir quelques jours avant mes règles,
          mais pas systématiquement. Gynécologue : C'est une observation
          importante. Nous devrons surveiller cela de près. Pourriez-vous
          également me parler de votre expérience contraceptive actuelle ?
          Patiente : J'utilise des préservatifs en tant que méthode
          contraceptive, et nous faisons attention aux jours les plus fertiles.
          Cela a bien fonctionné pour nous jusqu'à présent. Gynécologue : Très
          bien. Il pourrait être utile de discuter de différentes options
          contraceptives pour déterminer celle qui vous conviendrait le mieux.
          De plus, en raison de ces douleurs abdominales, je recommanderais
          peut-être quelques examens supplémentaires pour éliminer tout problème
          sous-jacent. Patiente : D'accord, je suis d'accord. Cela m'inquiète un
          peu, donc je préfère être sûre que tout va bien.\n\nGynécologue : Je
          comprends tout à fait votre préoccupation, et nous allons travailler
          ensemble pour obtenir une image complète de ce qui se passe. Nous
          planifierons des examens adaptés à votre situation et nous
          travaillerons sur une solution qui vous convient le mieux. Patiente :
          Merci, docteur, cela me rassure. Gynécologue : Vous êtes la bienvenue.
          N'hésitez pas à poser des questions à tout moment. Nous sommes ici
          pour veiller à votre santé et votre bien-être. Patiente : Merci, je
          l'apprécie vraiment.`,
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    fontFamily: 'Poppins-Regular',
  },
  transcription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
    color: '#28283A',
  },
  transcView: {
    backgroundColor: '#69BBF5',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: '#28283A',
  },

  sumView: {
    backgroundColor: '#E0A845',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});

export default Transcription;
