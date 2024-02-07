import env from '@/config/env';

import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
} from 'firebase/auth';

import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from 'firebase/firestore';

const {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
} = env;

const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

if (!config || Object.values(config).some((key) => !key))
  throw new Error('Firebase config is not set');

if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app();
}

const app = firebase.app();

const auth = firebase.auth();

const db = firebase.firestore();
const realtimeDb = firebase.database();

export {
  /**
   * Firebase
   */
  app,
  /**
   * Authentication
   */
  auth,
  // Create User
  createUserWithEmailAndPassword,
  // Sign In
  signInWithEmailAndPassword,
  signInWithPopup,
  // Sign Out
  signOut,
  // Providers
  GithubAuthProvider,
  /**
   * Database
   */
  db,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  /**
   * Realtime Database
   */
  realtimeDb,
  /**
   * Storage
   */
};

/**
 * Types
 */

export type { User as TFUser };
