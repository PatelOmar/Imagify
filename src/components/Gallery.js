import React, { useState, useRef, useEffect} from "react";
import { useHistory } from "react-router-dom";
import * as FirestoreService from '../firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Image from "./Image";

export default function Gallery(props) {
    const query = FirestoreService.db.collection('images').where(props.querySearchType, "==", props.querySearchValue);
    const [gallery, loading] = useCollectionData(query, {idField: 'id'});

    return (
        <div>
            <h1 className="Gallery-Heading">{props.title}</h1> 
           {!loading && <Feed gallery={gallery} publicPage={props.publicPage}/> }    
        </div> 
    )
}

function Feed(props){
    const Images = props.gallery; 
    const Feed = Images.map((image) => {
        let permission = "Private";
        if(image.publicPermission){
            permission = "Public";
        }
        return <Image url={image.url} permission={permission} id={image.id} publicPage={props.publicPage}/>});

    return (
        <div className="Feed">
           {Feed}
        </div> 
    )
}