import { Dispatch, useRef, useState, useContext } from 'react'
import ImgUploader from '../shared/form/ImgUploader'
import slugify from 'slugify'
import DataContext from '../../contexts/DataContext'

export default function PromoFormInfo({
    dispatch,
    image,
    link
}: {
    dispatch: Dispatch<any>,
    image: string,
    link: string
}) {
    const { uploadImg } = useContext(DataContext) as Firestore

    const [imgLoading, setImgLoading] = useState(false)

    const linkRef = useRef<HTMLInputElement>(null)

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

    return (
        <>
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