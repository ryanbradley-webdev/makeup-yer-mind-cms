import { useContext, useReducer, useState } from 'react'
import PageHeader from '../shared/PageHeader'
import DataContext from '../../contexts/DataContext'
import { useNavigate, useParams } from 'react-router-dom'
import { initialPromo, reducer } from './PromosReducer'
import { titleCase } from '../../util/functions'
import Form from '../shared/form/Form'
import PromoFormInfo from './PromoFormInfo'
import FormBtn from '../shared/form/FormBtn'
import Modal from '../shared/Modal'
import PromoPreview from './PromoPreview'
import { serverTimestamp } from 'firebase/firestore'
import { slugify } from '../../util/functions'

type EditPromoProps = {
    type: string
}

export default function EditPromo({ type }: EditPromoProps) {
    const { id } = useParams()
    const { promos, saveArticle } = useContext(DataContext) as Firestore

    const promo = promos.find(promo => promo.id === id) || initialPromo

    const [promoState, dispatch] = useReducer(reducer, promo)

    const [previewVisible, setPreviewVisible] = useState(false)
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [successModalVisible, setSuccessModalVisible] = useState(false)
    const [failureModalVisible, setFailureModalVisible] = useState(false)
    const [noImgModalVisible, setNoImgModalVisible] = useState(false)

    const navigate = useNavigate()

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!promoState.image) {
            return setNoImgModalVisible(true)
        }

        const newPromo = { ...promoState }

        if (newPromo.createdAt) {
            // if current blog is an edit of a live blog, set the updatedAt field to a server timestamp
            newPromo.updatedAt = serverTimestamp()
        } else {
            // else generate a createdAt server timestamp
            newPromo.createdAt = serverTimestamp()

            // generate URL slug from article title
            if (!newPromo.slug) {
                newPromo.slug = slugify(newPromo.title, promos)
            }
        }

        // upload new blog to database
        saveArticle(newPromo)
            // if success, open success modal and return to blogs page
            .then(() => {
                setSuccessModalVisible(true)
            })
            // otherwise log error
            .catch(() => {
                setFailureModalVisible(true)
            })
    }

    function toggleDeleteModal() {
        setDeleteModalVisible(!deleteModalVisible)
    }

    function togglePreview() {
        setPreviewVisible(!previewVisible)
    }

    return (
        <main>

            <div className='wrapper'>

                <PageHeader>
                    <h1>{titleCase(type)} Promo</h1>
                </PageHeader>

                <Form 
                    handleSubmit={handleSubmit} 
                    openDeleteModal={toggleDeleteModal}
                    title={promoState.title}
                    description={promoState.description}
                    dispatch={dispatch}
                    preview={togglePreview}
                >

                    <PromoFormInfo
                        dispatch={dispatch}
                        isActive={promoState.active}
                        image={promoState.image}
                        link={promoState.link}
                        expiresAt={promoState.expiresAt}
                    />

                </Form>

            </div>

            {previewVisible && <PromoPreview article={promo} togglePreview={togglePreview} />}

            <Modal isVisible={deleteModalVisible}>
            
                <h2>Discard changes?</h2>
                
                <div className='modal-btn-div'>
                    <FormBtn onClick={toggleDeleteModal}>Cancel</FormBtn>
                    <FormBtn variant='red' onClick={() => navigate('/promotions')}>Delete</FormBtn>
                </div>
                
            </Modal>

            <Modal isVisible={successModalVisible}>

                <h2>Promotion saved!</h2>
                
                <div className='modal-btn-div'>
                    <FormBtn onClick={() => setSuccessModalVisible(false)}>Close</FormBtn>
                </div>
                
            </Modal>

            <Modal isVisible={failureModalVisible}>

                <h2>Something went wrong.</h2>

                <h2>Please try again or contact the webmaster.</h2>
                
                <div className='modal-btn-div'>
                    <FormBtn onClick={() => setFailureModalVisible(false)}>Close</FormBtn>
                </div>
                
            </Modal>

            <Modal isVisible={noImgModalVisible}>

                <h2>Please add an image.</h2>
                
                <div className='modal-btn-div'>
                    <FormBtn onClick={() => setNoImgModalVisible(false)}>Close</FormBtn>
                </div>
                
            </Modal>

        </main>
    )
}