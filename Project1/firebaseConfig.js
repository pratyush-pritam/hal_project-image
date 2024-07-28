import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBisCiqZw4i1HU5pdEDKAe8jYe5zeITMVo",
  authDomain: "docconnect-dc825.firebaseapp.com",
  projectId: "docconnect-dc825",
  storageBucket: "docconnect-dc825.appspot.com",
  messagingSenderId: "440098399249",
  appId: "1:440098399249:web:59ba86b022cb73cccfbdb0",
  measurementId: "G-G3XB073GXL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const fauth = getAuth(app);
const db = getFirestore(app);
export { fauth, db };