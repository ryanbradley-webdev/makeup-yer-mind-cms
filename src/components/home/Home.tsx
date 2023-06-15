import { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext'
import Login from './Login'

export default function Home() {
    const { user } = useContext(AuthContext)

    const content = user ?
        <>
            <h1>Home</h1>
            <section style={{ display: 'grid', placeItems: 'center', height: '80%' }}>
                <h4>It's a beautiful day to <em>write some blogs!!!!!!!!</em></h4>
                <img src="/doge.png" alt="" style={{ width: '80%', maxWidth: '500px' }} />
            </section>
        </>

        :

        <Login />

    return (
        <main>
            <div className='wrapper'>
                {content}
            </div>
        </main>
    )
}