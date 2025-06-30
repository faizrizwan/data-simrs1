import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA5sZTapqpSO6esILnyKWLrzKzLOFBV44M",
  authDomain: "data-simrs.firebaseapp.com",
  projectId: "data-simrs",
  storageBucket: "data-simrs.appspot.com",
  messagingSenderId: "1075832014232",
  appId: "1:1075832014232:web:890e7b4e06d644c37557ed",
  measurementId: "G-D25QPZ51JP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
