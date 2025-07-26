import { Redirect } from 'expo-router';
import React from 'react';
import { useAuth } from '../context/AuthContext';
const Protected = ({ children }: { children: React.ReactNode }) => {
    const { isLoggedIn } = useAuth();
    if (isLoggedIn) {

        localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
    }
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (!storedLoginStatus || storedLoginStatus === 'false') {
        return <Redirect href="/" />; // Redirect to login page if not logged in
    }
    return (
        <>
            {children}
        </>
    )
}

export default Protected
