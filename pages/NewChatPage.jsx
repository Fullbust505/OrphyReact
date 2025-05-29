import React, { useState, useRef, useEffect } from 'react';
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

const iceBreakers = [
  "Today, I managed to...",
  "In one word, how do you feel right now?",
  "If your mood were a weather, what would it be?",
  "What made you smile recently?",
  "One thing I wish people understood about me...",
  "What I do when things aren't going so well is...",
  "Which song best describes your mood this week?",
  "Complete the sentence: I feel most like myself when...",
  "If you had a superpower for one day, what would it be and why?",
  "Your current mood in one emoji?",
  "If you were a character from a movie or series, who would you be?",
  "Are you more of a 'pull an all-nighter' or 'wake up at 6am' person?",
  "Which song describes your state of mind today?",
  "If you could tell everyone one truth without consequence, what would it be?",
  "You receive 1000€ now, but you have to spend it in 1 hour. What do you do?",
  "You're stuck in an elevator with a celebrity... who do you choose?",
  "You have one thing to say to the whole world, just once. What do you say?",
  "Share a weird dream you had recently.",
  "An irrational fear you have (or had as a child)?",
  "Finish the sentence: 'Nobody knows, but...'"
];

function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

const EmptyPage = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollViewRef = useRef(null);
  const [iceBreaker, setIceBreaker] = useState(() => iceBreakers[getRandomIndex(iceBreakers.length)]);

  useEffect(() => {
    // Set a new random ice breaker every minute
    const interval = setInterval(() => {
      setIceBreaker(iceBreakers[getRandomIndex(iceBreakers.length)]);
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  

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
      <View style={styles.icebreakerContainer}>
        <Text style={styles.icebreakerText}>
          {iceBreaker ? `💬 Ice Breaker : ${iceBreaker}` : '💬 Ice Breaker : ...'}
        </Text>
      </View>
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
