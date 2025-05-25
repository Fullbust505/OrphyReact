import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function ProfileScreen() {
    const { pseudo, age, city, language, role } = useLocalSearchParams();

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
                    <FontAwesome key={i} name="star" size={28} color={i < 4 ? '#f7c948' : '#ccc'} />
                ))}
                <Text style={{ marginLeft: 8, fontSize: 16 }}>(4.0)</Text>
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
