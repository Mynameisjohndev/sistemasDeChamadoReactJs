import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

let firebaseConfig = {
    apiKey: "AIzaSyBetjQjhqLAuD7JXTkr7N8ViOF001JfJbA",
    authDomain: "sistemasdechamadas.firebaseapp.com",
    projectId: "sistemasdechamadas",
    storageBucket: "sistemasdechamadas.appspot.com",
    messagingSenderId: "1061482428749",
    appId: "1:1061482428749:web:abf27872ea575371155f04",
    measurementId: "G-KKF1Z9F0B5"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
