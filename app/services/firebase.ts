import env from '@/config/env';
import { initializeApp } from 'firebase/app';

import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const config = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
};

const app = initializeApp(config);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  /**
   * Firebase
   */
  app,
  /**
   * Authentication
   */
  auth,
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
   * Storage
   */
  storage,
};
