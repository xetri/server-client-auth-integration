import React, { useState } from 'react';
import { redirect } from 'react-router-dom';
import axios from 'axios';

import { api } from '#utils/api';
// import { isValidEmail } from '#utils/validity';
import styles from '#css/SignUp.module.scss';

type CreateAccountResponse = {
    success: boolean,
    error?: string
}

export default function SignUp() {
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const createAccount = async () : Promise<CreateAccountResponse> => {
        try {
            const resp = await axios.post(api('auth/signup'),
                { email, name, password },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            return resp.data
        } catch(error : any) {
            console.error(`[${error.response.status}] ${error.response.data.error}`)            
            return error.response.data;
        }
    }

    const signUp = async (event : any) => {
        event.preventDefault();

        if (password != confirmPassword) {
            console.log("Password doesnot match")
            return;
        }
        
        // // This is only if user (hacker) tries to modify the input element in devtools e.g. 
        // // sets type="email" => type=""
        // if (!isValidEmail(email)) {
        //     //TODO: notify
        //     console.error("Invalid email")
        //     return;
        // }

        const { success } = await createAccount();
        if (success) {
            redirect('/');
        }
    }
    

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={signUp}>
                <div className={`${styles.formGroup} ${styles.headerWrapper}`}>
                    <label className={styles.header}>SignUp</label>
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
                        <input className={styles.formControl}
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                        <div className={styles.passwordInputWrapper}>
                            <input className={`${styles.formControl} ${password != confirmPassword ? styles.confirmPasswordNoMatch : ''}`}
                                type="password"
                                name="confirmpassword"
                                id="confirmpassword"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required={true}
                            />
                        </div>
                    </div>
                    </div>
                </div>
                <div className={`${styles.btnWrapper}`}>
                    <button className={styles.btnPrimary} type="submit">
                        SignUp
                    </button>
                    <button className={`${styles.btnSecondary}`} type="button"
                        onClick={
                            (_) => {
                                return redirect("/login#signin");
                            }
                        }
                    >
                        SignIn
                    </button>
                </div>
            </form>
        </div>
    )
}
