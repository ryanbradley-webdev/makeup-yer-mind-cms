import React, { Dispatch, FormEvent } from 'react'
import FormBtn from './FormBtn'
import styles from './form.module.css'
import PreviewIcon from '../../../assets/PreviewIcon'
import TrashIcon from '../../../assets/TrashIcon'
import SaveIcon from '../../../assets/SaveIcon'
import UploadIcon from '../../../assets/UploadIcon'
import Content from './Content'

type FormProps = {
    openDeleteModal: () => void,
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void,
    title: string,
    description: string,
    content: string,
    dispatch: Dispatch<Action>
    preview: () => void,
    saveDraft: () => void,
    children: React.ReactNode
}

const ACTIONS = {
    CHANGE_TITLE: 'changeTitle',
    CHANGE_DESCRIPTION: 'changeDescription',
    CHANGE_CONTENT: 'changeContent',
}

export default function Form({ handleSubmit, openDeleteModal, title, description, content, dispatch, preview, saveDraft, children }: FormProps) {
    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const data = {
            type: ACTIONS.CHANGE_TITLE,
            payload: e.target.value
        }
        dispatch(data)
    }

    function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
        const data = {
            type: ACTIONS.CHANGE_DESCRIPTION,
            payload: e.target.value
        }
        dispatch(data)
    }

    function handleContentChange(content: string) {
        const data = {
            type: ACTIONS.CHANGE_CONTENT,
            payload: content
        }
        dispatch(data)
    }

    return (
        <form action="" onSubmit={handleSubmit} className={styles.form}>

            <label htmlFor="title">Title</label>

            <input
                type="text"
                name='title'
                id='title'
                value={title}
                onChange={handleTitleChange}
                required
            />

            <label htmlFor="description">Description</label>

            <input
                type="text"
                name='description'
                id='description'
                value={description}
                onChange={handleDescriptionChange}
                required
            />

            {children}

            <label htmlFor="content">Content</label>

            <Content value={content} handleChange={handleContentChange} />

            <div className={styles.button_div}>

                <FormBtn onClick={preview}>
                    <PreviewIcon />
                    Preview
                </FormBtn>

                <div className={styles.button_div_right}>

                    <FormBtn variant='red' onClick={openDeleteModal}>
                        <TrashIcon color='#FFFFFF' />
                        Cancel
                    </FormBtn>

                    <FormBtn onClick={saveDraft}>
                        <SaveIcon />
                        Draft
                    </FormBtn>

                    <FormBtn variant='blue' submit>
                        <UploadIcon />
                        Publish
                    </FormBtn>

                </div>

            </div>

        </form>
    )
}