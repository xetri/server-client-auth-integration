import React from 'react';
import ReactDOM from 'react-dom/client';
import 'reset-css';

import App from '#/app';
import { AuthProvider } from '#utils/context';
import '#css/style.css';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <AuthProvider>
        <App/>
    </AuthProvider>
);
