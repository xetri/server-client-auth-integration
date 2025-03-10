import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api, useAuth } from '#app/utils';
import type { UserMeta } from '#/app/utils';
import styles from '#css/SignIn.module.scss';

export default () => {
    const navigate = useNavigate();
    const auth = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = async (event: any) => {
        event.preventDefault();

        try {
            const { success, user } : { success: boolean, user: UserMeta }  = (await axios.post(api('auth/signin'), { email, password }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })).data;
            if (!success) return;

            auth.login(user);
        } catch(error : any) {
            if (error.response.status == 403) {

            } else if (error.response.status == 404) {

            }

            console.error(error.message);
        }

    };

    return (
        <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={signIn}>
            <div className={`${styles.formGroup} ${styles.headerWrapper}`}>
                <label className={styles.header}>SignIn</label>
            </div>
            <div className={styles.formGroup}>
                <div className={styles.formControlWrapper}>
                    <input className={styles.formControl}
                        type="email" 
                        name="email"
                        id="email"
                        placeholder="Email ID"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                    <div className={styles.passwordInputWrapper}>
                        <input className={styles.formControl}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required={true}
                        />
                    </div>
                </div>
                <div className={styles.helperWrapper} onClick={() => { navigate('/login/forgot-password') }}>
                    <span>
                        <p>Forgot Password ?</p>
                    </span>
                </div>
            </div>
            <div className={`${styles.btnWrapper}`}>
                <button className={styles.btnPrimary} type="submit">
                    SignIn
                </button>
                <button className={`${styles.btnSecondary}`} type="button"
                    onClick={
                        (_) => {
                            navigate('/login/signup');
                        }
                    }
                >
                    SignUp
                </button>
            </div>
        </form>
    </div>
    )
}
