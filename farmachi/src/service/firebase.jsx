// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; //Importo para poder inicializar la base de datos
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeL-1LjGE_75Ds-CCPxpeV7ZzKHVCK82A",
  authDomain: "farmachi-4c9eb.firebaseapp.com",
  projectId: "farmachi-4c9eb",
  storageBucket: "farmachi-4c9eb.firebasestorage.app",
  messagingSenderId: "1063545700238",
  appId: "1:1063545700238:web:e880ddbb6ca7f4bfff6edf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app) //Iniicializa la base de datos y no hacer getFirestore en todos lados