import React from 'react';
import {View, Text, StyleSheet, useColorScheme, TouchableOpacity, ScrollView, ImageBackground,Image, Modal, Button} from 'react-native';
import Colorsorphy from '../colors.js';
import { useEffect, useState } from 'react';
import { database, ref, get } from '../firebase';
import auth from '@react-native-firebase/auth';

    

const ProfilePage = ({ goToForm }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const user = auth().currentUser;
            if (!user) return;
            const userRef = ref(database, 'users/' + user.uid);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                setProfile(snapshot.val());
            }
        };
        fetchProfile();
    }, []);

    // For now, fallback to dummy data if profile is null
    const pseudo = profile?.pseudo || 'Pseudo';
    const age = profile?.age || 'Age';
    const city = profile?.city || 'Ville';
    const language = profile?.language || 'Langue';
    const role = profile?.role || 'Rôle';

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
                  <Text style={styles.text}><Text style={styles.label}>Name :</Text> {pseudo}</Text>
                  <Text style={styles.text}><Text style={styles.label}>Age :</Text> {age} years old</Text>
                </View>
              </View>
              <Text style={[styles.text, { marginTop: 8 }]}>
                <Text style={styles.label}>City :</Text> {city}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Language(s) spoken :</Text> {language}
              </Text>
              <Text style={styles.text}>
                <Text style={styles.label}>Role :</Text> {role}
              </Text>
            
            </View>

            <View style={{ marginTop: 40, marginLeft: 60, marginRight: 60 }}>
                <Button title="Modify my profil" onPress={() => goToForm && goToForm()} />
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