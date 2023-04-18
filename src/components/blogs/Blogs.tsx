import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import DataContext from '../../contexts/DataContext'
import Card from '../shared/card/Card'
import NewBtn from '../shared/NewBtn'
import styles from './blogs.module.css'
import PageHeader from '../shared/PageHeader'

export default function Blogs() {
    const { blogs } = useContext(DataContext) as Firestore

    const navigate = useNavigate()

    return (
        <main>
            
            <div className="wrapper">
                
                <PageHeader>
                    
                    <h1>Blogs</h1>
                    
                    <NewBtn handleClick={() => navigate('/blogs/new')}>
                        &#43; New Article
                    </NewBtn>
                    
                </PageHeader>
                
                <section className={styles.card_grid}>
                    {blogs && blogs.map((blog: Blog) => (
                        <Card 
                            image={blog.image}
                            content={blog} 
                            key={blog.id}
                            id={blog.id}
                            type='blog'
                        />
                    ))}
                </section>
                
            </div>
            
        </main>
    )
}