import { useContext, useEffect } from 'react'
import DataContext from '../../contexts/DataContext'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './colorMatch.module.css'

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
                    <>
                        <h3>Sent by: {colorMatch.firstName} {colorMatch.lastName}</h3>

                        <h4>Status: {colorMatch.completed ? 'Fulfilled' : 'Incomplete'}</h4>

                        <button className={styles.btn} onClick={markAsUnread}>Mark as unread</button>

                        <button className={styles.btn} onClick={markAsComplete}>Mark as complete</button>
                        
                        <h5><span>Sent on: </span>{new Date(colorMatch.sentAt.seconds * 1000).toDateString()}</h5>

                        <div>

                            <p>
                                Email: {colorMatch.email}
                            </p>

                            <p>
                                Referral: {colorMatch.referral ? colorMatch.referral : 'No Referral'}
                            </p>

                            <p>
                                Vein Color: {colorMatch.veinColor === 'both' ? 'A perfect combiination of green and blue' : colorMatch.veinColor}
                            </p>

                            <p>
                                Desired coverage: {colorMatch.coverage}
                            </p>

                            <p>
                                Selfie:
                            </p>

                            {colorMatch.selfie ? <img src={colorMatch.selfie} alt='' /> : <h4>No Selfie Provided</h4>}

                            {
                                colorMatch.customCart ?

                                <div>
                                    <p>
                                        {colorMatch.firstName} would like you to make them a Seint profile and personalized cart!
                                    </p>
                                    <p>
                                        Their address is {colorMatch.address}
                                    </p>
                                    <p>
                                        Their phone number is {colorMatch.phone}
                                    </p>
                                </div>
                                :
                                <p>
                                    {colorMatch.firstName} doesn&apos;t need a Seint profile created.
                                </p>
                            }

                        </div>

                    </>
                    ) :
                    <h3>Not Found</h3>
                }

            </div>

        </main>
    )
}