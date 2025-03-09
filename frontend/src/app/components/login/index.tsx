import { useState, useEffect } from 'react';
import SignIn from '#components/login/SignIn';
import SignUp from "#components/login/SignUp";
import ForgotPassword from '#components/login/ForgotPassword';

export default function Login() {
    const [currentHash, setCurrentHash] = useState(window.location.hash);

    useEffect(() => {
        const handleHashChange = () => setCurrentHash(window.location.hash);
        window.addEventListener('hashchange', handleHashChange);
        return () => { window.removeEventListener('hashchange', handleHashChange); };
    }, []);

    switch(currentHash) {
        case '#signup': {
            return <SignUp/>
        }
        case '#signin': {
            return <SignIn/>
        }
        case '#forgot-password': {
            return <ForgotPassword/>
        }
        default:
            window.location.hash = '#signin';
            return <SignIn/>
    }
}
