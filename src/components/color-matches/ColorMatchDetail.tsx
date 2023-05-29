import { useContext, useEffect } from 'react'
import DataContext from '../../contexts/DataContext'
import { useNavigate, useParams } from 'react-router-dom'

export default function ColorMatchDetail() {
    const { colorMatches, toggleColorMatchRead, toggleColorMatchComplete } = useContext(DataContext) as Firestore
    const { id } = useParams()

    const navigate = useNavigate()

    const colorMatch = colorMatches.find(colorMatch => colorMatch.id === id)

    if (!colorMatch) {
        navigate('/notFound')
    }

    function markAsRead() {
        if (colorMatch) toggleColorMatchRead(colorMatch.id, colorMatch.read)
    }

    function markAsComplete() {
        if (colorMatch) toggleColorMatchComplete(colorMatch.id, colorMatch.completed)
    }

    useEffect(() => {
        if (colorMatch && !colorMatch.read) {
            toggleColorMatchRead(colorMatch.id, colorMatch?.read)
        }
    }, [])

    return (
        <main>

            <div className="wrapper">

                {colorMatch ?
                    <h3>Sent by: {colorMatch?.firstName} {colorMatch?.lastName}</h3>
                    :
                    <h3>Not Found</h3>
                }

            </div>

        </main>
    )
}