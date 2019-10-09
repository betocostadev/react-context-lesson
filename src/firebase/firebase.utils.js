import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCwDNnGjdDNolU4HU7MDHKtUMbL8MUY4k0",
  authDomain: "web-clothing-db.firebaseapp.com",
  databaseURL: "https://web-clothing-db.firebaseio.com",
  projectId: "web-clothing-db",
  storageBucket: "web-clothing-db.appspot.com",
  messagingSenderId: "957647152799",
  appId: "1:957647152799:web:133cd062aa5a786d1e64aa"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
