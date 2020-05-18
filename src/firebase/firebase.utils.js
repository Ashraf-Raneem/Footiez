import firebase from 'firebase'
import 'firebase/auth'
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBkT2V49Gubhl0Um7ct9Ahd6NQW9ZE6zT0",
    authDomain: "sportsqa-6db36.firebaseapp.com",
    databaseURL: "https://sportsqa-6db36.firebaseio.com",
    projectId: "sportsqa-6db36",
    storageBucket: "sportsqa-6db36.appspot.com",
    messagingSenderId: "646235581954",
    appId: "1:646235581954:web:b6216d0c31508cc6f6411b",
    measurementId: "G-67ZR9VSY25"
  };
  // Initialize Firebase

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth,additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const {name,email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        name,
        email,
        createdAt,
        ...additionalData
      });
    }catch (error){
      console.log('error creating user',error.message)
    }
     }
     return userRef;

  }

export const database = firebase.database(); 
 
const provider = new firebase.auth.GoogleAuthProvider()

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const auth = firebase.auth();
export const firestore = firebase.firestore(); 
export default firebase



