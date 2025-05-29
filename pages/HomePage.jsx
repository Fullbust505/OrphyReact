import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Colorsorphy from '../colors.js';
import NewChatPage from './NewChatPage.jsx';

const HomePage = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentTab, setCurrentTab] = useState('home');
  
  if (currentTab === 'chats') return <NewChatPage/>;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./images/column-low.png')}
        resizeMode="cover"
        style={[styles.image, styles.columns1]}
      />
      <ImageBackground
        source={require('./images/column-low.png')}
        resizeMode="cover"
        style={[styles.image, styles.columns2]}
      />

      <View style={styles.navGroup}>
        <TouchableOpacity style={styles.mainButton}>
          <Text style={styles.mainButtonText}>Start a new group</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.groupList}>
        <TouchableOpacity style={styles.buttons} onPress={() => setCurrentTab('chats')}>
          <Text style={styles.buttonText}>Go to chat</Text>
        </TouchableOpacity>
      </ScrollView>
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
    justifyContent: 'center',
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
  navGroup: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 150,
  },
  mainButton: {
    backgroundColor: Colorsorphy.option_button_grey2,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    elevation: 5,
    marginHorizontal: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButtonText: {
    color: Colorsorphy.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonText: {
    color: Colorsorphy.chat_text_grey,
    fontWeight: 'bold',
    fontSize: 16,
  },
  groupList: {
    paddingBottom: 200,
    paddingTop: 20,
  },
  buttons: {
    width: 200,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 80,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colorsorphy.option_button_lightY,
  },
});

export default HomePage;
