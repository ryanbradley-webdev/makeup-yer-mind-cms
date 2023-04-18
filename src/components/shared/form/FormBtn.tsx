import React from 'react'
import { generateBtnBackground, generateBtnColor } from '../../../util/functions'
import styles from './form.module.css'

type FormBtnProps = {
    children: React.ReactNode
    variant?: string,
    onClick?: () => void,
    submit?: boolean
}

export default function FormBtn({ children, variant, onClick, submit }: FormBtnProps) {
    const localStyles = {
        color: generateBtnColor(variant),
        background: generateBtnBackground(variant)
    }

    return (
        <button
            style={localStyles}
            className={styles.formBtn}
            onClick={onClick}
            type={submit ? 'submit' : 'button'}
        >
            {children}
        </button>
    )
}