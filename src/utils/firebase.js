import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useDatabaseValue } from "@react-query-firebase/database";

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


// export const useData = (path) => {
//   const dataRef =  ref(database, path);
//   console.log("dataRef",dataRef)
//   return onValue(dataRef, (snapshot) => {
//     const data = snapshot.val()
//     console.log("data try", data)
//     return data
//   })
  
// };



export const useData = (path, transform) => {
    const dbRef = ref(database, path)
    const { data, isLoading, error } =  useDatabaseValue([path], dbRef);
    const value = (!isLoading && !error && transform) ? transform(data) : data;
    return [ value, isLoading, error ];
  };

  


