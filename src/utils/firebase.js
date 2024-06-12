import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set, push } from 'firebase/database';
import { useDatabaseValue } from "@react-query-firebase/database";
import {  getAuth, onAuthStateChanged, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth"


const firebaseConfig = {
  apiKey: "AIzaSyCdtyVdDcgoWYtylwum_qb0QTBLNf6gooI",
  authDomain: "cmh-last-quick-react.firebaseapp.com",
  databaseURL: "https://cmh-last-quick-react-default-rtdb.firebaseio.com",
  projectId: "cmh-last-quick-react",
  storageBucket: "cmh-last-quick-react.appspot.com",
  messagingSenderId: "476236660145",
  appId: "1:476236660145:web:e6a121d6f7955f983fd190"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);


export const useData = (path, transform) => {
    const dbRef = ref(database, path)
    const { data, isLoading, error } =  useDatabaseValue([path], dbRef);
    console.log("first data", data)
    const value = (!isLoading && !error && transform) ? transform(data) : data;
    console.log("new value",value?.courses)
    console.log("new id",value?.courses.id)
    console.log("new term",value?.courses.term)
    return [ value, isLoading, error ];
  };


  export const setData = (path, value) => (
    set(ref(database, path), value)
  );

  export const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
  };
  
const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };
console.log("firebase",firebase)
const auth = getAuth();
console.log("auth",auth)




// const useUserState = (auth) => {
//   if (auth){
//     console.log("userauth", auth)
//     return auth
//   } 
// }

const useUserState = () => useAuthState(auth)



  // start here. fix callback
  // we cannot use onAuthStateChanged or onIdTokenChanged
  // because they return an object we cannot use
export { useUserState as useUserState };


