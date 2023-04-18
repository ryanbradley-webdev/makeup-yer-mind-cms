import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { titleCase } from '../../util/functions'
import Form from '../shared/form/Form'
import DataContext from '../../contexts/DataContext'
import LookFormInfo from './LookFormInfo'
import LookPreview from './LookPreview'
import slugify from 'slugify'
import { serverTimestamp } from 'firebase/firestore'
import FormBtn from '../shared/form/FormBtn'
import Modal from '../shared/Modal'
import { initialLook, reducer } from './LookReducer'
import PageHeader from '../shared/PageHeader'

type EditLookProps = {
    type: string
}

export default function EditLook({ type }: EditLookProps) {
    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false)
    const [previewVisible, setPreviewVisible] = useState<boolean>(false)
    const [successModalVisible, setSuccessModalVisible] = useState<boolean>(false)

    const { looks, allColors, saveArticle } = useContext(DataContext) as Firestore
    const { id } = useParams()

    const article = looks.find((look: Look) => look.id === id) || initialLook

    const [look, dispatch] = useReducer(reducer, article)
    const [colors, setColors] = useState<Color[]>([])

    const navigate = useNavigate()

    function successMessage() {
        // open success modal
        setSuccessModalVisible(true)

        // return to looks page after 1 second
        setTimeout(() => {
            navigate('/looks')
        }, 1000)
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        // create copy of look state and set draft status to false
        const newLook = { ...look, draft: false }

        if (newLook.createdAt) {
            // if current look is an edit of a live look, set the updatedAt field to a server timestamp
            newLook.updatedAt = serverTimestamp()
        } else {
            // else generate a createdAt server timestamp
            newLook.createdAt = serverTimestamp()

            // generate URL slug from article title
            newLook.slug = slugify(newLook.title)
        }

        // upload new look to database
        saveArticle(newLook, 'looks')
            // if success, open success modal and return to looks page
            .then(() => successMessage())
            // otherwise log error
            .catch((err: any) => console.log(err))
        // TODO add error UI to inform user of failed upload
    }

    function saveDraft() {        
        // create copy of look state and set draft status to true
        const draft = { ...look, draft: true }

        // upload draft to database
        saveArticle(draft, 'looks')
            // if success, open success modal and return to looks page
            .then(() => successMessage())
            // otherwise log error
            .catch((err: any) => console.log(err))
        // TODO add error UI to inform user of failed upload
    }

    function toggleDeleteModal() {
        setDeleteModalVisible(!deleteModalVisible)
    }

    function togglePreview() {
        setPreviewVisible(!previewVisible)
    }

    // if database colors don't complete fetching until after this page renders, populate colors after initial page load
    // this useEffect also runs every time a change is made to the look's color array, which only stores id's
    useEffect(() => {
        // first check if the colors have been fetched
        if (allColors) {
            // use the stored color id's to filter colors used in this look
            const articleColors = allColors.filter((color: Color) => look.colors.includes(color.id))

            // set color state to update UI with selected colors
            setColors(articleColors)
        }
    }, [allColors, look.colors])

    return (
        <main>

            <div className="wrapper">

                <PageHeader>
                    <h1>{titleCase(type)} Look {(article?.draft || !article) && '(Draft)'}</h1>
                </PageHeader>

                <Form 
                    handleSubmit={handleSubmit} 
                    openDeleteModal={toggleDeleteModal}
                    title={look.title}
                    description={look.description}
                    content={look.content}
                    dispatch={dispatch}
                    preview={togglePreview}
                    saveDraft={saveDraft}
                >

                    <LookFormInfo
                        tags={look.tags}
                        colors={colors}
                        image1={look.image1}
                        image2={look.image2}
                        dispatch={dispatch}
                    />

                </Form>

            </div>

            {previewVisible && <LookPreview article={look} togglePreview={togglePreview} colors={colors} />}

            <Modal isVisible={deleteModalVisible}>

                <h2>Discard changes?</h2>

                <div className='modal-btn-div'>

                    <FormBtn onClick={toggleDeleteModal}>Cancel</FormBtn>

                    <FormBtn variant='red' onClick={() => navigate('/looks')}>Delete</FormBtn>

                </div>

            </Modal>

        </main>
    )
}