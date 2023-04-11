import React, { FormEvent } from 'react'
import FormBtn from './FormBtn'
import styles from './form.module.css'
import { ACTIONS } from '../../blogs/BlogReducer'
import PreviewIcon from '../../../assets/PreviewIcon'
import TrashIcon from '../../../assets/TrashIcon'
import SaveIcon from '../../../assets/SaveIcon'
import UploadIcon from '../../../assets/UploadIcon'

type FormProps = {
    openDeleteModal: () => void,
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void,
    title: string,
    description: string,
    content: string,
    dispatch: (arg: DispatchArg) => void
    preview: () => void,
    saveDraft: () => void,
    children: React.ReactNode
}

export default function Form({ handleSubmit, openDeleteModal, title, description, content, dispatch, preview, saveDraft, children }: FormProps) {
    const localStyles = {
        titleInput: {
            fontSize: '1.5rem',
            width: '50%'
        }
    }

    return (
        <form action="" onSubmit={e => handleSubmit(e)} className={styles.form}>
            <label htmlFor="title">Title</label>
            <input style={localStyles.titleInput} type="text" name='title' id='title' value={title} onChange={(e) => dispatch({type: ACTIONS.CHANGE_TITLE, payload: e.target.value})} required />
            <label htmlFor="description">Description</label>
            <input type="text" name='description' id='description' value={description} onChange={(e) => dispatch({type: ACTIONS.CHANGE_DESCRIPTION, payload: e.target.value})} required />
            {children}
            <label htmlFor="content">Content</label>
            <textarea name="content" id="content" cols={30} rows={10} value={content} onChange={(e) => dispatch({type: ACTIONS.CHANGE_CONTENT, payload: e.target.value})} required></textarea>
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