# Imagify
Image Repository Project

# Application is hosted at: 
  https://imagify-f5874.web.app/
  
# To run the app with React:
### Installation:
  **npm install**

###  To Start Server:
  **npm start**
    
### Create a firebase project:
  **Add Firebase credentials to src/firebase/firestore.js**
  
### To Visit App:
  **localhost:3000/**
    
# Design Notes:
## Technologies used:
  **React.js, Node js, Firebase**
## React.js
  For my front end I used React.js as it is one of the most powerful javascript libraries. I used it for it's resusable components which can be update the DOM when there is a change in the back end.
  
## Firebase
### Firebase Auth
  Used google authentication for secure uploading and identification of stored images. Also able to Authenticate using other services quickly and roll it out within minutes.
### Firebase Storage
  Used Firebase storage to store images of various types without having to worry about validation before upload, and receive a download url to store and display in gallery. Easily able to scale storage as needed (with cost in considerations).
#### Limitations:
  Only able to store certain sized files, so used an compression algorithm from the *browser-image-compression* package so that we meet the 1 MB storage limit per upload. If file was not able to be compressed the user would be notified.

### Firestore
  Stored which users uploaded the images, the image url, and the whether the images was private or public. Used Firestore for this so that the image could be displayed on demand without having to wait for a various sized data to be received on a back end call to the storage.
 #### Limitations:
  Would be receiving the images url of the compressed image which wouldn't display the image in the same resolution it was stored, in later features functionality could be added to retrieve the images from firebase storage and decompressed to original resolution.
  

# Collaborators:
Omar Patel
