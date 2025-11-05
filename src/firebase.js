/*
  src/firebase.js

  Firebase initialization for the project.

  INSTRUCTIONS:
  - Replace the placeholder values in `firebaseConfig` with your project's
    configuration from the Firebase Console (Project settings → General → Your apps).
  - After replacing, import `storage` where you need it:
      import { storage } from './firebase'
    then use Storage SDK calls such as `ref(storage, 'gallery/foto1.jpg')` and
    `getDownloadURL(...)` to obtain public URLs for images.

  SECURITY NOTE:
  - For a public static gallery you may allow read access in Storage rules, but
    make sure to tighten rules for production if necessary. Prefer using
    Firebase Authentication + security rules or signed URLs for private content.
*/

import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// TODO: Replace these placeholders with your Firebase project's config.
// You can find these values in the Firebase Console → Project settings → Your apps.
const firebaseConfig = {
  apiKey: 'REPLACE_WITH_YOUR_API_KEY',
  authDomain: 'REPLACE_WITH_YOUR_AUTH_DOMAIN',
  projectId: 'REPLACE_WITH_YOUR_PROJECT_ID',
  storageBucket: 'REPLACE_WITH_YOUR_STORAGE_BUCKET', // e.g. 'your-project-id.appspot.com'
  messagingSenderId: 'REPLACE_WITH_MESSAGING_SENDER_ID',
  appId: 'REPLACE_WITH_YOUR_APP_ID'
}

// Initialize Firebase app and export the Storage instance
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)

// Example usage (in a React component):
// import { ref, getDownloadURL } from 'firebase/storage'
// import { storage } from './firebase'
//
// async function loadImage(path) {
//   const url = await getDownloadURL(ref(storage, path))
//   return url
// }
