/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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

import {Colors} from 'react-native/Libraries/NewAppScreen';
import ChatPage from './pages/ChatPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import EmptyPage from './pages/EmptyPage.jsx';

import { getAuth, signInAnonymously } from '@react-native-firebase/auth';


function App() {

  signInAnonymously(getAuth())
    .then(() => {
      console.log('User signed in anonymously');
    })
    .catch(error => {
      if (error.code === 'auth/operation-not-allowed') {
        console.log('Enable anonymous in your firebase console.');
      }

      console.error(error);
    });
  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const renderScreen = () => {
    if (currentTab === 'chats') return <ChatPage />;
    if (currentTab === 'profile') return <ProfilePage />;
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