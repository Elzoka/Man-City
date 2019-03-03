import firebase from 'firebase';
import 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyBxBuThB3QKH88oseSHXEgSTCyklN2IbkI",
    authDomain: "m-city-a1443.firebaseapp.com",
    databaseURL: "https://m-city-a1443.firebaseio.com",
    projectId: "m-city-a1443",
    storageBucket: "m-city-a1443.appspot.com",
    messagingSenderId: "991904514184"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const Matches = firebaseDB.ref('matches');

export {
    firebase,
    Matches
}