// filepath: c:\Users\linus\Documents\Working Stuff\Git Hub\EFREI_git\OrphyReact\firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: 'AIzaSyB6aOgnrvcG7IPkiKv-CIRG967slbxvL8A',
  authDomain: "orphy-p2-2025.firebaseapp.com",
  databaseURL: "https://orphy-p2-2025-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "orphy-p2-2025",
  storageBucket: "orphy-p2-2025.firebasestorage.app",
  messagingSenderId: "232822367180",
  appId: "1:232822367180:web:c09f37625b88fab800f369",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database, set, get, child, remove, ref };