type ChipProps = {
    value: string | Color,
    removeChip: (value: string) => void
}

export default function Chip({ value, removeChip }: ChipProps) {
    const styles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            width: 'fit-content',
            paddingInline: '0.5rem',
            fontSize: '0.75rem',
            color: '#E9E9E9',
            background: '#696969',
            borderRadius: '50px',
            boxShadow: '0px 5px 3px -1px black'
        },
        button: {
            color: '#9D9D9D',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer'
        },
        img: {
            width: '20px',
            height: '20px',
            borderRadius: '100%',
            marginLeft: '-4px',
            border: '1px solid #E9E9E9'
        }
    }

    const name = typeof value === 'string' ? value : value.name
    const id = typeof value === 'string' ? value : value.id

    return (
        <div style={styles.container}>
            {typeof value !== 'string' && <img src={value.image} style={styles.img} />}
            {name}
            <button type='button' style={styles.button} onClick={() => removeChip(id)}>&times;</button>
        </div>
    )
}