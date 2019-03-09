import firebase from 'firebase';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import config from './config';

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const Matches = firebaseDB.ref('matches');
const Promotions = firebaseDB.ref('promotions');
const Teams = firebaseDB.ref('teams');

export {
    firebase,
    Matches,
    Promotions,
    Teams,
    firebaseDB
}