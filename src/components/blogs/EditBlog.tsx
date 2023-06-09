import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { titleCase } from '../../util/functions'
import Form from '../shared/form/Form'
import DataContext from '../../contexts/DataContext'
import BlogFormInfo from './BlogFormInfo'
import { slugify } from '../../util/functions'
import BlogPreview from './BlogPreview'
import { serverTimestamp } from 'firebase/firestore'
import { ACTIONS, initialBlog, reducer } from './BlogReducer'
import PageHeader from '../shared/PageHeader'
import Modal from '../shared/Modal'
import FormBtn from '../shared/form/FormBtn'

type EditBlogProps = {
    type: string
}

export default function EditBlog({ type }: EditBlogProps) {
    const { blogs, saveArticle } = useContext(DataContext) as Firestore

    const { id } = useParams()
    const article = blogs.find((blog: Blog) => blog.id === id) || initialBlog

    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false)
    const [previewVisible, setPreviewVisible] = useState<boolean>(false)
    const [successModalVisible, setSuccessModalVisible] = useState<boolean>(false)
    const [failureModalVisible, setFailureModalVisible] = useState<boolean>(false)
    const [noImgModalVisible, setNoImgModalVisible] = useState<boolean>(false)

    const [blog, dispatch] = useReducer(reducer, article)

    const navigate = useNavigate()

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!blog.image) {
            return setNoImgModalVisible(true)
        }

        // create copy of blog state and set draft status to false
        const newBlog = { ...blog, draft: false }

        if (newBlog.createdAt) {
            // if current blog is an edit of a live blog, set the updatedAt field to a server timestamp
            newBlog.updatedAt = serverTimestamp()
        } else {
            // else generate a createdAt server timestamp
            newBlog.createdAt = serverTimestamp()

            // generate URL slug from article title
            if (!newBlog.slug) {
                newBlog.slug = slugify(newBlog.title, blogs)
            }
        }

        // upload new blog to database
        saveArticle(newBlog)
            // if success, open success modal and return to blogs page
            .then(() => {
                setSuccessModalVisible(true)
            })
            // otherwise log error
            .catch(() => {
                setFailureModalVisible(true)
            })
    }

    function saveDraft() {
        // create copy of blog state and set draft status to true
        const draft = { ...blog, draft: true }

        // upload draft to database
        saveArticle(draft)
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

    // only has an effect on page refresh
    // in the event of a page refresh, the context will load after the page and a state refresh is necessary
    useEffect(() => {
        dispatch({ type: ACTIONS.REFRESH_BLOG, payload: article })
    }, [article])

    return (
        <main>
            
            <div className="wrapper">
                
                <PageHeader>
                    <h1>{titleCase(type)} Blog {(article?.draft || !article) && '(Draft)'}</h1>
                </PageHeader>
                
                <Form 
                    handleSubmit={handleSubmit} 
                    openDeleteModal={toggleDeleteModal}
                    title={blog.title}
                    description={blog.description}
                    content={blog.content}
                    dispatch={dispatch}
                    preview={togglePreview}
                    saveDraft={saveDraft}
                >
                    
                    <BlogFormInfo
                        topics={blog.topics}
                        author={blog.author}
                        type={blog.type}
                        image={blog.image}
                        dispatch={dispatch}
                    />
                    
                </Form>
                
            </div>
            
            {previewVisible && <BlogPreview article={blog} togglePreview={togglePreview} />}

            <Modal isVisible={deleteModalVisible}>
            
                <h2>Discard changes?</h2>
                
                <div className='modal-btn-div'>
                    <FormBtn onClick={toggleDeleteModal}>Cancel</FormBtn>
                    <FormBtn variant='red' onClick={() => navigate('/blogs')}>Delete</FormBtn>
                </div>
                
            </Modal>

            <Modal isVisible={successModalVisible}>
            
                <h2>Blog saved!</h2>
                
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