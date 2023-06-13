import { useContext, useEffect } from 'react'
import DataContext from '../../contexts/DataContext'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './colorMatch.module.css'
import { titleCase } from '../../util/functions'

export default function ColorMatchDetail() {
    const { colorMatches, toggleColorMatchRead, toggleColorMatchComplete } = useContext(DataContext) as Firestore
    const { id } = useParams()

    const navigate = useNavigate()

    const colorMatch = colorMatches.find(colorMatch => colorMatch.id === id)

    function markAsUnread() {
        if (colorMatch) toggleColorMatchRead(colorMatch.id, colorMatch.read)
    }

    function markAsComplete() {
        if (colorMatch) toggleColorMatchComplete(colorMatch.id, colorMatch.completed)
    }

    useEffect(() => {
        if (!colorMatch) {
            return navigate('/notFound')
        }

        if (!colorMatch.read) {
            toggleColorMatchRead(colorMatch.id, colorMatch.read)
        }
    }, [])

    return (
        <main>

            <div className="wrapper">

                {colorMatch ? (
                    <section className={styles.section}>

                        <h3>
                            <span>Sent by:</span> {colorMatch.firstName} {colorMatch.lastName}
                        </h3>

                        <h4>
                            <span>Status:</span> {colorMatch.completed ? 'Fulfilled' : 'Incomplete'}
                        </h4>

                        <div className={styles.btnDiv}>

                            <button className={styles.btn} onClick={markAsUnread}>Mark as unread</button>

                            <button className={styles.btn} onClick={markAsComplete}>Mark as complete</button>

                        </div>
                        
                        <p>
                            <em>
                                <span>Sent on: </span>{new Date(colorMatch.sentAt.seconds * 1000).toDateString()}
                            </em>
                        </p>

                        <div className={styles.info}>

                            <p>
                                <span>Email:</span>
                                <br />
                                {colorMatch.email}
                            </p>

                            <p>
                                <span>Referral:</span>
                                <br />
                                {colorMatch.referral ? colorMatch.referral : 'No Referral'}
                            </p>

                            <p>
                                <span>Vein Color:</span>
                                <br />
                                {colorMatch.veinColor === 'both' ? 'A perfect combiination of green and blue' : titleCase(colorMatch.veinColor)}
                            </p>

                            <p>
                                <span>Desired coverage:</span>
                                <br />
                                {colorMatch.coverage}
                            </p>

                            <p>
                                <span className={styles.selfie_span}>Selfie:</span>
                            </p>

                            {
                                colorMatch.selfie ? 
                                
                                <img src={colorMatch.selfie} alt='' className={styles.selfie} /> 
                                
                                : 
                                
                                <h4>No Selfie Provided</h4>}

                            {
                                colorMatch.customCart ?

                                <div className={styles.cart}>

                                    <p>
                                        {colorMatch.firstName} would like you to make them a Seint profile and personalized cart!
                                    </p>

                                    <p>
                                        <span>Their address is:</span>
                                        <br />
                                        {colorMatch.address}
                                    </p>

                                    <p>
                                        <span>Their phone number is:</span>
                                        <br />
                                        {colorMatch.phone}
                                    </p>

                                </div>
                                
                                :
                                
                                <p>
                                    {colorMatch.firstName} doesn&apos;t need a Seint profile created.
                                </p>
                            }

                        </div>

                    </section>

                    ) :

                    <h3>Not Found</h3>
                }

            </div>

        </main>
    )
}