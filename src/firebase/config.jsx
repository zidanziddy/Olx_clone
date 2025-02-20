import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 
import { getStorage } from "firebase/storage";

import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "",
  authDomain: "olx-clone-53063.firebaseapp.com",
  projectId: "olx-clone-53063",
  storageBucket: "olx-clone-53063.firebasestorage.app",
  messagingSenderId: "126732189538",
  appId: "1:126732189538:web:8522f97b41cff4ed89763b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage(app)
export {db,auth,storage}
