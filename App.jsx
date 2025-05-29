import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import ChatPage from './pages/ChatPage.jsx';
import NewProfilePage from './pages/NewProfilePage.jsx';
import EmptyPage from './pages/EmptyPage.jsx';
import Colorsorphy from './colors.js';
import LinearGradient from 'react-native-linear-gradient';
import HomePage from './pages/HomePage.jsx';

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

  const renderScreen = () => {
    if (currentTab === 'chats') return <ChatPage />;
    if (currentTab === 'profile') return <ProfilePage goToForm={() => setCurrentTab('form')} />;
    if (currentTab === 'newprofile') return <NewProfilePage />;
    if (currentTab == 'welcome') return <Welcome goToForm={() => setCurrentTab('form')} />;
    if (currentTab == 'form') return <Form endForm={() => setCurrentTab('profile')}/>;
    if (currentTab === 'Home') return <HomePage />;
    if (currentTab == 'contacts') return <Contacts/>;
    return <Home />;
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={{flex: 1}}>
        {renderScreen()}
        <LinearGradient
                colors={[Colorsorphy.background_text_brown, Colorsorphy.background_mid_brown]}
                style={styles.navBar}
              >
                <TouchableOpacity
                  style={[styles.navButton]}
                  onPress={() => setVisible(true)}
                >
                  <Image source={require('./pages/images/Barres.png')}
                  style={[
                    styles.navIcon,
                    styles.navImg,
                    currentTab === 'chats' && styles.navIconActive
                  ]}/>
              <Modal
                  visible={visible}
                  transparent
                  animationType="fade"
                  onRequestClose={() => setVisible(false)}
                >
                  <View style={styles.overlay}>
                    <View style={styles.popup}>
                      <View style={styles.buttons}>
                        <TouchableOpacity
                          style={[styles.buttons, styles.cancel]}
                          onPress={() => {
                              setVisible(false);
                              setCurrentTab('Home');}}
                        >
                          <Text style={styles.buttonText}>Home page</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.buttons, styles.cancel]}
                          onPress={() => {
                            setVisible(false);
                            alert('You just quit the group');
                          }}>
                          <Text style={styles.buttonText}>Exit group</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>
                </TouchableOpacity>
          <View style={[styles.navButton]}>
              <Text style={[
                    styles.navIcon,
                  ]}>Group</Text>
              </View>
          <TouchableOpacity style={styles.navButton} onPress={() => setCurrentTab('profile')}>
            <Image source={require('./pages/images/Profil.png')}
            style={[
              styles.navIcon,
              styles.navImg,
              currentTab === 'profile' && styles.navIconActive
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
    justifyContent: 'space-between',
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
  navIconActive: {
    color: '#4e8cff',
  },
  overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    popup: {
      backgroundColor: '#fff',
      padding: 8,
      borderRadius: 16,
      width: '70%',
      position: 'absolute',
      top: 70,
      left: 50,
      right: 40,
      alignItems: 'center',
    },
  title: {
    fontSize: 18,
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'column',
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancel: {
    backgroundColor: Colorsorphy.option_button_grey,
  },
  buttonText: {
    color: Colorsorphy.chat_text_grey ,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;