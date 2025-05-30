import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { database, ref, set, get } from '../../firebase';
import auth from '@react-native-firebase/auth';

const getRandomPseudo = () => {
    const animals = ['Panda', 'Koala', 'Tigre', 'Loup', 'Dauphin'];
    const num = Math.floor(Math.random() * 1000);
    const animal = animals[Math.floor(Math.random() * animals.length)];
    return `${animal}${num}`;
};

export default function ProfileForm( { endForm } ) {
    const [step, setStep] = useState(0);
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');
    const [language, setLanguage] = useState('');
    const [role, setRole] = useState('');

    const nextStep = () => setStep((prev) => prev + 1);

    const submit = async (selectedRole) => {
        const pseudo = getRandomPseudo();
        const profile = { pseudo, age, city, language, role: selectedRole ?? role };
        try {
            const user = auth().currentUser;
            if (!user) {
                Alert.alert('Erreur', 'Utilisateur non authentifié.');
                return;
            }
            // Check if user already exists in the database
            const userRef = ref(database, 'users/' + user.uid);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                // Update the existing user profile with new info
                await set(userRef, profile);
                Alert.alert('Profil updated', `Your profil has been updated !`);
                endForm();
                return;
            }
            await set(userRef, profile);
            Alert.alert('Profil created', `Welcome ${pseudo} !`);
        } catch (error) {
            Alert.alert('Erreur', 'Impossible d\'enregistrer le profil.');
        }
        endForm(); 
    };

    const totalSteps = 4;
    const progress = ((step + 1) / totalSteps) * 100;

    return (

        <View style={styles.container}>
            {step === 0 && (
                <>
                    <Text style={styles.label}>How old are you ?</Text>
                    <TextInput style={styles.input} keyboardType="numeric" value={age} onChangeText={setAge} />
                    <Button title="Suivant" onPress={() => setTimeout(nextStep, 0)} />
                </>
            )}
            {step === 1 && (
                <>
                    <Text style={styles.label}>Where do you live ? (city)</Text>
                    <TextInput style={styles.input} value={city} onChangeText={setCity} />
                    <Button title="Suivant" onPress={() => setTimeout(nextStep, 0)} />
                </>
            )}
            {step === 2 && (
                <>
                    <Text style={styles.label}>Language(s) spoken</Text>
                    <TextInput style={styles.input} value={language} onChangeText={setLanguage} />
                    <Button title="Suivant" onPress={() => setTimeout(nextStep, 0)} />
                </>
            )}
            {step === 3 && (
                <>
                    <Text style={styles.label}>Do you want to be :</Text>
                    <Button title="Helped" onPress={() => submit('Helped')} />
                    <Button title="Listened" onPress={() => submit("Listened")} />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    label: { fontSize: 20, marginBottom: 12 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 20 },
});
