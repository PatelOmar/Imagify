import React, { useState } from "react";
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import * as FirestoreService from '../firebase/firestore';
import Form from 'react-bootstrap/Form'
import SignIn from "../components/SignIn";
import SignedIn from "../components/SignedIn";
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Home() {
    const [user] = useAuthState(FirestoreService.auth);
    return (
    <body  className="App-body">
        {user ? <SignedIn />  : <SignIn /> } 
    </body>
    );
}