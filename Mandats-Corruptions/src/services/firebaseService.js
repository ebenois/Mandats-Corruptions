import { firebaseApp } from "../main.jsx";
import { getDatabase, ref } from "firebase/database";

export function getFirebaseRef(path) {
    const db = getDatabase(firebaseApp);
    return ref(db, path);
}

