const BASE_URL = 'https://orphy-backend-gabyhouton.replit.app/'; 

import {
    database,
    ref,
    set,
    get,
    child,
    remove,
} from "../dist/FirebaseConfig.js";

export async function createProfile(profile) {
    const response = await fetch(`${BASE_URL}/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
    });
    if (!response.ok) throw new Error('Failed to create profile');
    return response.json();
}

/**
 * Fetch data from a given database path.
 */
export const fetchData = async (path) => {
    try {
        const snapshot = await get(child(ref(database), path));
        return snapshot.exists() ? snapshot.val() : null;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};
/**
 * Internal helper to set data at a given path.
 */
const setData = async (path, data) => {
    try {
        await set(ref(database, path), data);
        return data;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};
/**
 * Create data at a given database path.
 */
export const createData = setData;
/**
 * Update data at a given database path.
 */
export const updateData = setData;
/**
 * Delete data at a given database path.
 */
export const deleteData = async (path) => {
    try {
        await remove(ref(database, path));
        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
};

export const testPrint = async () => {
    console.log("Yo Linus, this is a test print");
};
