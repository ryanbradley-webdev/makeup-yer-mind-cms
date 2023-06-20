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

    const navigate = useNavigate()

    function successMessage() {
        // open success modal
        setSuccessModalVisible(true)

        // navigate to promotions page after 1 second
        setTimeout(() => {
            navigate('/promotions')
        }, 1000)
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (promoState.createdAt) {
            // if current blog is an edit of a live blog, set the updatedAt field to a server timestamp
            promoState.updatedAt = serverTimestamp()
        } else {
            // else generate a createdAt server timestamp
            promoState.createdAt = serverTimestamp()

            // generate URL slug from article title
            promoState.slug = slugify(promoState.title, promos)
        }

        // upload new blog to database
        saveArticle(promoState)
            // if success, open success modal and return to blogs page
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

        </main>
    )
}