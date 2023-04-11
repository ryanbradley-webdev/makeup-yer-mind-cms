import { useContext, useState } from 'react'
import DataContext from '../../contexts/DataContext'
import Chip from '../shared/Chip'
import { titleCase } from '../../util/functions'
import FormBtn from '../shared/form/FormBtn'
import styles from './looks.module.css'

type AddColorProps = {
    setIsVisible: (arg: boolean) => void,
    addColor: (arg: Color) => void
}

export default function AddColor({ setIsVisible, addColor }: AddColorProps) {
    const { allColors } = useContext(DataContext) as Firestore
    const [params, setParams] = useState('')
    const [filteredColors, setFilteredColors] = useState(allColors)
    const [selectedColor, setSelectedColor] = useState<Color | null>()

    const localStyles = {
        listItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
            padding: '2px 5px',
            borderBottom: '1px solid #D9D9D9'
        },
        brand: {
            fontSize: '0.75em',
            color: '#DDDDDD'
        }
    }

    function filterColors(params: string) {
        setParams(params)
        setFilteredColors(allColors.filter((color: Color) => color.name.toLowerCase().includes(params.toLowerCase())))
    }

    function selectColor(color: Color) {
        setParams('')
        setSelectedColor(color)
    }

    function handleSubmit() {
        if (!selectedColor) return
        addColor(selectedColor)
        closeModal()
    }

    function closeModal() {
        setParams('')
        setSelectedColor(null)
        setIsVisible(false)
    }

    return (
        <>
            <h4>Add a New Color</h4>
            <label htmlFor="search">Search:</label>
            <input type="text" name='search' id='search' value={params} onChange={(e) => filterColors(e.target.value)} />
            {params !== '' && (
                <div className={styles.list}>
                    {filteredColors.map((color: Color) => (
                        <div 
                            key={color.id} 
                            style={localStyles.listItem} 
                            onClick={() => selectColor(color)}
                        >
                            {color.name} <span style={localStyles.brand}>{titleCase(color.brand)}</span>
                        </div>
                    ))}
                </div>
            )}
            {selectedColor && <Chip value={selectedColor} removeChip={() => setSelectedColor(null)} />}
            <div className='modal-btn-div'>
                <FormBtn variant='red' onClick={closeModal}>Cancel</FormBtn>
                <FormBtn onClick={handleSubmit}>Add</FormBtn>
            </div>
        </>
    )
}