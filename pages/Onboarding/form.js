import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const getRandomPseudo = () => {
    const animals = ['Panda', 'Koala', 'Tigre', 'Loup', 'Dauphin'];
    const num = Math.floor(Math.random() * 1000);
    const animal = animals[Math.floor(Math.random() * animals.length)];
    return `${animal}${num}`;
};

export default function ProfileForm() {
    const [step, setStep] = useState(0);
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');
    const [language, setLanguage] = useState('');
    const [role, setRole] = useState('');
    const router = useRouter();

    const nextStep = () => setStep((prev) => prev + 1);

    const submit = () => {
        const pseudo = getRandomPseudo();
        const profile = { pseudo, age, city, language, role };
        Alert.alert('Profil créé', `Bienvenue ${pseudo} !`);
        router.replace({ pathname: '/profile', params: profile });
    };

    const totalSteps = 4;
    const progress = ((step + 1) / totalSteps) * 100;

    return (

        <View style={styles.container}>
            {step === 0 && (
                <>
                    <Text style={styles.label}>Quel est votre âge ?</Text>
                    <TextInput style={styles.input} keyboardType="numeric" value={age} onChangeText={setAge} />
                    <Button title="Suivant" onPress={nextStep} />
                </>
            )}
            {step === 1 && (
                <>
                    <Text style={styles.label}>Votre ville de résidence</Text>
                    <TextInput style={styles.input} value={city} onChangeText={setCity} />
                    <Button title="Suivant" onPress={nextStep} />
                </>
            )}
            {step === 2 && (
                <>
                    <Text style={styles.label}>Langue(s) parlée(s)</Text>
                    <TextInput style={styles.input} value={language} onChangeText={setLanguage} />
                    <Button title="Suivant" onPress={nextStep} />
                </>
            )}
            {step === 3 && (
                <>
                    <Text style={styles.label}>Souhaitez-vous :</Text>
                    <Button title="Être aidé" onPress={() => { setRole('Être aidé'); submit(); }} />
                    <Button title="Être à l'écoute" onPress={() => { setRole('Être à l\'écoute'); submit(); }} />
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
