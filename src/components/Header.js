import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import * as FirestoreService from '../firebase/firestore';
import Form from 'react-bootstrap/Form'
import SignIn from "../components/SignIn";
import SignedIn from "../components/SignedIn";
import { useAuthState } from 'react-firebase-hooks/auth';


export default function Home() {
    let history = useHistory();
    const [user] = useAuthState(FirestoreService.auth);
    const [userName, setUserName] = useState("No User Signed In");
    const handleUserUpdate = () => {
        if (FirestoreService.auth.currentUser){
            setUserName(FirestoreService.auth.currentUser.displayName);
        } else{
            setUserName("No User Signed In");
        }
    }
    useEffect(() => {
        handleUserUpdate();
    }, [handleUserUpdate, user])
    const handlePersonalGallery = () => {
        history.push("/gallery/private")
    }
    const handlePublicGallery = () => {
        history.push("/gallery/public")
    }
    const handleUploadPage = () => {
        history.push("/")
    }
    return (
    <section className="HeaderBar">
        <div className="LoginInfo">
            <SignOut />
            <AccountInfo userName={userName}/>
        </div>
        <div>
            <h1>Imagify</h1>
        </div>
        <div>
            <Button className="Spacing" onClick={handlePersonalGallery} variant="outline-info"  size="lg">Personal Gallery</Button>
            <Button className="Spacing" onClick={handlePublicGallery} variant="outline-info"  size="lg">Public Gallery</Button>
            <Button className="Spacing" onClick={handleUploadPage} variant="outline-info"  size="lg">Upload Image</Button>
        </div>
    </section>
    );
}

function SignOut() {
    const handleSignOut = () => {
        if(FirestoreService.auth.currentUser){
            FirestoreService.auth.signOut()
        } else{
            console.log("No user signed in");
        }
    }


    return FirestoreService.auth.currentUser && <Button onClick={handleSignOut} variant="outline-info"  size="lg">Sign Out</Button>;
}

function AccountInfo(props) {
    return (
        <section className="Spacing">
            <h5>Signed In As:</h5>
            <h5>{props.userName}</h5>
        </section>
    );
}