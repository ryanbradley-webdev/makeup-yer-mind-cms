import React from 'react'

export default function Home() {
    return (
        <main>
            <div className='wrapper'>
                <h1>Home</h1>
                <section style={{ display: 'grid', placeItems: 'center', height: '80%' }}>
                    <h4>It's a beautiful day to <em>write some blogs!!!!!!!!</em></h4>
                    <img src="/doge.png" alt="" style={{ width: '80%', maxWidth: '500px' }} />
                </section>
            </div>
        </main>
    )
}