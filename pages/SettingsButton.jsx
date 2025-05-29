import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

export default function SettingsButton() {
    const router = useRouter();
    const pathname = usePathname();

    // Ne pas afficher pendant l'onboarding
    if (pathname.startsWith('/onboarding')) return null;

    return (
        <TouchableOpacity
            style={styles.fab}
            onPress={() => router.push('/settings')}
        >
            <Ionicons name="settings-outline" size={26} color="#fff" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#007AFF',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        zIndex: 10,
    },
});
