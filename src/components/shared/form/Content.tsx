import { Dispatch, SetStateAction, useRef, useState } from 'react'
import Modal from '../Modal'
import styles from './form.module.css'
import FormBtn from './FormBtn'
import TinyBtn from '../TinyBtn'
import { v4 as uuid } from 'uuid'

type ContentProps = {
    value: string,
    handleChange: (arg: string) => void
}

// this component combines the textarea input for article content with a markdown utility bar
// the utility bar provides modals to generate different types of markdown and semantic HTML syntax
export default function Content({ value, handleChange }: ContentProps) {
    const [linkModalVisible, setLinkModalVisible] = useState<boolean>(false)
    const [linkURL, setLinkURL] = useState<string>('')
    const [linkDisplay, setLinkDisplay] = useState<string>('')
    const [imageModalVisible, setImageModalVisible] = useState<boolean>(false)
    const [imageURL, setImageURL] = useState<string>('')
    const [imageDisplay, setImageDisplay] = useState<string>('')
    const [videoModalVisible, setVideoModalVisible] = useState<boolean>(false)
    const [videoURL, setVideoURL] = useState<string>('')
    const [btnModalVisible, setBtnModalVisible] = useState<boolean>(false)
    const [btnUrl, setbtnURL] = useState<string>('')
    const [btnDisplay, setBtnDisplay] = useState<string>('')
    const [headingModalVisible, setHeadingModalVisible] = useState<boolean>(false)
    const [headingText, setHeadingText] = useState<string>('')
    const [headingLevel, setHeadingLevel] = useState<number>(2)
    const [boldModalVisible, setBoldModalVisible] = useState<boolean>(false)
    const [boldText, setBoldText] = useState<string>('')
    const [italicModalVisible, setItalicModalVisible] = useState<boolean>(false)
    const [italicText, setItalicText] = useState<string>('')
    const [ulModalVisible, setUlModalVisible] = useState<boolean>(false)
    const [ulListItems, setUlListItems] = useState<string[]>([])
    const [olModalVisible, setOlModalVisible] = useState<boolean>(false)
    const [olListItems, setOlListItems] = useState<string[]>([])

    const linkRef = useRef(null)
    const imageRef = useRef(null)
    const videoRef = useRef(null)
    const btnRef = useRef(null)
    const headingRef = useRef(null)
    const boldRef = useRef(null)
    const italicRef = useRef(null)
    const ulItemRef = useRef(null)
    const ulRef = useRef(null)
    const olItemRef = useRef(null)
    const olRef = useRef(null)


    const localStyles = {
        heading: {
            fontFamily: 'Times New Roman',
        },
        bold: {
            fontWeight: 'bold',
        },
        italic: {
            fontFamily: 'Times New Roman',
            fontStyle: 'italic'
        },
        markdown: {
            backgroundColor: 'var(--color-medium-grey)',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            maxWidth: '70ch',
            wordWrap: 'break-word' as 'break-word'
        },
        btnDiv: {
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem'
        }
    }

    // modular function to toggle a modal based on supplied state and associated setter function
    function toggleModal(state: boolean, setState: Dispatch<SetStateAction<boolean>>) {
        setState(!state)
    }

    // modular function to update markdown state using supplied state and associated setter function
    function updateMarkdown(text: string, setState: Dispatch<SetStateAction<string>>) {
        setState(text)
    }

    // generates the markdown for desired heading based on selected heading level
    function generateHeadingMarkdown() {
        let heading = ''

        // prefix heading with octothorps according to heading level
        for (let i = 0; i < headingLevel; i++) {
            heading += '#'
        }

        // return heading prefix with heading text from state
        return `\n\n${heading} ${headingText}`
    }

    // updates heading level state with selected level converted to number
    function updateHeadingLevel(level: string) {
        setHeadingLevel(Number(level))
    }

    // adds a list item to either ordered or unordered list
    // function is modularized by taking in the appropriate input ref and setState action so it can be supplied to both
    // the ordered and unordered list components
    function addListItem(ref: React.RefObject<HTMLInputElement>, setState: Dispatch<SetStateAction<string[]>>) {
        // first get the value of the supplied input ref
        const newItem = ref.current?.value

        // if no value exists, bail
        if (!newItem) return

        // update state with the supplied setter and reset input
        setState(prev => [...prev, newItem])
        ref.current.value = ''
    }

    // removes list item from supplied state
    function removeListItem(item: string, setState: Dispatch<SetStateAction<string[]>>) {
        setState(prev => prev.filter(prevItem => prevItem !== item))
    }

    // generates markdown for the desired list type
    // function is modularized to allow for both ordered and unordered lists
    function generateList(type: string) {
        // first check supplied type to pull from the correct state
        const list = type === 'ul' ? ulListItems : olListItems

        // prefix list with newline characters to ensure markdown can be correctly interpreted on the backend
        let listStr = '\n\n'

        // append each list item
        list.forEach((item, idx) => {
            // determines the appropriate list style for each item based on list type
            const listMark = type === 'ul' ? '- ' : `${idx + 1}. `

            // add list item to markdown string prefixed by the style mark
            listStr += listMark + item

            // if the item is not the last item in the list, newline characters in preparation for the next item
            if (idx < list.length - 1) listStr += '\n\n'
        })

        // return the completed markdown string
        return listStr
    }

    // copies the desired markdown to clipboard to paste in the textarea input
    function copyText(ref: React.RefObject<HTMLParagraphElement>) {
        // first get the value of the supplied ref
        const text = ref.current?.textContent

        // if no value exists, bail
        if (!text) return

        // copy text to clipboard and alert user of success
        navigator.clipboard.writeText(text)
        alert('Markdown copied!')
    }

    return (
        <div className={styles.content_container}>
            
            <textarea
                name="content"
                id="content"
                cols={30}
                rows={10}
                value={value}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(e.target.value)} 
                required>
            </textarea>

            <div className={styles.content}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => toggleModal(linkModalVisible, setLinkModalVisible)}>
                    <title>Link</title>
                    <path d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => toggleModal(imageModalVisible, setImageModalVisible)}>
                    <title>Image</title>
                    <path d="M19,19H5V5H19M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M13.96,12.29L11.21,15.83L9.25,13.47L6.5,17H17.5L13.96,12.29Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => toggleModal(videoModalVisible, setVideoModalVisible)}>
                    <title>Video</title>
                    <path d="M20.84 2.18L16.91 2.96L19.65 6.5L21.62 6.1L20.84 2.18M13.97 3.54L12 3.93L14.75 7.46L16.71 7.07L13.97 3.54M9.07 4.5L7.1 4.91L9.85 8.44L11.81 8.05L9.07 4.5M4.16 5.5L3.18 5.69A2 2 0 0 0 1.61 8.04L2 10L6.9 9.03L4.16 5.5M2 10V20C2 21.11 2.9 22 4 22H20C21.11 22 22 21.11 22 20V10H2Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => toggleModal(btnModalVisible, setBtnModalVisible)}>
                    <title>Button</title>
                    <path d="M20 20.5C20 21.3 19.3 22 18.5 22H13C12.6 22 12.3 21.9 12 21.6L8 17.4L8.7 16.6C8.9 16.4 9.2 16.3 9.5 16.3H9.7L12 18V9C12 8.4 12.4 8 13 8S14 8.4 14 9V13.5L15.2 13.6L19.1 15.8C19.6 16 20 16.6 20 17.1V20.5M20 2H4C2.9 2 2 2.9 2 4V12C2 13.1 2.9 14 4 14H8V12H4V4H20V12H18V14H20C21.1 14 22 13.1 22 12V4C22 2.9 21.1 2 20 2Z" />
                </svg>
                <div title='Heading' style={localStyles.heading} onClick={() => toggleModal(headingModalVisible, setHeadingModalVisible)}>
                    T
                </div>
                <div title='Bold' style={localStyles.bold} onClick={() => toggleModal(boldModalVisible, setBoldModalVisible)}>
                    B
                </div>
                <div title='Italic' style={localStyles.italic} onClick={() => toggleModal(italicModalVisible, setItalicModalVisible)}>
                    I
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => toggleModal(ulModalVisible, setUlModalVisible)}>
                    <title>Unordered List</title>
                    <path d="M21,19V17H8V19H21M21,13V11H8V13H21M8,7H21V5H8V7M4,5V7H6V5H4M3,5A1,1 0 0,1 4,4H6A1,1 0 0,1 7,5V7A1,1 0 0,1 6,8H4A1,1 0 0,1 3,7V5M4,11V13H6V11H4M3,11A1,1 0 0,1 4,10H6A1,1 0 0,1 7,11V13A1,1 0 0,1 6,14H4A1,1 0 0,1 3,13V11M4,17V19H6V17H4M3,17A1,1 0 0,1 4,16H6A1,1 0 0,1 7,17V19A1,1 0 0,1 6,20H4A1,1 0 0,1 3,19V17Z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() => toggleModal(olModalVisible, setOlModalVisible)}>
                    <title>Ordered List</title>
                    <path d="M7,13V11H21V13H7M7,19V17H21V19H7M7,7V5H21V7H7M3,8V5H2V4H4V8H3M2,17V16H5V20H2V19H4V18.5H3V17.5H4V17H2M4.25,10A0.75,0.75 0 0,1 5,10.75C5,10.95 4.92,11.14 4.79,11.27L3.12,13H5V14H2V13.08L4,11H2V10H4.25Z" />
                </svg>
            </div>

            <Modal isVisible={linkModalVisible}>

                <div>
                    <label>Enter URL</label>
                    <input
                        form='no-form'
                        type="text"
                        onChange={(e) => updateMarkdown(e.target.value, setLinkURL)}
                    />
                    <p className={styles.subtext}>
                        If the URL is to an external site (e.g. a Seint product) use the full URL (e.g. &apos;https://seintofficial.com&apos;)
                    </p>
                    <p className={styles.subtext}>
                        If the URL is to another page on your site, use a slash followed by the specific route (e.g. &apos;/makeup-consultation&apos;)
                    </p>
                </div>

                <div>
                    <label>Enter display text</label>
                    <input
                        form='no-form'
                        type="text"
                        onChange={(e) => updateMarkdown(e.target.value, setLinkDisplay)}
                    />
                </div>

                <div>
                    <label>Markdown:</label>
                    <p style={localStyles.markdown} ref={linkRef}>{`[${linkDisplay}](${linkURL})`}</p>
                </div>

                <div style={localStyles.btnDiv}>
                    <FormBtn onClick={() => toggleModal(linkModalVisible, setLinkModalVisible)}>
                        Close
                    </FormBtn>
                    <FormBtn onClick={() => copyText(linkRef)}>
                        Copy text
                    </FormBtn>
                </div>

            </Modal>

            <Modal isVisible={imageModalVisible}>

                <div>
                    <label>Enter URL</label>
                    <input
                        form='no-form'
                        type="text"
                        onChange={(e) => updateMarkdown(e.target.value, setImageURL)}
                    />
                </div>

                <div>
                    <label>Enter alt text</label>
                    <input
                        form='no-form'
                        type="text"
                        onChange={(e) => updateMarkdown(e.target.value, setImageDisplay)}
                    />
                </div>

                <div>
                    <label>Markdown:</label>
                    <p style={localStyles.markdown} ref={imageRef}>{`\n\n![${imageDisplay}](${imageURL})`}</p>
                </div>

                <div style={localStyles.btnDiv}>
                    <FormBtn onClick={() => toggleModal(imageModalVisible, setImageModalVisible)}>
                        Close
                    </FormBtn>
                    <FormBtn onClick={() => copyText(imageRef)}>
                        Copy text
                    </FormBtn>
                </div>

            </Modal>

            <Modal isVisible={videoModalVisible}>

                <div>
                    <label>Enter URL</label>
                    <input
                        form='no-form'
                        type="text"
                        onChange={(e) => updateMarkdown(e.target.value, setVideoURL)}
                    />
                </div>

                <div>
                    <label>Markdown:</label>
                    <p 
                        style={localStyles.markdown} 
                        ref={videoRef}
                    >
                        {`\n\n<video src='${videoURL}' controls></video>`}
                    </p>
                </div>

                <div style={localStyles.btnDiv}>
                    <FormBtn onClick={() => toggleModal(videoModalVisible, setVideoModalVisible)}>
                        Close
                    </FormBtn>
                    <FormBtn onClick={() => copyText(videoRef)}>
                        Copy text
                    </FormBtn>
                </div>

            </Modal>

            <Modal isVisible={btnModalVisible}>

                <div>
                    <label>Enter URL</label>
                    <input
                        form='no-form'
                        type="text"
                        onChange={(e) => updateMarkdown(e.target.value, setbtnURL)}
                    />
                    <p className={styles.subtext}>
                        If the URL is to an external site (e.g. a Seint product) use the full URL (e.g. &apos;https://seintofficial.com&apos;)
                    </p>
                    <p className={styles.subtext}>
                        If the URL is to another page on your site, use a slash followed by the specific route (e.g. &apos;/makeup-consultation&apos;)
                    </p>
                </div>

                <div>
                    <label>Enter button text</label>
                    <input
                        form='no-form'
                        type="text"
                        onChange={(e) => updateMarkdown(e.target.value, setBtnDisplay)}
                    />
                </div>

                <div>
                    <label>Markdown:</label>
                    <p
                        style={localStyles.markdown}
                        ref={btnRef}
                    >
                        {`\n\n<a href='${btnUrl}'><button type='button'>${btnDisplay}</button></a>`}
                    </p>
                </div>

                <div style={localStyles.btnDiv}>
                    <FormBtn onClick={() => toggleModal(btnModalVisible, setBtnModalVisible)}>
                        Close
                    </FormBtn>
                    <FormBtn onClick={() => copyText(btnRef)}>
                        Copy text
                    </FormBtn>
                </div>

            </Modal>

            <Modal isVisible={headingModalVisible}>

                <div>
                    <label>Heading Level</label>
                    <select form='no-form' onChange={(e) => updateHeadingLevel(e.target.value)}>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>

                <div>
                    <label>Enter Heading Text</label>
                    <input
                        form='no-form'
                        type="text"
                        onChange={(e) => updateMarkdown(e.target.value, setHeadingText)}
                    />
                </div>

                <div>
                    <label>Markdown:</label>
                    <p 
                        style={localStyles.markdown} 
                        ref={headingRef}
                    >
                        {generateHeadingMarkdown()}
                    </p>
                </div>

                <div style={localStyles.btnDiv}>
                    <FormBtn onClick={() => toggleModal(headingModalVisible, setHeadingModalVisible)}>
                        Close
                    </FormBtn>
                    <FormBtn onClick={() => copyText(headingRef)}>
                        Copy text
                    </FormBtn>
                </div>

            </Modal>

            <Modal isVisible={boldModalVisible}>

                <div>
                    <label>Enter Bold Text</label>
                    <input
                        form='no-form'
                        type="text"
                        onChange={(e) => updateMarkdown(e.target.value, setBoldText)}
                    />
                </div>

                <div>
                    <label>Markdown:</label>
                    <p
                        style={localStyles.markdown}
                        ref={boldRef}
                    >
                        {`**${boldText}**`}
                    </p>
                </div>

                <div style={localStyles.btnDiv}>
                    <FormBtn onClick={() => toggleModal(boldModalVisible, setBoldModalVisible)}>
                        Close
                    </FormBtn>
                    <FormBtn onClick={() => copyText(boldRef)}>
                        Copy text
                    </FormBtn>
                </div>

            </Modal>

            <Modal isVisible={italicModalVisible}>

                <div>
                    <label>Enter Italic Text</label>
                    <input
                        form='no-form'
                        type="text"
                        onChange={(e) => updateMarkdown(e.target.value, setItalicText)}
                    />
                </div>

                <div>
                    <label>Markdown:</label>
                    <p
                        style={localStyles.markdown}
                        ref={italicRef}
                    >
                        {`*${italicText}*`}
                    </p>
                </div>

                <div style={localStyles.btnDiv}>
                    <FormBtn onClick={() => toggleModal(italicModalVisible, setItalicModalVisible)}>
                        Close
                    </FormBtn>
                    <FormBtn onClick={() => copyText(italicRef)}>
                        Copy text
                    </FormBtn>
                </div>

            </Modal>

            <Modal isVisible={ulModalVisible}>

                <div>
                    <label>Enter List Item</label>
                    <input form='no-form' type="text" ref={ulItemRef} />
                    <TinyBtn onClick={() => addListItem(ulItemRef, setUlListItems)}>
                        &#43;
                    </TinyBtn>
                </div>

                <div>
                    <label>List Items</label>
                    {ulListItems.map(item => (
                        <p key={uuid()}>
                            <TinyBtn onClick={() => removeListItem(item, setUlListItems)}>
                                &times;
                            </TinyBtn>
                            {item}
                        </p>
                    ))}
                </div>

                <div>
                    <label>Markdown:</label>
                    <p style={localStyles.markdown} ref={ulRef}>{generateList('ul')}</p>
                </div>

                <div style={localStyles.btnDiv}>
                    <FormBtn onClick={() => toggleModal(ulModalVisible, setUlModalVisible)}>
                        Close
                    </FormBtn>
                    <FormBtn onClick={() => copyText(ulRef)}>
                        Copy text
                    </FormBtn>
                </div>

            </Modal>

            <Modal isVisible={olModalVisible}>

                <div>
                    <label>Enter List Item</label>
                    <input form='no-form' type="text" ref={olItemRef} />
                    <TinyBtn onClick={() => addListItem(olItemRef, setOlListItems)}>
                        &#43;
                    </TinyBtn>
                </div>

                <div>
                    <label>List Items</label>
                    {ulListItems.map(item => (
                        <p key={uuid()}>
                            <TinyBtn onClick={() => removeListItem(item, setOlListItems)}>
                                &times;
                            </TinyBtn>
                            {item}
                        </p>
                    ))}
                </div>

                <div>
                    <label>Markdown:</label>
                    <p style={localStyles.markdown} ref={olRef}>{generateList('ol')}</p>
                </div>

                <div style={localStyles.btnDiv}>
                    <FormBtn onClick={() => toggleModal(olModalVisible, setOlModalVisible)}>
                        Close
                    </FormBtn>
                    <FormBtn onClick={() => copyText(olRef)}>
                        Copy text
                    </FormBtn>
                </div>

            </Modal>

        </div>
    )
}