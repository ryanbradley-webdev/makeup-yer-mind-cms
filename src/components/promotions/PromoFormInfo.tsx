import { Dispatch, useRef, useState, useContext, useEffect } from 'react'
import ImgUploader from '../shared/form/ImgUploader'
import { slugify } from '../../util/functions'
import DataContext from '../../contexts/DataContext'
import { Timestamp } from 'firebase/firestore'
import styles from './promotions.module.css'

export default function PromoFormInfo({
    dispatch,
    isActive,
    image,
    link,
    expiresAt
}: {
    dispatch: Dispatch<any>,
    isActive: boolean,
    image: string,
    link: string,
    expiresAt?: Timestamp
}) {
    const { uploadImg } = useContext(DataContext) as Firestore

    const [imgLoading, setImgLoading] = useState(false)
    const [hasExpiration, setHasExpiration] = useState(false)

    const linkRef = useRef<HTMLInputElement>(null)

    function generateStatus() {
        if (isActive) {
            return <span className={styles.green}>Active</span>
        } else {
            return <span className={styles.red}>Inactive</span>
        }
    }

    function toggleStatus() {
        dispatch({ type: 'change-status', payload: !isActive })
    }

    function handleExpirationChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setHasExpiration(e.target.value === 'yes')
    }

    function handleExpirationDateChange(e: React.ChangeEvent<HTMLInputElement>) {
        const timestamp = Timestamp.fromDate(new Date(e.target.value))

        dispatch({ type: 'change-expiration', payload: timestamp })
    }

    function convertTimestamp(timestamp: Timestamp | undefined) {
        const date = timestamp ? timestamp.toDate() : new Date()
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
        return date.toISOString().slice(0,16)
    }

    function handleUpload(file: File | null) {
        if (!file) return

        // set loading spinner in ImgUploader component
        setImgLoading(true)

        // upload file to firebase
        uploadImg('promotions', slugify(file.name), file)
            .then((data) => {
                //update blog state with returned image URL
                dispatch({type: 'change-image', payload: data as string})

                // remove loading spinner
                setImgLoading(false)
            })
    }

    useEffect(() => {
        if (!hasExpiration) {
            dispatch({ type: 'change-expiration', payload: null })
        }
    }, [hasExpiration])

    useEffect(() => {
        if (expiresAt) {
            setHasExpiration(true)
        }
    }, [])

    return (
        <>
            <div className={styles.status_div}>

                <span>Status: {generateStatus()}</span>

                <button onClick={toggleStatus} type='button'>
                    {isActive ? 'Deactivate Promotion' : 'Reactivate Promotion'}
                </button>

            </div>


            <div className={styles.expiration}>

            <label htmlFor="expiration">
                
                Do you want to set an expiration date?

                <select
                    name="expiration"
                    id="expiration"
                    value={hasExpiration ? 'yes' : 'no'}
                    onChange={handleExpirationChange}
                >
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>

            </label>

                {
                    hasExpiration &&

                    <label htmlFor="expirationDate">
                        
                        Expiration Date:

                        <input
                            type='datetime-local'
                            name='expirationDate'
                            id='expirationDate'
                            value={convertTimestamp(expiresAt)}
                            onChange={handleExpirationDateChange}
                            required
                        />

                    </label>
                }

            </div>

            <label htmlFor="link">Link</label>

            <div>

                <input 
                    type="text"
                    name="link"
                    id="link"
                    ref={linkRef}
                    value={link}
                    onChange={e => dispatch({ type: 'change-link', payload: e.target.value })}
                />

            </div>

            <ImgUploader 
                uploadImg={handleUpload}
                isLoading={imgLoading}
                name='thumbnail'
                img={image}
                single
            >
                Thumbnail
            </ImgUploader>
        </>
    )
}