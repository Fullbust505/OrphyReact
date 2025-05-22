import React from 'react';
import {View, Text, StyleSheet, useColorScheme} from 'react-native';

const ProfilePage = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.centeredPage}>
      <Text style={{fontSize: 24, color: isDarkMode ? '#fff' : '#222'}}>Profile Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfilePage;