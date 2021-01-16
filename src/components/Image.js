import React, { useState, useRef, useEffect} from "react";
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import * as FirestoreService from '../firebase/firestore';
import Form from 'react-bootstrap/Form';
import imageCompression from 'browser-image-compression';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

// import SignIn from "./SignIn";

export default function Image(props) {

    return (
        <section className="Image-Card">
            <img src={props.url} height={300} width={300}/>
            {!props.publicPage && <Permissions permission={props.permission}/>}
        </section> 
    )
}
function Permissions(props){
    const [clickDisabled, setClickDisabled] = useState(false);
    const [permissionValue, setPermissionValue] = useState(props.permission);
    const handleSelect = async(eventKey) => {
        setClickDisabled(true);
        let permission = false;
        let toggleValue = "Private";
        if(eventKey === "false"){
            permission = false;
            toggleValue = "Private";
        } else {
            permission = true;
            toggleValue = "Public";
        }
        let updateProgress = await FirestoreService.updateImagePermission(props.id, permission);
        if(updateProgress){
            setPermissionValue(toggleValue);
            console.log("Successful!");
        } else {
            console.log("Not Successful!");
        }
        setTimeout(function(){ setClickDisabled(false); }, 5000);
    }
    return(
    <section>
        <h3 className="Image-Perm-Header">Permissions:</h3>
        <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle disabled={clickDisabled}>
                {permissionValue}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item eventKey="true" >Public</Dropdown.Item>
                <Dropdown.Item eventKey="false" >Private</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </section>);

}


