import * as firebase from 'firebase';
import Auth from "firebase/auth";
import database from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBxGHYixNRHXakbnHjsw9qKcQjsb0JssUI",
  authDomain: "foodtruck-a92cc.firebaseapp.com",
  databaseURL: "https://foodtruck-a92cc-default-rtdb.firebaseio.com/",
  projectId: "foodtruck-a92cc",
  storageBucket: "gs://foodtruck-a92cc.appspot.com",
  messagingSenderId: "233124233438",
  appId: "1:233124233438:web:1cdfddc68195cf453cc24f",
  measurementId: "G-P5NE44M3M8"
};

/*const firebaseConfig = {
    apiKey: "AIzaSyDqIsb2XprSdwtpWtOLm8eE06KR7M2eHjw",
    authDomain: "practice-database-df325.firebaseapp.com",
    projectId: "practice-database-df325",
    storageBucket: "practice-database-df325.appspot.com",
    messagingSenderId: "176386787905",
    appId: "1:176386787905:web:7af3545230d23f10ad14c0",
    measurementId: "G-EMMV6FLGVE"
};*/
  
  

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase, database, Auth };