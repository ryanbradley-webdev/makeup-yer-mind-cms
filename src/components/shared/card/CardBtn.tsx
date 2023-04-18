import EditIcon from "../../../assets/EditIcon"
import TrashIcon from "../../../assets/TrashIcon"
import styles from './card.module.css'

type CardBtnProps = {
    handleClick: () => void,
    variant: string
}

export default function CardBtn({ handleClick, variant }: CardBtnProps) {
    const addStyles = {
        background: variant === 'edit' ? 'linear-gradient(#43B5F5, #2F9BD8)' : 'linear-gradient(#F54343, #D32A2A)'
    }

    const editContent = (
        <>
            <EditIcon />
            <p>Edit</p>
        </>
    )

    const deleteContent = (
        <>
            <TrashIcon />
            <p>Delete</p>
        </>
    )

    return (
        <button
            onClick={handleClick}
            className={styles.btn}
            style={addStyles}
        >
            {variant === 'edit' && editContent}
            {variant === 'delete' && deleteContent}
        </button>
    )
}