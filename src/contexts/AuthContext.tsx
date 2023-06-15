import { ReactNode, createContext, useState } from "react";
import { auth, googleProvider } from "../lib/firebase";
import { User, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const AuthContext = createContext<any>(null)

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<User | null>(null)

    async function signInWithEmail(email: string, password: string) {
        const credential = await signInWithEmailAndPassword(auth, email, password)

        if (credential) {
            const { user } = credential
            setUser(user)
        }
    }

    async function signInWithGoogle() {
        const res = await signInWithPopup(auth, googleProvider)

        if (res.user) {
            setUser(res.user)
        }
    }

    async function userSignOut() {
        signOut(auth).then(() => setUser(null))
    }

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