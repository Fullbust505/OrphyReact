import React, {useState, useRef, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {sendMessageToGroup} from '../SendMsgToGroup.js';
import { database, ref, onValue } from '../firebase.js';

const iceBreakers = [
  "Aujourd’hui, j’ai réussi à...",
  "En un mot, comment tu te sens en ce moment ?",
  "Si ton humeur était une météo, ce serait quoi ?",
  "Qu’est-ce qui t’a fait sourire récemment ?",
  "Une chose que j’aimerais que les gens comprennent sur moi...",
  "Ce que je fais quand ça ne va pas trop bien, c’est...",
  "Quelle chanson décrit bien ton humeur cette semaine ?",
  "Complète la phrase : je me sens le plus moi-même quand…",
  "Si tu avais un superpouvoir pour une journée, ce serait quoi et pourquoi ?",
  "Ton mood actuel en un emoji ?",
  "Si tu étais un personnage de film ou série, tu serais qui ?",
  "Plutôt team nuit blanche ou réveil à 6h ?",
  "Quelle chanson décrit ton état d’esprit aujourd’hui ?",
  "Quel est ton pet peeve (truc qui t’énerve sans raison valable) ?",
  "Si tu pouvais dire une vérité à tout le monde sans conséquence, ce serait quoi ?",
  "Tu reçois 1000€ maintenant, mais tu dois le dépenser en 1h. Tu fais quoi ?",
  "T’es bloqué dans un ascenseur avec une célébrité… qui tu choisis ?",
  "T’as un mot à dire au monde entier, une seule fois. Qu’est-ce que tu dis ?",
  "Partage un rêve chelou que t’as fait récemment.",
  "Une peur irrationnelle que t’as (ou que t’avais enfant) ?",
  "Termine la phrase : ‘Personne ne le sait, mais…’"
];

function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

const ChatPage = ({ groupId = "default-group" }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [iceBreaker, setIceBreaker] = useState(() => iceBreakers[getRandomIndex(iceBreakers.length)]);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    
    
    const messagesRef = ref(database, `groups/2025-06-01/0edefac4-df30-4d7e-88f5-74a55ba2cefd/messages`); // remplace DATE et GROUP_ID dynamiquement
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Trie par timestamp ou clé si timestamp existe, sinon par clé
        const messagesArray = Object.entries(data)
          .map(([id, msg]) => ({ id, ...msg }))
          .sort((a, b) => {
            if (a.timestamp && b.timestamp) return a.timestamp - b.timestamp;
            return 0;
          });
        setMessages(messagesArray);
      } else {
        setMessages([]);
      }
    });
    return () => unsubscribe(); 
  }, []);

  const handleSend = async () => {
    if (input.trim().length === 0) return;
    await sendMessageToGroup('0edefac4-df30-4d7e-88f5-74a55ba2cefd', {
      content: input.trim(),
      timestamp: Date.now()
    });
    setInput('');
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({animated: true});
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <View style={styles.icebreakerContainer}>
        <Text style={styles.icebreakerText}>
          {iceBreaker ? `💬 Ice Breaker : ${iceBreaker}` : '💬 Ice Breaker : ...'}
        </Text>
      </View>
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={{padding: 16, paddingBottom: 80}}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({animated: true})}
      >
        {messages.map(msg => (
          <View key={msg.id} style={styles.messageBubble}>
            <Text style={styles.messageText}>{msg.content || msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export const styles = StyleSheet.create({
  icebreakerContainer: {
    padding: 15,
    borderRadius: 10,
    margin: 16,
    marginTop: 50,
    marginBottom: 0,
    backgroundColor: '#e0f7fa',
    alignSelf: 'stretch',
  },
  icebreakerText: {
    fontSize: 18,
    color: '#00796b',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messagesContainer: {
    flex: 1,
  },
  messageBubble: {
    backgroundColor: '#4e8cff',
    alignSelf: 'flex-start',
    borderRadius: 16,
    marginBottom: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    maxWidth: '80%',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 56, // move above the bottom bar (height of navBar)
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f7f7f7',
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#4e8cff',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ChatPage;