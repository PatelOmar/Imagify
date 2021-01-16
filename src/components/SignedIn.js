import React, { useState, useRef } from "react";
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import * as FirestoreService from '../firebase/firestore';
import Form from 'react-bootstrap/Form';
import imageCompression from 'browser-image-compression';

export default function SignedIn() {
    let history = useHistory();
    const [images,setImages] = useState([]);
    const [compressedImages,setCompressedImages] = useState([]);
    const [click,setClick] = useState(false);
    const fileInput = useRef(null);

    const handleChange = async(e) =>{
        setClick(true);
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true
        }
        console.log("Started!");
        let tempCompressedImages = [];
        let tempImages = [];
        const files = e.target.files;
        for (let i = 0; i < files.length; i++){
            if(e.target.files[i]){
                try {
                    const compressedFile = await imageCompression(e.target.files[i], options);
                    tempCompressedImages.push(compressedFile);
                    tempImages.push(e.target.files[i]);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        try{
            setCompressedImages(tempCompressedImages);
            setImages(tempImages);
        }   catch (error) {
            console.log(error);
        }
        console.log("Files ready for upload!");
        setClick(false);
        // if(e.target.files[0]){
        //     try {
        //         console.log("Started");
        //         const compressedFile = await imageCompression(e.target.files[0], options);
        //         console.log("worked");
        //         setCompressedImage(compressedFile);
        //         setImage(e.target.files[0]);
        //         // await uploadToServer(compressedFile); // write your own logic
        //       } catch (error) {
        //         console.log(error);
        //       }
        // }
        
    }
    const handleUpload = async() =>{
        // console.log(image);
        // console.log(compressedImage);
        setClick(true);
        for (let i = 0; i < compressedImages.length; i++){
            let fileName = FirestoreService.auth.currentUser.uid +"-"+compressedImages[i].name;
            const uploadTask = await FirestoreService.storage.ref(`images/${fileName}`).put(compressedImages[i]);
            console.log("Uploaded");
            uploadTask.task.on("state_changed", 
                            snapshot => {}, 
                            error =>{
                                console.log(error);
                            },
                            () =>  {
                                FirestoreService.storage.ref("images").child(fileName).getDownloadURL().then(async (url) => {
                                    // console.log(url);
                                    
                                    let uploaded = await FirestoreService.uploadImage(url);
                                    console.log("Uploaded: "+uploaded);
                                });
                            });
        }  
        console.log("Uploaded!");
        setCompressedImages([]);
        setImages([]);  
        setClick(false);       
    }
    function handleClick() {
        fileInput.current.click();
      }
    return (
        <div>
            <div className="Page-home-buttons">
                <input style= {{display: "none"}} multiple type="file" onChange={handleChange} ref={fileInput}/>
                <Button onClick={handleClick} variant="outline-info" disabled={click} size="lg">Add Files</Button> 
                <span className="Spacer"/>
                <Button variant="outline-info"  size="lg" disabled={click} onClick={handleUpload}>Upload</Button> 
            </div> 
        </div> 
    )
}