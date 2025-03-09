import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from '#components/login';

export default function App() {
    return <>
        <Router>
            <Routes>
                <Route path="/" element={<h1>Homepage</h1>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="*" element={<h1>404 Not Found</h1>}></Route>
            </Routes>
        </Router>
    </>
}