import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';

import { database, set, ref } from './firebase';
import auth from '@react-native-firebase/auth';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import ChatPage from './pages/ChatPage.jsx';
import NewProfilePage from './pages/NewProfilePage.jsx';
import Colorsorphy from './colors.js';
import LinearGradient from 'react-native-linear-gradient';
import HomePage from './pages/HomePage.jsx';

import Welcome from './pages/Onboarding/Welcome.jsx';
import Form from './pages/Onboarding/Form.jsx';
import Contacts from './pages/Contacts.jsx';


  
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentTab, setCurrentTab] = useState('Home');
  const [visible, setVisible] = useState(false);
  
  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    const createOrCheckUser = async () => {
      try {
        // Sign in anonymously and get the real Firebase UID
        const userCredential = await auth().signInAnonymously();
        const user = userCredential.user;
        const uid = user.uid;
        const userRef = ref(database, 'users/' + uid);
        // Check if user already exists in the database
        const snapshot = await import('./firebase').then(m => m.get(userRef));
        if (snapshot.exists()) {
          console.log('User already exists in Firebase, uid:', uid);
        } else {
          setCurrentTab('welcome');
          console.log('User created in Firebase, uid:', uid);
        }
      } catch (error) {
        console.log('Auth error:', error);
      }
    };
    createOrCheckUser();
  }, []);

  useEffect(() => {
    const createOrCheckUser = async () => {
      try {
        // Sign in anonymously and get the real Firebase UID
        const userCredential = await auth().signInAnonymously();
        const user = userCredential.user;
        const uid = user.uid;
        const userRef = ref(database, 'users/' + uid);
        // Check if user already exists in the database
        const snapshot = await import('./firebase').then(m => m.get(userRef));
        if (snapshot.exists()) {
          console.log('User already exists in Firebase, uid:', uid);
        } else {
          setCurrentTab('welcome');
          console.log('User created in Firebase, uid:', uid);
        }
      } catch (error) {
        console.log('Auth error:', error);
      }
    };
    createOrCheckUser();
  }, []);

  const renderScreen = () => {
    if (currentTab === 'chats') return <ChatPage goToHome={() => setCurrentTab('home')} />;
    if (currentTab === 'newprofile') return <NewProfilePage goToForm={() => setCurrentTab('form')}/>;
    if (currentTab === 'home') return <HomePage />;
    if (currentTab === 'welcome') return <Welcome goToForm={() => setCurrentTab('form')} />;
    if (currentTab === 'form') return <Form endForm={() => setCurrentTab('newprofile')}/>;
    if (currentTab === 'contacts') return <Contacts/>;
    return <HomePage />;
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* Contacts Button - always visible, bottom right */}
      <TouchableOpacity
        style={styles.contactsButton}
        onPress={() => setCurrentTab('contacts')}
      >
        <Image
          source={{ uri: 'https://img.icons8.com/ios-filled/50/007AFF/phone.png' }}
          style={{ width: 28, height: 28 }}
        />
      </TouchableOpacity>
      <View style={{flex: 1}}>
        {renderScreen()}
        <LinearGradient
                colors={[Colorsorphy.background_text_brown, Colorsorphy.background_mid_brown]}
                style={styles.navBar}
              >
                <TouchableOpacity
                  style={[styles.navButton]}
                  onPress={() => setCurrentTab('Home')}
                >
                  <Image source={require('./pages/images/home_icon.png')}
                  style={[
                    styles.navIcon,
                    styles.navImgSmall,
                    styles.navIconActive
                  ]}/>
                </TouchableOpacity>
          <View style={[styles.navButton]}>
              <Text style={[
                    styles.navIcon,
                  ]}>Group</Text>
              </View>
          <TouchableOpacity style={styles.navButton} onPress={() => setCurrentTab('newprofile')}>
            <Image source={require('./pages/images/Profil.png')}
            style={[
              styles.navIcon,
              styles.navImg,
              currentTab === 'newprofile' && styles.navIconActive
            ]}/>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderTopWidth: 1,
    justifyContent: 'space-evenly',
    paddingHorizontal: 24,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 10,
    elevation: 20,
    borderColor: Colorsorphy.white,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 28,
    color : Colorsorphy.white,
  },
  navImg:{
      width: 50, height: 50
  },
  navImgSmall: {
    width: 32,
    height: 32,
  },
  navIconActive: {
    color: '#4e8cff',
  },
  contactsButton: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    zIndex: 100,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  }
});

export default App;