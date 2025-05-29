import { getDatabase, ref, set, push } from 'firebase/database';
import app from './firebase.js';
const db = getDatabase(app);



/*
 * Store a message in the database for a specific group.
 * @param {string} groupUid - The UID of the group.
 * @param {object} message - The message object to store (should contain at least a 'text' property).
 * @returns {Promise<object|null>} The stored message with its generated id, or null on error.
 */

/**
 * Store a message in the database for a specific group, generating a unique message UID.
 * @param {string} groupUid - The UID of the group.
 * @param {object} message - The message object to store (should contain at least a 'text' property).
 * @returns {Promise<object|null>} The stored message with its generated id, or null on error.
 */
export async function sendMessageToGroup(groupUid, message) {
  if (!groupUid || !message) throw new Error('groupUid and message are required');
  const messagesRef = ref(db, `/groups/2025-06-01/${groupUid}/messages`);
  const newMsgRef = push(messagesRef);
  const messageWithId = { ...message, id: newMsgRef.key };
  await set(newMsgRef, messageWithId);
  return messageWithId;
}

