import firebase from 'firebase';
import 'firebase/app';
import 'firebase/database';

import config from './config';

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const Matches = firebaseDB.ref('matches');
const Promotions = firebaseDB.ref('promotions');

export {
    firebase,
    Matches,
    Promotions
}