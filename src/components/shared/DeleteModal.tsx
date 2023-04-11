import FormBtn from "./form/FormBtn"

type DeleteModalProps = {
    deleteDraft: () => void,
    isVisible: boolean,
    closeModal: () => void
}

export default function DeleteModal({ deleteDraft, isVisible, closeModal }: DeleteModalProps) {
    const styles = {
        modal: {
            width: 'max-content',
            padding: '5rem',
            background: 'var(--color-dark-grey)',
            borderRadius: '8px',
        },
        buttonDiv: {
            display: 'flex',
            gap: '1rem',
            margin: '1rem auto',
            width: 'fit-content'
        }
    }

    return (
        <div style={{ display: isVisible ? 'grid' : 'none', position: 'absolute', inset: 0, placeItems: 'center', backgroundColor: '#000000d5' }}>
            <div style={styles.modal}>
                <h2>Discard changes?</h2>
                <div style={styles.buttonDiv}>
                    <FormBtn onClick={closeModal}>Cancel</FormBtn>
                    <FormBtn variant='red' onClick={deleteDraft}>Delete</FormBtn>
                </div>
            </div>
        </div>
    )
}