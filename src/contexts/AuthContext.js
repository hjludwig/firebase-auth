import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/config";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState();

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    };
    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    };
    const logout = () => {
        return auth.signOut();
    };
    useEffect(() => {
        const unsubAuth = auth.onAuthStateChanged(user => {
            setCurrentUser(user);

            setLoading(false);
        });
        return () => {
            unsubAuth();
        };
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
