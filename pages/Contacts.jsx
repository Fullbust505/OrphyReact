import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView } from 'react-native';

const ContactItem = ({ name, phone }) => (
    <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`)} style={styles.contactItem}>
        <Text style={styles.contactName}>{name}</Text>
        <Text style={styles.contactPhone}>{phone}</Text>
    </TouchableOpacity>
);

export default function ContactsScreen() {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.sectionTitle}>🧠 Psychologues</Text>
            <ContactItem name="Dr. Christelle Leconte" phone="06 99 13 96 21" />
            <ContactItem name="..." phone="...." />

            <Text style={styles.sectionTitle}>🏛️ Mairies / Institutions</Text>
            <ContactItem name="Mairie de Paris" phone="01 42 74 44 44" />
            <ContactItem name="Advocacy France" phone="06 70 33 55 81" />
            <ContactItem name="Ariane Paris" phone="06 85 88 61 46" />

            <Text style={styles.sectionTitle}>🆘 Urgences</Text>
            <ContactItem name="Samu" phone="15" />
            <ContactItem name="SOS Suicide" phone="01 45 39 40 00" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginBottom: 56,
        paddingBottom: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#333',
    },
    contactItem: {
        backgroundColor: '#f2f2f2',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    contactName: {
        fontSize: 18,
        fontWeight: '600',
    },
    contactPhone: {
        fontSize: 16,
        color: '#555',
        marginTop: 4,
    },
});
