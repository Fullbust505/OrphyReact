import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function WelcomeScreen({ goToForm }) {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue sur Orphy 💙</Text>
            <Button title="Start the Adventure" onPress={goToForm} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
});