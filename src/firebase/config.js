import firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyB2-aGtCn9cWAt2mueAMbnar9vhZWKAeR8",
    authDomain: "react-auth-test-3825b.firebaseapp.com",
    projectId: "react-auth-test-3825b",
    storageBucket: "react-auth-test-3825b.appspot.com",
    messagingSenderId: "566134006982",
    appId: "1:566134006982:web:91ce4cb95da919506023c7",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.firestore();
export default app;
