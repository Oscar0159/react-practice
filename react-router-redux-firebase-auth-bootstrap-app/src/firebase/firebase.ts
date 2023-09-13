import { FirebaseApp, initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import firebaseConfig from "./config";

let app: FirebaseApp

if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp();
}

const auth = getAuth(app);

export { auth };