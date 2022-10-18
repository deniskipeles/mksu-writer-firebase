// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDXsEixOeoyOvUQvmR7W1ndxF2cLdp4NOY',
	authDomain: 'mksu-writer.firebaseapp.com',
	projectId: 'mksu-writer',
	storageBucket: 'mksu-writer.appspot.com',
	messagingSenderId: '642161713639',
	appId: '1:642161713639:web:5f9c8fea1cbe266b6e9d42',
	measurementId: 'G-B0KGKJV5V9'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };
