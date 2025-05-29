import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { database, set, ref } from './firebase';
import auth from '@react-native-firebase/auth';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import ChatPage from './pages/ChatPage.jsx';
import ProfilePage from './pages/Profile/ProfilePage.jsx';
import EmptyPage from './pages/EmptyPage.jsx';
import Welcome from './pages/Onboarding/Welcome.jsx';
import Form from './pages/Onboarding/Form.jsx';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [currentTab, setCurrentTab] = useState('chats');

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
          await set(userRef, profile);
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
    if (currentTab === 'chats') return <ChatPage />;
    if (currentTab === 'profile') return <ProfilePage />;
    if (currentTab == 'welcome') return <Welcome goToForm={() => setCurrentTab('form')} />;
    if (currentTab == 'form') return <Form endForm={() => setCurrentTab('profile')}/>;
    return <EmptyPage />;
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{flex: 1}}>
        {renderScreen()}
        <View style={[
          styles.navBar,
          {backgroundColor: isDarkMode ? Colors.darker : '#fff', borderTopColor: isDarkMode ? '#333' : '#ddd'}
        ]}>
          <TouchableOpacity style={styles.navButton} onPress={() => setCurrentTab('empty')}>
            <Text style={[
              styles.navIcon,
              currentTab === 'empty' && styles.navIconActive
            ]}>⬜️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.navButton, styles.navButtonCenter]}
            onPress={() => setCurrentTab('chats')}
          >
            <Text style={[
              styles.navIcon,
              styles.navIconChat,
              currentTab === 'chats' && styles.navIconActive
            ]}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => setCurrentTab('profile')}>
            <Text style={[
              styles.navIcon,
              currentTab === 'profile' && styles.navIconActive
            ]}>👤</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
  },
  navButtonCenter: {
    flex: 1.5,
  },
  navIcon: {
    fontSize: 28,
    color: '#888',
  },
  navIconChat: {
    fontSize: 36,
  },
  navIconActive: {
    color: '#4e8cff',
  },
});

export default App;