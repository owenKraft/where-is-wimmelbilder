import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase/app"

firebase.initializeApp({
  apiKey: "AIzaSyDPbavYeZLMq9znoQG_buJ8clfwE0R4YIA",
  authDomain: "wimmelbilder-43bce.firebaseapp.com",
  projectId: "wimmelbilder-43bce",
  storageBucket: "wimmelbilder-43bce.appspot.com",
  messagingSenderId: "210908595825",
  appId: "1:210908595825:web:067b85ac0ed9803942fdd0"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
