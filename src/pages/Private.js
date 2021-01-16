import React, { useState } from "react";
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import * as FirestoreService from '../firebase/firestore';
import Form from 'react-bootstrap/Form'
import SignIn from "../components/SignIn";
import Gallery from "../components/Gallery";
import { useAuthState } from 'react-firebase-hooks/auth';

export default function PrivateGallery() {
    const [user] = useAuthState(FirestoreService.auth);
    return (
    <body  className="App-body">
        {/* {user ? <Gallery querySearchType={"publicPermission"} querySearchValue={true}/> : <SignIn /> }  */}
        {user ? <Gallery querySearchType={"uid"} querySearchValue={FirestoreService.auth.currentUser.uid} title={"Personal Gallery"}/> : <SignIn /> } 
    </body>
    );
}