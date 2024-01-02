import React, { createContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsauth] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

//======================================================================================================================
// USE EFFECTS
//======================================================================================================================

    useEffect(() => {
        checkAuth();
    }, [cookies]);

//======================================================================================================================
// METHODS
//======================================================================================================================

    const checkAuth = () => {
        if (cookies['user']) {
            setUsername(cookies['user'].username);
            setEmail(cookies['user'].email);
            setRole(cookies['user'].role);
            setIsauth(true);
        } else {
            setIsauth(false);
            setUsername('');
            setEmail('');
            setRole('');
        }
    };

//======================================================================================================================
// RENDER
//======================================================================================================================

    return (
        <AuthContext.Provider value={{ isAuth, setIsauth, username, setUsername, email, setEmail, role, setRole, checkAuth, cookies, setCookie, removeCookie }}>
            {children}
        </AuthContext.Provider>
    );
};
