import React, { useState } from "react";
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import * as FirestoreService from '../firebase/firestore';
import Form from 'react-bootstrap/Form'
import SignIn from "../components/SignIn";
import Gallery from "../components/Gallery";
import { useAuthState } from 'react-firebase-hooks/auth';

export default function PublicGallery() {
    const [user] = useAuthState(FirestoreService.auth);

    return (
    <body  className="App-body">
       <Gallery publicPage={true} querySearchType={"publicPermission"} querySearchValue={true} title={"Public Gallery"}/>
    </body>
    );
}