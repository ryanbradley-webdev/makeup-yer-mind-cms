import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import DataContext from '../../contexts/DataContext'
import Card from '../shared/card/Card'
import NewBtn from '../shared/NewBtn'
import styles from './looks.module.css'
import PageHeader from '../shared/PageHeader'
import NoContent from '../shared/NoContent'

export default function Looks() {
    const { looks } = useContext(DataContext) as Firestore

    const navigate = useNavigate()

    return (
        <main>
            
            <div className="wrapper">
                
                <PageHeader>
                    
                    <h1>Looks</h1>
                    
                    <NewBtn handleClick={() => navigate('/looks/new')}>
                        &#43; New Article
                    </NewBtn>
                    
                </PageHeader>
                
                <section className={styles.card_grid}>
                    
                    {looks?.length > 0 ? 
                    
                        looks.map((look: Look) => (
                            <Card
                                content={look} 
                                key={look.id}
                                id={look.id}
                                image={look['image1']}
                                image2={look['image2']}
                                type='look'
                            />
                        ))

                        :

                        <NoContent />
                    }
                    
                </section>
                
            </div>
            
        </main>
    )
}