import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DeleteModal from '../shared/DeleteModal'
import { titleCase } from '../../util/functions'
import Form from '../shared/form/Form'
import DataContext from '../../contexts/DataContext'
import BlogFormInfo from './BlogFormInfo'
import slugify from 'slugify'
import BlogPreview from './BlogPreview'
import { serverTimestamp } from 'firebase/firestore'
import { initialBlog, reducer } from './BlogReducer'
import PageHeader from '../shared/PageHeader'

type EditBlogProps = {
    type: string
}

type Action = {
    type: string,
    payload?: string
}

export default function EditBlog({ type }: EditBlogProps) {
    const { blogs, saveBlog } = useContext(DataContext) as Firestore

    const { id } = useParams()
    const article = blogs.find((blog: Blog) => blog.id === id) || initialBlog

    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false)
    const [previewVisible, setPreviewVisible] = useState<boolean>(false)
    const [successModalVisible, setSuccessModalVisible] = useState<boolean>(false)

    const [blog, dispatch] = useReducer(reducer, article)

    const navigate = useNavigate()

    function successMessage() {
        setSuccessModalVisible(true)
        setTimeout(() => {
            navigate('/blogs')
        }, 1000)
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const newBlog = { ...blog, createdAt: serverTimestamp(), draft: false, slug: slugify(blog.title) }
        saveBlog(newBlog, newBlog?.id)
            .then(() => successMessage())
            .catch((err: any) => console.log(err))
    }

    function saveDraft() {
        const draft = { ...blog, draft: true }
        saveBlog(draft as Blog, draft?.id)
            .then(() => successMessage())
            .catch((err: any) => console.log(err))
    }

    function toggleDeleteModal() {
        setDeleteModalVisible(!deleteModalVisible)
    }

    function togglePreview() {
        setPreviewVisible(!previewVisible)
    }

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
                        image={blog.image}
                        dispatch={dispatch}
                    />
                </Form>
            </div>
            {previewVisible && <BlogPreview article={blog} togglePreview={togglePreview} />}
            <DeleteModal 
                deleteDraft={() => navigate('/blogs')}
                isVisible={deleteModalVisible}
                closeModal={toggleDeleteModal}
            />
        </main>
    )
}