import { createContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../lib/firebase";
import { User, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<User | null>(null)

    async function signInWithEmail(email: string, password: string) {
        return await signInWithEmailAndPassword(auth, email, password)
                .then(res => res.user)
                .catch(err => {
                    if (err.message) return err.message
                })
    }

    async function signInWithGoogle() {
        try {
            signInWithPopup(auth, googleProvider)
        } catch {
            return 'failed to login'
        }
    }

    async function userSignOut() {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setUser(user)
        })

        return () => unsubscribe()
    }, [])

    const value = {
        user,
        signInWithEmail,
        signInWithGoogle,
        userSignOut
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext