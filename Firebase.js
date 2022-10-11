import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "react-native-uber-eats-7da19.firebaseapp.com",
  projectId: "react-native-uber-eats-7da19",
  storageBucket: "react-native-uber-eats-7da19.appspot.com",
  messagingSenderId: "964459915208",
  appId: "1:964459915208:web:b71e8f14636893a40fc2fd",
};

!firebase.apps.length ? firebase.initalizeApp(firebaseConfig) : firebase.app;

export default firebase;
