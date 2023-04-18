import { useContext, useState } from 'react'
import DataContext from '../../contexts/DataContext'
import Chip from '../shared/Chip'
import { titleCase } from '../../util/functions'
import FormBtn from '../shared/form/FormBtn'
import styles from './looks.module.css'
import { v4 as uuid } from 'uuid'

type AddColorProps = {
    setIsVisible: (arg: boolean) => void,
    addColors: (arg: Color[]) => void
}

export default function AddColor({ setIsVisible, addColors }: AddColorProps) {
    const { allColors } = useContext(DataContext) as Firestore
    const [params, setParams] = useState('')
    const [filteredColors, setFilteredColors] = useState(allColors)
    const [selectedColors, setSelectedColors] = useState<Color[]>([])

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
        // update search parameter state
        setParams(params)

        // apply search parameters to all stored colors and display list of resulting colors
        setFilteredColors(allColors.filter((color: Color) => {
            return color.name.toLowerCase().includes(params.toLowerCase())
        }))
    }

    function selectColor(color: Color) {
        setSelectedColors(prevColors => [ ...prevColors, color ])
        setParams('')
    }

    function deselectColor(id: string) {
        setSelectedColors(prevColors => prevColors.filter(color => color.id !== id))
    }

    function handleSubmit() {
        // if no colors have been selected, bail
        if (selectedColors.length === 0) return

        // add the selected colors to the look state and close the modal
        addColors(selectedColors)
        closeModal()
    }

    function closeModal() {
        // reset all modal parameters to initial values and hide modal
        setParams('')
        setSelectedColors([])
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

            {selectedColors && selectedColors.map(color => (

                <Chip 
                    value={color}
                    removeChip={deselectColor}
                    key={uuid()}
                />
                
            ))}

            <div className='modal-btn-div'>

                <FormBtn variant='red' onClick={closeModal}>Cancel</FormBtn>

                <FormBtn onClick={handleSubmit}>Add</FormBtn>

            </div>
        </>
    )
}