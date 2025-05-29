import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Colorsorphy from '../colors.js';
import LinearGradient from 'react-native-linear-gradient';

const EmptyPage = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollViewRef = useRef(null);

  const handleSend = () => {
    if (input.trim().length === 0) return;

    const isMe = messages.length % 2 === 0;

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        text: input.trim(),
        sender: isMe ? 'me' : 'other',
        senderName: isMe ? 'You' : 'Soma'
      }
    ]);

    setInput('');
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={{ padding: 16, paddingBottom: 50, paddingTop: 65}}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map(msg => {
          const isMe = msg.sender === 'me';
          return (
            <View
              key={msg.id}
              style={[
                styles.messageWrapper,
                isMe ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' }
              ]}
            >
              {!isMe && (
                <View style={styles.senderInfo}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {msg.senderName ? msg.senderName[0].toUpperCase() : '?'}
                    </Text>
                  </View>
                  <Text style={styles.senderName}>{msg.senderName}</Text>
                </View>
              )}

              <View
                style={[
                  styles.messageBubble,
                  isMe ? styles.myMessage : styles.otherMessage
                ]}
              >
                <Text style={[styles.messageText, isMe && { color: Colorsorphy.chat_text_grey, }]}>
                  {msg.text}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor={isDarkMode ? '#aaa' : Colorsorphy.background_text_brown}
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
  header: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 20,
    paddingHorizontal: 16,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: Colorsorphy.background_beige,
  },
  messageWrapper: {
    marginBottom: 12,
    width: '100%',
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  senderName: {
    fontSize: 14,
    color: '#555',
  },
  messageBubble: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    maxWidth: '80%',
    elevation: 3,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colorsorphy.user_bubble_color,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Colorsorphy.other_bubble_color,
  },
  messageText: {
    fontSize: 16,
    color: Colorsorphy.chat_text_grey,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    borderTopWidth: 2,
    borderColor: Colorsorphy.text_barre_back,
    backgroundColor: Colorsorphy.user_bubble_color ,
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
    borderColor: Colorsorphy.background_text_brown,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: Colorsorphy.white,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: Colorsorphy.background_text_brown,
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

export default EmptyPage;
