import * as firebase from 'firebase'

import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDGmVBx5LAYJuIq_Ni1nZBenfcVUFX-SyY",
    authDomain: "ecommerce-with-react-2ac06.firebaseapp.com",
    databaseURL: "https://ecommerce-with-react-2ac06.firebaseio.com",
    projectId: "ecommerce-with-react-2ac06",
    storageBucket: "ecommerce-with-react-2ac06.appspot.com",
    messagingSenderId: "690603499200",
    appId: "1:690603499200:web:09860bc318b5b7fd74d725",
    measurementId: "G-88N35MC51Q"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage }