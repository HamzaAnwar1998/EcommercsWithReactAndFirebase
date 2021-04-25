import firebase from 'firebase'
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'

// const firebaseConfig = {
//     apiKey: "AIzaSyDGmVBx5LAYJuIq_Ni1nZBenfcVUFX-SyY",
//     authDomain: "ecommerce-with-react-2ac06.firebaseapp.com",
//     databaseURL: "https://ecommerce-with-react-2ac06.firebaseio.com",
//     projectId: "ecommerce-with-react-2ac06",
//     storageBucket: "ecommerce-with-react-2ac06.appspot.com",
//     messagingSenderId: "690603499200",
//     appId: "1:690603499200:web:09860bc318b5b7fd74d725",
//     measurementId: "G-88N35MC51Q"
// };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDaGdQnXzQGb2zQzzbxMr6eRLSWi-EiWis",
    authDomain: "tmdt-b4ab9.firebaseapp.com",
    projectId: "tmdt-b4ab9",
    storageBucket: "tmdt-b4ab9.appspot.com",
    messagingSenderId: "141342052530",
    appId: "1:141342052530:web:e076311fcdb0fb26dab9ab",
    measurementId: "G-Z3TT27V3ZS"
  };

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const adminId = 'a31b82e2-a571-11eb-bcbc-0242ac130002';

export { auth, db, storage, adminId }