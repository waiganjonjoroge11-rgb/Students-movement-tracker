import {initializeApp} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {getFirestore} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
const firebaseConfig={apiKey:"AIzaSyDY1k8XnAEocRbO47oh_m60EA90lVqhews",authDomain:"student-movement-tracker.firebaseapp.com",projectId:"student-movement-tracker",storageBucket:"student-movement-tracker.firebasestorage.app",messagingSenderId:"766453953545",appId:"1:766453953545:web:caf414891525a765a3b4d8"};
const app=initializeApp(firebaseConfig);export const auth=getAuth(app);export const db=getFirestore(app);