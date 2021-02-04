import * as firebase from 'firebase';
// import firestore from 'firebase/firestore'



const config = {
  //this is your firebase config
  // apiKey: "AIzaSyBDwvi1GGn8LiAxcCHEXeXw4k5Wz_8G25U",
  // authDomain: "test-zero-1.firebaseapp.com",
  // databaseURL: "https://test-zero-1.firebaseio.com",
  // projectId: "test-zero-1",
  // storageBucket: "test-zero-1.appspot.com",
  // messagingSenderId: "344331762008",
  // appId: "1:344331762008:web:2733af00957bfa6f864d2d",
  // measurementId: "G-9NT1LE2Q07"
  
    apiKey: "AIzaSyAWCoub6quvjEY-I4sAO3hcTlBEAfaDcc8",
    authDomain: "app-6d62c.firebaseapp.com",
    databaseURL: "https://app-6d62c.firebaseio.com",
    projectId: "app-6d62c",
    storageBucket: "app-6d62c.appspot.com",
    messagingSenderId: "1075551474912",
    appId: "1:1075551474912:web:776b6d2da0cf2d8392ac85",
    measurementId: "G-8V8W0JLNRE"
  };
  firebase.initializeApp(config);
  

  
  export default firebase;