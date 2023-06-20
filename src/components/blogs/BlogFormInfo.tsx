import { useContext, useRef, useState } from 'react'
import Chip from '../shared/Chip'
import TinyBtn from '../shared/TinyBtn'
import { slugify } from '../../util/functions'
import { ACTIONS } from './BlogReducer'
import ImgUploader from '../shared/form/ImgUploader'
import { v4 as uuid } from 'uuid'
import DataContext from '../../contexts/DataContext'

type BlogFormInfoProps = {
    topics: string[],
    type: string,
    dispatch: (arg: DispatchArg) => void,
    image: string
}

export default function BlogFormInfoCopy({ topics, type, dispatch, image }: BlogFormInfoProps) {
    const [imgLoading, setImageLoading] = useState<boolean>(false)

    const topicRef= useRef<HTMLInputElement>(null)

    const { uploadImg } = useContext(DataContext) as Firestore

    function addTopic() {
        // first, check that topicRef isn't null
        if (topicRef.current) {
            // get input value
            const newTopic: string = topicRef.current.value.toLowerCase()

            // if input isn't blank, save topic to blog state and reset input
            if (newTopic !== '') dispatch({type: ACTIONS.ADD_TOPIC, payload: newTopic})
            topicRef.current.value = ''
        }
    }

    function removeTopic(value: string) {
        // bail from function if no topics exist
        if (topics.length === 0) return

        // otherwise remove topic from blog state
        dispatch({type: ACTIONS.DELETE_TOPIC, payload: value})
    }

    function handleUpload(file: File | null) {
        // bail from function if no file provided
        if (!file) return

        // set loading spinner in ImgUploader component
        setImageLoading(true)

        // upload file to firebase
        uploadImg('blogs', slugify(file.name), file)
            .then((data) => {
                //update blog state with returned image URL
                dispatch({type: ACTIONS.CHANGE_IMAGE, payload: data as string})

                // remove loading spinner
                setImageLoading(false)
            })
    }

    return (
        <>
            <ImgUploader 
                uploadImg={handleUpload}
                isLoading={imgLoading}
                name='thumbnail'
                img={image}
                single
            >
                Thumbnail
            </ImgUploader>

            <label htmlFor="type">Blog Type</label>

            <select 
                name="type" 
                id="type" 
                onChange={e => dispatch({ type: ACTIONS.CHANGE_TYPE, payload: e.target.value })}
                value={type}
            >
                <option value="products">Products</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="tutorial">Tutorial</option>
                <option value="state-of-mind">State of Mind</option>
            </select>

            <label htmlFor="topics">Topics</label>

            <div>

                <input 
                    type="text"
                    name="topics"
                    id="topics"
                    ref={topicRef}
                    style={{ width: 'auto' }}
                />

                <TinyBtn onClick={addTopic}>&#43;</TinyBtn>

            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {topics.map(topic => (
                    <Chip
                        value={topic} 
                        key={uuid()}
                        removeChip={removeTopic}
                    />
                ))}
            </div>
        </>
    )
}