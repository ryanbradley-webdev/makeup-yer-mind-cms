import { useContext } from 'react'
import PageHeader from '../shared/PageHeader'
import DataContext from '../../contexts/DataContext'
import styles from './promotions.module.css'
import Card from '../shared/card/Card'
import { useNavigate } from 'react-router-dom'
import NewBtn from '../shared/NewBtn'

export default function Videos() {
    const { promos } = useContext(DataContext) as Firestore
    
    const navigate = useNavigate()

    return (
        <main>

            <div className='wrapper'>

                <PageHeader>

                    <h1>
                        Promotions
                    </h1>

                    <NewBtn handleClick={() => navigate('/promotions/new')}>
                        &#43; New Promotion
                    </NewBtn>

                </PageHeader>

                <section className={styles.card_grid}>
                    {promos && promos.map((promo: Promo) => (
                        <Card 
                            image={promo.image}
                            content={promo}
                            key={promo.id}
                            id={promo.id}
                            type='promo'
                        />
                    ))}
                </section>

            </div>

        </main>
    )
}