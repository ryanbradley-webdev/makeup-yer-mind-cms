import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NotFound() {
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 5000)
    }, [])

    return (
        <main>
            <div className='wrapper' style={{ display: 'grid', placeItems: 'center', textAlign: 'center' }}>
                <div>
                    <p>The page you're looking for can't be found.</p>
                    <p>Redirecting you to home page.</p>
                </div>
            </div>
        </main>
    )
}