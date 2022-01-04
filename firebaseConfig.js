import firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBhTzJyHfwwpb_NGU-MA09f9xgvuRQlkdg",
    authDomain: "mysintak.firebaseapp.com",
    databaseURL: "https://mysintak-default-rtdb.firebaseio.com",
    projectId: "mysintak",
    storageBucket: "mysintak.appspot.com",
    messagingSenderId: "488460688254",
    appId: "1:488460688254:web:3c43b753360573850cf12f",
    measurementId: "G-98Y955NEQF"
};
export default firebase.initializeApp(firebaseConfig);