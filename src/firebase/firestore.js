import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import "firebase/storage";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PORJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
    measurementId: process.env.REACT_APP_MEASUREMENTID
  };

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const authSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
}

export const uploadImage = async (url) => {
    try{
        await db.collection('images').add({
            url: url,
            uid: auth.currentUser.uid,
            publicPermission: false,
        });
        
        return true;
    } catch (err){
        console.log(err);
        return false;
    }
}

export const updateImagePermission = async (id, permission) => {
    try{
        console.log(permission);
        await db.collection('images').doc(id).update({
            publicPermission: permission,
        });
        
        return true;
    } catch (err){
        console.log(err);
        return false;
    }
}