import { onValue } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { getFirebaseRef } from "../services/firebaseService.js";


export const useFirebaseValues = (path, defaultValue = undefined) => {
    const [data, setData] = useState(defaultValue);
    const [loading, setLoading] = useState(false);
    const initialized = useRef(false);
 
    useEffect(() => {
        if (initialized.current) {
            return;
        }
        let active = true;
        const dataRef = getFirebaseRef(path);
        setLoading(true);
        const unsubscribe = onValue(dataRef, (snapshot) => {
            if (active) {
                setLoading(false);
                const data = snapshot.val();
                initialized.current = true;
                if (data !== undefined) {
                    setData(data);
                }
            }
        });
        return () => {
            unsubscribe();
            initialized.current = false;
            active = false;
        };
    }, [path]);


    return [data, loading];
};