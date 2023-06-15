import { useRef, useContext } from 'react'
import AuthContext from '../../contexts/AuthContext'
import styles from './home.module.css'

export default function Login() {
    const { signInWithEmail, signInWithGoogle } = useContext(AuthContext)

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    
    function handleLogin(e: React.FormEvent) {
        e.preventDefault()

        const email = emailRef?.current?.value
        const password = passwordRef?.current?.value

        if (!email || !password) return

        signInWithEmail(email, password)
    }

    function handleGoogleLogin() {
        signInWithGoogle()
    }

    return (
        <div className={styles.login_container}>

            <div className={styles.login}>

                <h3>
                    Please Sign In to Continue
                </h3>

                <hr />

                <form action="" onSubmit={handleLogin}>

                    <label htmlFor="email">Email:</label>

                    <input type="email" name='email' id='email' ref={emailRef} required />

                    <label htmlFor="password">Password:</label>

                    <input type="password" name="password" id="password" ref={passwordRef} required />

                    <button>Sign In</button>

                </form>

                <hr />

                <div className={styles.google}>

                    <span>Or, sign in with Google</span>

                    <button onClick={handleGoogleLogin}>
                        <img src='/google.png' height={32} width={32} alt='' />
                        Sign In
                    </button>

                </div>

            </div>

        </div>
    )
}