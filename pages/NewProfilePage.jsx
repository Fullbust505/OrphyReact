import React from 'react';
import {View, Text, StyleSheet, useColorScheme, TouchableOpacity, ScrollView, ImageBackground,Image, Modal} from 'react-native';
import Colorsorphy from '../colors.js';

const ProfilePage = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.container}>
          <ImageBackground
          source={require('./images/column-low.png')}
          resizeMode="cover"
          style={styles.image,styles.columns1}
          />
          <ImageBackground
                source={require('./images/column-low.png')}
                resizeMode="cover"
                style={styles.image,styles.columns2}
                />
        <View style={styles.card}>
              <View style={styles.row}>
                <View style={styles.avatar} />
                <View style={styles.info}>
                  <Text style={styles.text}><Text style={styles.label}>Name :</Text> Poisson Steve</Text>
                  <Text style={styles.text}><Text style={styles.label}>Age :</Text> 1 years old</Text>
                </View>
              </View>
              <Text style={[styles.text, { marginTop: 8 }]}>
                <Text style={styles.label}>Country :</Text> French
              </Text>
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colorsorphy.background_beige,
    },
    image: {
        flex: 1,
        height: '100%',
        justifyContent: 'center'
    },
    columns1: {
        position: 'absolute',
        top: 40,
        left: -227,
        right: 100,
        height: '100%',
    },
    columns2: {
        position: 'absolute',
        top: 40,
        left: 262,
        right: -100,
        height: '100%',
    },
    card: {
    backgroundColor: '#794b45',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    marginVertical: 100,
    elevation: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: '#ccc',
    borderRadius: 30,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  text: {
    color: Colorsorphy.white,
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfilePage;