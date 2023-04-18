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

    // determine the display name of the chip
    // if the supplied content is from the 'tag' or 'topic' form sections, the input will be a string
    // if the supplied content is of type Color, the name property of the Color object will be used
    const name = typeof value === 'string' ? value : value.name

    // id is determined similarly to name, except the id property of the Color object is used
    const id = typeof value === 'string' ? value : value.id

    return (
        <div style={styles.container}>

            {
                // if a Color object is supplied, an image is rendered using the img property URL
                typeof value !== 'string' && <img src={value.image} style={styles.img} />
            }

            {name}

            <button 
                type='button' 
                style={styles.button} 
                onClick={() => removeChip(id)}
            >
                &times;
            </button>

        </div>
    )
}