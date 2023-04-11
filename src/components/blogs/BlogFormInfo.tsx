import { useRef, useState } from 'react'
import Chip from '../shared/Chip'
import TinyBtn from '../shared/TinyBtn'
import { uploadImg } from '../../hooks/useStorage'
import slugify from 'slugify'
import LoadingSpinner from '../shared/form/LoadingSpinner'
import { ACTIONS } from './BlogReducer'
import ImgUploader from '../shared/form/ImgUploader'

type BlogFormInfoProps = {
    topics: string[],
    dispatch: (arg: DispatchArg) => void,
    image: string
}

export default function BlogFormInfoCopy({ topics, dispatch, image }: BlogFormInfoProps) {
    const [imgLoading, setImageLoading] = useState<boolean>(false)

    const topicRef= useRef<HTMLInputElement>(null)

    function addTopic() {
        if (topicRef.current) {
            const newTopic: string = topicRef.current.value
            if (newTopic !== '') dispatch({type: ACTIONS.ADD_TOPIC, payload: newTopic})
            topicRef.current.value = ''
        }
    }

    function removeTopic(value: string) {
        if (topics.length === 0) return
        dispatch({type: ACTIONS.DELETE_TOPIC, payload: value})
    }

    function handleUpload(file: File | null) {
        if (!file) return
        setImageLoading(true)
        uploadImg('blogs', slugify(file.name), file)
            .then((data) => {
                dispatch({type: ACTIONS.CHANGE_IMAGE, payload: data as string})
                setImageLoading(false)
            })
    }

    return (
        <>
            <ImgUploader uploadImg={handleUpload} isLoading={imgLoading} name='thumbnail' number={null} img={image}>
                Thumbnail
            </ImgUploader>
            <label htmlFor="topics">Topics</label>
            <div>
                <input type="text" name="topics" id="topics" ref={topicRef} style={{ width: 'auto' }} />
                <TinyBtn onClick={addTopic}>&#43;</TinyBtn>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {topics.map(topic => (
                    <Chip value={topic} key={Math.floor(Math.random() * 100000)} removeChip={removeTopic} />
                ))}
            </div>
        </>
    )
}