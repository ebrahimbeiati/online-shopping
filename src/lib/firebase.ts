import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA3WzUrKtcCF_jk5uKEHsN56eeCqgqnbEw",
  authDomain: "online-shopping-dd0ad.firebaseapp.com",
  projectId: "online-shopping-dd0ad",
  storageBucket: "online-shopping-dd0ad.appspot.com",
  messagingSenderId: "1066635235174",
  appId: "1:1066635235174:web:9d6d3bd22dd37dc88682a7",
  measurementId: "G-RW0L30P63S",
};

// Initialize Firebase only if it hasn't been initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
