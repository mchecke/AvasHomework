// ---------------------------------------------------------------
// Firebase configuration — these are YOUR project's real values.
// Find them any time in: Firebase Console > Project Settings (gear icon) >
// General tab > "Your apps" > SDK setup and configuration.
//
// This config is safe to be public / committed to GitHub. Firebase web
// app configs are not secrets — actual security comes from Firestore
// Security Rules and from keeping the separate Admin SDK service
// account key (used only by scraper.py) out of the repo entirely.
//
// NOTE: this file uses the "compat" Firebase SDK style (global `firebase`
// object), matching the firebase-app-compat.js / firebase-auth-compat.js /
// firebase-firestore-compat.js <script> tags loaded in index.html,
// classes.html, and update.html. Don't swap this for the "modular" style
// (import { initializeApp } from "firebase/app") that the Firebase console
// sometimes shows by default — that style needs type="module" and a
// resolvable import, which a plain <script src="firebase-init.js"> tag
// can't do. Stick with one style across every file; this project uses compat.
// ---------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyDfvUc-C7-rz8Yf7gN73rgojnXZEI39F3g",
  authDomain: "assignment-tracker-b8350.firebaseapp.com",
  projectId: "assignment-tracker-b8350",
  storageBucket: "assignment-tracker-b8350.firebasestorage.app",
  messagingSenderId: "799264558588",
  appId: "1:799264558588:web:06e632cc30ccb8d155f679"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ---------------------------------------------------------------
// Shared login-gate logic used by every page. Each page provides a
// <div id="loginScreen"> and a <div id="appContent"> (hidden by
// default via the .hidden class) plus calls initAuthGate(onSignedIn).
// ---------------------------------------------------------------
function initAuthGate(onSignedIn) {
  const loginScreen = document.getElementById('loginScreen');
  const appContent = document.getElementById('appContent');
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');
  const signOutBtn = document.getElementById('signOutBtn');

  auth.onAuthStateChanged(user => {
    if (user) {
      loginScreen.classList.add('hidden');
      appContent.classList.remove('hidden');
      onSignedIn(user);
    } else {
      loginScreen.classList.remove('hidden');
      appContent.classList.add('hidden');
    }
  });

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      loginError.textContent = '';
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      auth.signInWithEmailAndPassword(email, password)
        .catch(err => {
          loginError.textContent = 'Wrong email or password.';
        });
    });
  }

  if (signOutBtn) {
    signOutBtn.addEventListener('click', () => auth.signOut());
  }
}
