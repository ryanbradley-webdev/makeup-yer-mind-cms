import { useContext } from 'react'
import DataContext from '../../contexts/DataContext'
import PageHeader from '../shared/PageHeader'
import styles from './colorMatch.module.css'
import { useNavigate } from 'react-router-dom'
import MessageIcon from '../../assets/MessageIcon'

export default function ColorMatches() {
  const { colorMatches } = useContext(DataContext) as Firestore

  const navigate = useNavigate()

  return (
    <main>
      
      <div className='wrapper'>

        <PageHeader>

          <h1>
            Color Match Requests
          </h1>

        </PageHeader>

        {colorMatches && colorMatches.map((colorMatch: ColorMatch) => (
          <div className={styles.card} onClick={() => navigate(`${colorMatch.id}`)} key={colorMatch.id}>
            <MessageIcon read={colorMatch.read} />
            <div className={styles.message}>
                <h5>{`${colorMatch.firstName} ${colorMatch.lastName}`}</h5>
                <p>{colorMatch.coverage}</p>
            </div>
          </div>
        ))}

      </div>

    </main>
  )
}