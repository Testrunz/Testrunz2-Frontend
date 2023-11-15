import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { GoogleAuthProvider, OAuthProvider } from "firebase/auth";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDNkpEarzBcmZ7Bgc3OlaMV09y6wHUPseM",
  authDomain: "testrunz-48ee2.firebaseapp.com",
  projectId: "testrunz-48ee2",
  storageBucket: "testrunz-48ee2.appspot.com",
  messagingSenderId: "950793974939",
  appId: "1:950793974939:web:11c011450141a2db8f823e",
  measurementId: "G-ZKGYJXJZG1",
};

const firebaseConfig = FIREBASE_CONFIG;
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore();
const auth = firebase.auth();
const provider = new GoogleAuthProvider();
const microProvider = new OAuthProvider("microsoft.com");

microProvider.addScope("mail.read");
microProvider.addScope("calendars.read");

export { auth, provider, microProvider };
