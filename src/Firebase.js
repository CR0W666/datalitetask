
import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyBJ_oOAFBXMu7BbIJPdNoEV-dAPZlfzLKY",
    authDomain: "data-lite-task.firebaseapp.com",
    projectId: "data-lite-task",
    storageBucket: "data-lite-task.appspot.com",
    messagingSenderId: "68194123588",
    appId: "1:68194123588:web:095af22a80614308e1e111",
    measurementId: "G-QCP121PV1M"
}

export const firebaseInit = () => { console.log('fb init'); Firebase.initializeApp(firebaseConfig) }

if(Firebase.apps.length === 0) firebaseInit();

export const firebase = Firebase;
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const useCollectionDataHook = useCollectionData;
