import app from "./firebase.js";
import { getDatabase, ref, set, get, child, push, remove, onValue } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, } from "firebase/auth";
const db = getDatabase(app);
const auth = getAuth(app);

const FirebaseClient = {
    // Auth
    createUser: async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User signed up:', userCredential.user);
            return userCredential.user;
        }
        catch (error) {
            console.error('Sign-up error:', error.message);
            return null;
        }
    },
    logInUser: async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in:', userCredential.user);
            return userCredential.user;
        }
        catch (error) {
            console.error('Sign-in error:', error.message);
            return null;
        }
    },
    logOutUser: async () => {
        try {
            await signOut(auth);
            console.log('User signed out');
        }
        catch (error) {
            console.error('Sign-out error:', error.message);
        }
    },
    fetchAll: async (path) => {
        try {
            const dbRef = ref(db);
            const snapshot = await get(child(dbRef, path));
            if (snapshot.exists()) {
                return snapshot.val();
            }
            else {
                console.log("No data available");
                return null;
            }
        }
        catch (error) {
            console.error("Error fetching data:", error.message);
            return null;
        }
    },
    addOrUpdate: async (path, data) => {
        try {
            await set(ref(db, path), data);
            return data;
        }
        catch (error) {
            console.error("Error adding/updating data:", error.message);
            return null;
        }
    },
    pushData: async (path, data) => {
        try {
            const newRef = push(ref(db, path));
            await set(newRef, data);
            return Object.assign({ id: newRef.key }, data);
        }
        catch (error) {
            console.error("Error pushing data:", error.message);
            return null;
        }
    },
    deleteData: async (path) => {
        try {
            await remove(ref(db, path));
            return true;
        }
        catch (error) {
            console.error("Error deleting data:", error.message);
            return false;
        }
    },
};
export default FirebaseClient;
