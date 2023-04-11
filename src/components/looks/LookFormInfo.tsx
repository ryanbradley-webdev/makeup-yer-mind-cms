import { useRef, useState } from 'react'
import Chip from '../shared/Chip'
import TinyBtn from '../shared/TinyBtn'
import AddColor from './AddColor'
import { uploadImg } from '../../hooks/useStorage'
import slugify from 'slugify'
import styles from './looks.module.css'
import { ACTIONS } from './LookReducer'
import Modal from '../shared/Modal'
import ImgUploader from '../shared/form/ImgUploader'
import FormBtn from '../shared/form/FormBtn'

type LookFormInfoProps = {
    tags: string[],
    colors: Color[],
    image1: string,
    image2: string,
    dispatch: (arg: DispatchArg) => void
}

export default function LookFormInfo({ tags, colors, image1, image2, dispatch }: LookFormInfoProps) {
    const [addColorModalVisible, setAddColorModalVisible] = useState(false)
    const [image1Loading, setImage1Loading] = useState<boolean>(false)
    const [image2Loading, setImage2Loading] = useState<boolean>(false)
    const tagRef= useRef<HTMLInputElement>(null)

    function addTag() {
        if (tagRef.current) {
            const newTag: string = tagRef.current.value
            if (newTag !== '') dispatch({ type: ACTIONS.ADD_TAG, payload: newTag })
            tagRef.current.value = ''
        }
    }

    function removeTag(value: string) {
        if (tags.length === 0) return
        dispatch({ type: ACTIONS.DELETE_TAG, payload: value })
    }

    function openAddColorModal() {
        setAddColorModalVisible(!addColorModalVisible)
    }

    function addColor(color: Color) {
        dispatch({ type: ACTIONS.ADD_COLOR, payload: color.id })
    }

    function removeColor(value: string) {
        dispatch({ type: ACTIONS.DELETE_COLOR, payload: value })
    }

    function handleUpload(file: File, imgNum: number | null) {
        if (!file) return
        if (imgNum === 1) {
            setImage1Loading(true)
            uploadImg('looks', slugify(file.name), file)
                .then(data => {
                    dispatch({ type: ACTIONS.CHANGE_IMAGE_1, payload: data as string })
                    setImage1Loading(false)
                })
        }
        if (imgNum === 2) {
            setImage2Loading(true)
            uploadImg('looks', slugify(file.name), file)
                .then(data => {
                    dispatch({ type: ACTIONS.CHANGE_IMAGE_2, payload: data as string })
                    setImage2Loading(false)
                })
        }
    }

    return (
        <>
            <div className={styles.imagesContainer}>
                <ImgUploader uploadImg={handleUpload} isLoading={image1Loading} name='image-1' number={1} img={image1}>
                    Image 1
                </ImgUploader>
                <ImgUploader uploadImg={handleUpload} isLoading={image2Loading} name='image-2' number={2} img={image2}>
                    Image 2
                </ImgUploader>
            </div>
            <label htmlFor="tags">Tags</label>
            <div style={{ marginBottom: '0.5rem' }}>
                <input type="text" name="tags" id="tags" ref={tagRef} style={{ width: 'auto' }} />
                <TinyBtn onClick={addTag}>&#43;</TinyBtn>
            </div>
            <div className={styles.chipContainer}>
                {tags.map(tag => (
                    <Chip value={tag} key={Math.floor(Math.random() * 100000)} removeChip={removeTag} />
                ))}
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
                <label htmlFor="colors">Colors</label>
                <FormBtn onClick={openAddColorModal}>&#43; Add Color</FormBtn>
            </div>
            <div className={styles.chipContainer}>
                {colors.map(color => (
                    <Chip value={color} key={color.id} removeChip={removeColor} />
                ))}
            </div>
            <Modal isVisible={addColorModalVisible}>
                <AddColor setIsVisible={setAddColorModalVisible} addColor={addColor} />
            </Modal>
        </>
    )
}