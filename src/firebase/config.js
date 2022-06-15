import firebase from 'firebase/app';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyABsASvc_U01CG0w3hDsfQ-I8rntEh1QBk",
  authDomain: "cooking-site-7740f.firebaseapp.com",
  projectId: "cooking-site-7740f",
  storageBucket: "cooking-site-7740f.appspot.com",
  messagingSenderId: "208578951537",
  appId: "1:208578951537:web:0ea733cba3ad3595201ed0"
};

// initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize Services
const projectFirestore = firebase.firestore();

export { projectFirestore }