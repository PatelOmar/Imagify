import React, { useState } from "react";
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import * as FirestoreService from '../firebase/firestore';
import Form from 'react-bootstrap/Form'

export default function SignIn() {
    let history = useHistory();

    
    const handleSignIn = () =>{
        FirestoreService.authSignIn();
    }
  
    return (
    <div className="Page-home-buttons">
        <Button variant="outline-primary" size="lg" onClick={handleSignIn}>Sign In</Button>
    </div>  
    );
  }