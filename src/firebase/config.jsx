import { useState, useEffect } from "react";
//? Import all the methods here
import { initializeApp } from "firebase/app";
//!imported these two methods to create a context.
import { createContext, useContext } from "react";
//Imported the firebase method to perform the functionality
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
//! Creatimng a new context below here and providing initial value null
const FirebaseContext = createContext(null);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9crX1XjZS0iIoQE5kRXa8YV24gUyjZSM",
  authDomain: "practice-9abee.firebaseapp.com",
  databaseURL: "https://practice-9abee-default-rtdb.firebaseio.com",
  projectId: "practice-9abee",
  storageBucket: "practice-9abee.appspot.com",
  messagingSenderId: "237489862239",
  appId: "1:237489862239:web:d81a7817b6a0b5f9378dea",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//! Creating Instances here
const FirebaseAuth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(app);
const storage = getStorage(app);
//! Creating custom hook
export const useFirebase = () => useContext(FirebaseContext);

//! Creating Provider
export const FirebaseProvider = (props) => {
  //?To check whether the user is Loggedin or not
  const [user, setUser] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(null);
  //This changes the state whenever the user getloggedin or loggedout
  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      console.log("hello");
      if (user) {
        setUser(user);
        setLoggedIn(true);
      } else {
        setUser(null);
        setLoggedIn(false);
      }
    });
  }, []);

  const signUpWithEmailAndPassword = (email, password) => {
    createUserWithEmailAndPassword(FirebaseAuth, email, password);
  };

  const signInWithEmailAndPass = (email, password) => {
    signInWithEmailAndPassword(FirebaseAuth, email, password);
  };

  const signInWithGoogle = () => signInWithPopup(FirebaseAuth, googleProvider);

  const handleCreateNewListing = async (name, isbnNumber, price, coverPic) => {
    const coverImageRef = ref(
      storage,
      `uploads/images/${Date.now()}-${coverPic.name}`
    );
    const res = await uploadBytes(coverImageRef);
    console.log(user);
    return addDoc(collection(firestore, "books"), {
      name,
      isbnNumber,
      price,
      imageURL: res.ref.fullPath,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };
  const getAllBooks = () => {
    return getDocs(collection(firestore, "books"));
  };

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const logOut = () => {
    signOut(FirebaseAuth);
  };
  //This is used to pass the boolean value as per the user login and logout status
  console.log(user);
  // const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signUpWithEmailAndPassword,
        signInWithEmailAndPass,
        signInWithGoogle,
        isLoggedIn,
        handleCreateNewListing,
        getAllBooks,
        getImageURL,
        logOut,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
