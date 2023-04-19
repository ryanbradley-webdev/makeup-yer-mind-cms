import { useNavigate } from "react-router-dom"
import CardBtn from "./CardBtn"
import styles from './card.module.css'
import ImageIcon from "../../../assets/ImageIcon"
import EyeIcon from "../../../assets/EyeIcon"
import HeartIcon from "../../../assets/HeartIcon"
import CommentIcon from "../../../assets/CommentIcon"
import { CSSProperties, useState, useContext } from "react"
import Modal from "../Modal"
import FormBtn from "../form/FormBtn"
import DataContext from "../../../contexts/DataContext"
import { titleCase } from "../../../util/functions"

type CardProps = {
    type: string,
    content: Blog | Look,
    id: string,
    image: string,
    image2?: string
}

export default function Card({ type, content, id, image, image2 }: CardProps) {
    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false)

    const { deleteArticle } = useContext(DataContext) as Firestore

    const navigate = useNavigate()

    const date = () => {
        if (content.draft) return null
        const timestamp = content.updatedAt ? content.updatedAt.seconds : content.createdAt.seconds
        const date = new Date(timestamp * 1000).toLocaleDateString()
        return (
            <h5>
                <span>
                    {content.updatedAt ? 'Updated: ' : 'Posted: '}
                </span>
                {date}
            </h5>
        )
    }

    const localStyles = {
        placeholder: {
            width: '300px',
            height: '100%',
            display: 'grid',
            placeItems: 'center',
            backgroundColor: '#636363'
        },
        singleImgContainer: {
            display: 'flex',
            width: '300px',
            height: 'fit-content'
        },
        singleImg: {
            height: '152px',
            width: '300px',
            objectFit: 'cover' as CSSProperties['objectFit']
        },
        doubleImgContainer: {
            display: 'flex',
            height: 'fit-content'
        },
        doubleImg: {
            width: '150px',
            height: '152px',
            objectFit: 'cover' as CSSProperties['objectFit']
        },
        span: {
            fontWeight: 'bold',
            color: 'white'
        }
    }

    // generate image card image layout depending on whether one or two images are present (blog vs look)
    // first check if second image exists
    const cardImage = image2 ? (
        // if second image URL exists, generate a two-image container
        <div style={localStyles.doubleImgContainer}>
            <img src={image} alt="" style={localStyles.doubleImg} />
            <img src={image2} alt="" style={localStyles.doubleImg} />
        </div>
    ) : (
        // otherwise generate a single-image container
        <div style={localStyles.singleImgContainer}>
            <img src={image} alt="" style={localStyles.singleImg} />
        </div>
    )

    // if no image exists, generate a placeholder of defined dimensions for UI consistency
    const cardImagePlaceholder = (
        <div className={styles.placeholder}>
            <ImageIcon/>
        </div>
    )

    function toggleDeleteModal() {
        setDeleteModalVisible(!deleteModalVisible)
    }

    // deletes target article from database
    function handleDeleteArticle() {
        deleteArticle(id, `${type}s`)
            // if successful, close the delete modal
            // TODO add success UI
            .then(() => toggleDeleteModal())
            //if failure, log result to console
            // TODO add error handling UI
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.card}>

            <div className={styles.img_container}>

                {image === '' ? cardImagePlaceholder : cardImage}

                <div className={styles.card_info}>

                    <h3 className={styles.title}>{content.title}</h3>
                    {
                        content.draft
                        ?
                        <span className={styles.draft}>Draft</span>
                        :
                        <>
                        {!content.draft && date()}
                        <div className={styles.details}>

                            <span>
                                <EyeIcon /> 
                                Views: 
                                <span style={localStyles.span}>
                                    {content.views}
                                </span>
                            </span>

                            <span>
                                <HeartIcon /> 
                                Likes: 
                                <span style={localStyles.span}>
                                    {content.likes}
                                </span>
                            </span>

                            <span>
                                <CommentIcon /> 
                                Comments: 
                                <span style={localStyles.span}>
                                    {content.comments.length}
                                </span>
                            </span>

                        </div>
                        </>
                    }
                </div>

            </div>

            <div className={styles.btn_div}>

                <CardBtn variant="edit" handleClick={() => navigate(`${content.id}`)} />
                <CardBtn variant="delete" handleClick={toggleDeleteModal} />

            </div>

            <Modal isVisible={deleteModalVisible}>

                <h3>Delete This {titleCase(type)}?</h3>

                <h5>There's no going back...</h5>

                <div className='modal-btn-div'>

                    <FormBtn onClick={toggleDeleteModal}>Cancel</FormBtn>
                    <FormBtn variant='red' onClick={handleDeleteArticle}>Delete</FormBtn>
                    
                </div>

            </Modal>

        </div>
    )
}