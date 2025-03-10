import { useAuth } from '#/app/utils';
import { useNavigate, Outlet } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const auth = useAuth();

    if (auth.pending) {
        return <div>Authenticating...</div>;
    }

    if (auth.user) {
        navigate('/');
    }

    return (
        <Outlet/>
    );
}
