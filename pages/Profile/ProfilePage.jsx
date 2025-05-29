import { View, Text, StyleSheet, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { database, ref, get } from '../../firebase';
import auth from '@react-native-firebase/auth';

export default function ProfileScreen({ goToForm }) {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const user = auth().currentUser;
            if (!user) return;
            const userRef = ref(database, 'users/' + user.uid);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
                setProfile(snapshot.val());
            }
        };
        fetchProfile();
    }, []);

    // For now, fallback to dummy data if profile is null
    const pseudo = profile?.pseudo || 'Pseudo';
    const age = profile?.age || 'Age';
    const city = profile?.city || 'Ville';
    const language = profile?.language || 'Langue';
    const role = profile?.role || 'Rôle';

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mon profil</Text>
            <Text style={styles.info}>🧾 Pseudo : {pseudo}</Text>
            <Text style={styles.info}>🎂 Âge : {age}</Text>
            <Text style={styles.info}>🏙️ Ville : {city}</Text>
            <Text style={styles.info}>🗣️ Langue : {language}</Text>
            <Text style={styles.info}>🎧 Rôle : {role}</Text>

            <Text style={styles.starsLabel}>⭐ Note moyenne :</Text>
            <View style={styles.stars}>
                {[...Array(5)].map((_, i) => (
                    <Text
                        key={i}
                        style={{
                            fontSize: 28,
                            color: i < 4 ? '#f7c948' : '#ccc',
                            marginRight: 2,
                        }}
                    >
                        ★
                    </Text>
                ))}
                <Text style={{ marginLeft: 8, fontSize: 16 }}>(4.0)</Text>
            </View>
            {/* Add navigation button to onboarding form */}
            <View style={{ marginTop: 40 }}>
                <Button title="Modifier mon profil" onPress={() => goToForm && goToForm()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: '#fff' },
    title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20 },
    info: { fontSize: 18, marginBottom: 10 },
    starsLabel: { marginTop: 30, fontSize: 20 },
    stars: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
});
