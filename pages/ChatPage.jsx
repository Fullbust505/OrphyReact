import React, {useState, useRef} from 'react';
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

const iceBreakers = [
  "Aujourd’hui, j’ai réussi à...",
  "En un mot, comment tu te sens en ce moment ?",
  "Si ton humeur était une météo, ce serait quoi ?",
  "Qu’est-ce qui t’a fait sourire récemment ?",
  "Une chose que j’aimerais que les gens comprennent sur moi...",
  "Ce que je fais quand ça ne va pas trop bien, c’est...",
  "Quelle chanson décrit bien ton humeur cette semaine ?",
  "Complète la phrase : je me sens le plus moi-même quand…"
];

function getDeterministicIceBreaker(groupId) {
  // Simple hash: sum char codes
  let hash = 0;
  for (let i = 0; i < groupId.length; i++) {
    hash = (hash + groupId.charCodeAt(i)) % iceBreakers.length;
  }
  return iceBreakers[hash];
}

const ChatPage = ({ groupId = "default-group" }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const iceBreaker = getDeterministicIceBreaker(groupId);
  const scrollViewRef = useRef(null);

  const handleSend = () => {
    if (input.trim().length === 0) return;
    setMessages(prev => [
      ...prev,
      {id: Date.now(), text: input.trim()}
    ]);
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
      <View style={[
        styles.icebreakerContainer,
        {backgroundColor: isDarkMode ? '#263238' : '#e0f7fa'}
      ]}>
        <Text style={[
          styles.icebreakerText,
          {color: isDarkMode ? '#b2ebf2' : '#00796b'}
        ]}>
          💬 Ice Breaker : {iceBreaker}
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
            <Text style={styles.messageText}>{msg.text}</Text>
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

const styles = StyleSheet.create({
  icebreakerContainer: {
    padding: 15,
    borderRadius: 10,
    margin: 16,
    marginBottom: 0,
  },
  icebreakerText: {
    fontSize: 18,
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