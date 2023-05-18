import React from 'react'

export default function NotFound() {
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