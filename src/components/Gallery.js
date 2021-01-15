import React, { useState, useRef, useEffect} from "react";
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import * as FirestoreService from '../firebase/firestore';
import Form from 'react-bootstrap/Form';
import imageCompression from 'browser-image-compression';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Image from "./Image";

export default function Gallery(props) {
    let history = useHistory();
    // const [images,setImages] = useState([]);
    // let querySearchType = "uid";
    // let querySearchValue = FirestoreService.auth.currentUser.uid;
    const query = FirestoreService.db.collection('images').where(props.querySearchType, "==", props.querySearchValue);
    const [gallery, loading] = useCollectionData(query, {idField: 'id'});

    return (
        <div>
           {!loading && <Feed gallery={gallery}/> }    
        </div> 
    )
}

function Feed(props){
    let history = useHistory();
    console.log(props.gallery);
    const Images = props.gallery;
   
    useEffect(() => {
        if(!Images[0].publicPermission){
            console.log("private")
        }
    }, [])   
    const Feed = Images.map((image) => {
        let permission = "Private";
        if(image.publicPermission){
            permission = "Public";
        }
        return <Image url={image.url} permission={permission} id={image.id}/>});

    return (
        <div>
           <h1>PRIVATE GALLERY</h1> 
           {Feed}
        </div> 
    )
}