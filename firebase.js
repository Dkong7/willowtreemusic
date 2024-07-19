// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAuoBHoc0HifVyWI4txMiof2_VCMy0j3ig",
    authDomain: "willowtree-c06da.firebaseapp.com",
    projectId: "willowtree-c06da",
    storageBucket: "willowtree-c06da.appspot.com",
    messagingSenderId: "687861466022",
    appId: "1:687861466022:web:7d577ca7b645a8281c0567",
    measurementId: "G-3X8EX3LEHD"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta las instancias necesarias
const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage };