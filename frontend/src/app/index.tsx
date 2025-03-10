import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '#components/Home';
import Login from '#components/login';
import SignIn from '#components/login/SignIn';
import SignUp from "#components/login/SignUp";
import ForgotPassword from '#components/login/ForgotPassword';
import NotFound from '#components/NotFound';

export default function App() {
    return (<>
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="login" element={<Login/>}>
                    <Route index  element={<SignIn/>}/>
                    <Route path="signin" element={<SignIn/>}/>
                    <Route path="signup" element={<SignUp/>}/>
                    <Route path="forgot-password" element={<ForgotPassword/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}></Route>
            </Routes>
        </Router>
    </>);
}
