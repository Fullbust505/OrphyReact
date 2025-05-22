import React from 'react';
import {View, Text, StyleSheet, useColorScheme} from 'react-native';

const EmptyPage = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.centeredPage}>
      <Text style={{fontSize: 24, color: isDarkMode ? '#fff' : '#222'}}>Empty Page</Text>
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

export default EmptyPage;