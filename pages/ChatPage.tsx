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

const ChatPage = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [messages, setMessages] = useState<{id: number, text: string}[]>([]);
  const [input, setInput] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

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
