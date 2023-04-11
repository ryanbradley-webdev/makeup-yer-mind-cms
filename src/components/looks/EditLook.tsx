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

    const { looks, allColors, saveLook } = useContext(DataContext) as Firestore
    const { id } = useParams()

    const article = looks.find((look: Look) => look.id === id) || initialLook

    const [look, dispatch] = useReducer(reducer, article)
    const [colors, setColors] = useState<Color[]>([])

    const navigate = useNavigate()

    function successMessage() {
        setSuccessModalVisible(true)
        setTimeout(() => {
            navigate('/looks')
        }, 1000)
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const newLook = { ...look, createdAt: serverTimestamp(), slug: slugify(look.title), draft: false }
        saveLook(newLook, look.id)
            .then(() => successMessage())
            .catch((err: any) => console.log(err))
    }

    function saveDraft() {
        const draft = { ...look, draft: true }
        saveLook(draft as Look, article?.id)
            .then(() => successMessage())
            .catch((err: any) => console.log(err))
    }

    function toggleDeleteModal() {
        setDeleteModalVisible(!deleteModalVisible)
    }

    function togglePreview() {
        setPreviewVisible(!previewVisible)
    }

    useEffect(() => {
        if (allColors) {
            const articleColors = allColors.filter((color: Color) => look.colors.includes(color.id))
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
                    <FormBtn variant='red' onClick={() => navigate('/blogs')}>Delete</FormBtn>
                </div>
            </Modal>
        </main>
    )
}