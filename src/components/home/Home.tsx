import { useContext, useEffect, useState } from 'react'
import AuthContext from '../../contexts/AuthContext'
import Login from './Login'
import { dataIsFact } from '../../lib/typeCheck'
import styles from './home.module.css'

export default function Home() {
    const { user } = useContext(AuthContext)

    const [chuckNorrisFact, setChuckNorrisFact] = useState<ChuckNorrisFact | null>(null)

    useEffect(() => {
        fetch('https://api.chucknorris.io/jokes/random')
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error('HTTP ' + res.status)
                } else {
                    const object = await res.json()
                    if (dataIsFact(object)) {
                        setChuckNorrisFact(object)
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const content = user ?
        <>
            <h1>Home</h1>
            <section style={{ display: 'grid', placeItems: 'center', height: '80%' }}>
                <h4>It's a beautiful day to <em>write some blogs!!!!!!!!</em></h4>
                <img src="/doge.png" alt="" style={{ width: '80%', maxWidth: '500px' }} />
                {
                    chuckNorrisFact && (
                        <div className={styles.fun_fact}>
                            <p>
                                Fun fact of the day:
                            </p>
                            <p>
                                {chuckNorrisFact.value}
                            </p>
                        </div>
                    )
                }
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