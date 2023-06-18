import { useRef, useState, useContext, Dispatch } from 'react'
import Chip from '../shared/Chip'
import TinyBtn from '../shared/TinyBtn'
import AddColor from './AddColor'
import { slugify } from '../../util/functions'
import styles from './looks.module.css'
import { ACTIONS } from './LookReducer'
import Modal from '../shared/Modal'
import ImgUploader from '../shared/form/ImgUploader'
import FormBtn from '../shared/form/FormBtn'
import { v4 as uuid } from 'uuid'
import DataContext from '../../contexts/DataContext'

type LookFormInfoProps = {
    tags: string[],
    colors: Color[],
    image1: string,
    image2: string,
    dispatch: Dispatch<Action>
}

export default function LookFormInfo({ tags, colors, image1, image2, dispatch }: LookFormInfoProps) {
    const [addColorModalVisible, setAddColorModalVisible] = useState(false)
    const [image1Loading, setImage1Loading] = useState<boolean>(false)
    const [image2Loading, setImage2Loading] = useState<boolean>(false)

    const tagRef= useRef<HTMLInputElement>(null)

    const { uploadImg } = useContext(DataContext) as Firestore

    function addTag() {
        // first check that tagRef isn't null
        if (tagRef.current) {
            // get input value for new tag
            const newTag: string = tagRef.current.value.toLowerCase()

            // if input isn't empty, update look state with new tag and reset input
            if (newTag !== '') dispatch({ type: ACTIONS.ADD_TAG, payload: newTag })
            tagRef.current.value = ''
        }
    }

    function removeTag(value: string) {
        // if there are no tags, bail
        if (tags.length === 0) return

        // remove tag from look state
        dispatch({ type: ACTIONS.DELETE_TAG, payload: value })
    }

    function openAddColorModal() {
        setAddColorModalVisible(!addColorModalVisible)
    }

    function addColors(colors: Color[]) {
        // create an array of id's from selected colors
        // const newColors = colors.map(color => color.id)

        // add new array to current look state color id's
        dispatch({ type: ACTIONS.ADD_COLORS, payload: colors })
    }

    function removeColor(id: string) {
        // remove target color id from look state
        dispatch({ type: ACTIONS.DELETE_COLOR, payload: id })
    }

    function handleUpload(file: File, imgNum: number | undefined) {
        // if no file is provided, bail
        if (!file) return

        // determine which image is being uploaded
        if (imgNum === 1) {
            // set loading spinner UI active
            setImage1Loading(true)

            // upload image to database
            uploadImg('looks', slugify(file.name), file)
                .then(data => {
                    // update look state with provided image URL
                    dispatch({ type: ACTIONS.CHANGE_IMAGE_1, payload: data as string })

                    //remove loading spinner UI
                    setImage1Loading(false)
                })
                // TODO add error handling function
        }
        if (imgNum === 2) {
            // set loading spinner UI active
            setImage2Loading(true)

            // upload image to database
            uploadImg('looks', slugify(file.name), file)
                .then(data => {
                    // update look state with provided image URL
                    dispatch({ type: ACTIONS.CHANGE_IMAGE_2, payload: data as string })

                    //remove loading spinner UI
                    setImage2Loading(false)
                })
                // TODO add error handling function
        }
    }

    return (
        <>
            <div className={styles.imagesContainer}>
                
                <ImgUploader 
                    uploadImg={handleUpload} 
                    isLoading={image1Loading} 
                    name='image1' 
                    number={1} 
                    img={image1}
                >
                    Image 1
                </ImgUploader>
                
                <ImgUploader 
                    uploadImg={handleUpload} 
                    isLoading={image2Loading} 
                    name='image2' 
                    number={2} 
                    img={image2}
                >
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
                    <Chip 
                        value={tag} 
                        key={uuid()} 
                        removeChip={removeTag}
                    />
                ))}
                
            </div>
            
            <div style={{ marginBottom: '0.5rem' }}>
                
                <label htmlFor="colors">Colors</label>
                
                <FormBtn onClick={openAddColorModal}>&#43; Add Color</FormBtn>
                
            </div>
            
            <div className={styles.chipContainer}>
                
                {colors.map(color => (
                    <Chip
                        value={color}
                        key={color.id}
                        removeChip={removeColor}
                    />
                ))}
                
            </div>
            
            <Modal isVisible={addColorModalVisible}>
                <AddColor
                    setIsVisible={setAddColorModalVisible}
                    addColors={addColors}
                />
            </Modal>
        </>
    )
}