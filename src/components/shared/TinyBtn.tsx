type TinyBtnProps = {
    onClick: () => void,
    children: string
}

export default function TinyBtn({ onClick, children }: TinyBtnProps) {
    const styles = {
        height: '1.2rem',
        width: '1.2rem',
        borderRadius: '100%',
        border: 'none',
        marginLeft: '0.5rem'
    }

    return (
        <button type='button' onClick={onClick} style={styles}>
            {children}
        </button>
    )
}