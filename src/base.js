import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBFdcCjXF3qbyB2-wJRul6Oy4DAZXzPiHY',
  authDomain: 'catch-of-the-day--stan-clarke.firebaseapp.com',
  databaseURL:
    'https://catch-of-the-day--stan-clarke-default-rtdb.firebaseio.com',
});

const base = Rebase.createClass(firebaseApp.database());

// Named export
export { firebaseApp };

// Default export
export default base;
