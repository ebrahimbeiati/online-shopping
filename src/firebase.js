import firebase from "firebase/compat/app"; // Import the "compat" version
import "firebase/compat/firestore"; // Import the firestore module
import "firebase/compat/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA3WzUrKtcCF_jk5uKEHsN56eeCqgqnbEw",
  authDomain: "online-shopping-dd0ad.firebaseapp.com",
  projectId: "online-shopping-dd0ad",
  storageBucket: "online-shopping-dd0ad.appspot.com",
  messagingSenderId: "1066635235174",
  appId: "1:1066635235174:web:9d6d3bd22dd37dc88682a7",
  measurementId: "G-RW0L30P63S",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
