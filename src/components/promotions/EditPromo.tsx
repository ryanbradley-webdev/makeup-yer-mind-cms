import { useContext } from 'react'
import PageHeader from '../shared/PageHeader'
import DataContext from '../../contexts/DataContext'
import { useParams } from 'react-router-dom'
import { initialPromo } from './PromosReducer'
import styles from './promotions.module.css'

export default function PromosDetail() {
    const { id } = useParams()
    const { promos } = useContext(DataContext) as Firestore

    const promo = promos.find(promo => promo.id === id) || initialPromo

    return (
        <main>

            <div className='wrapper'>

                <PageHeader>

                    <h1>
                        {id ? promo.title : 'New Promotion'}
                    </h1>

                </PageHeader>

            </div>

        </main>
    )
}