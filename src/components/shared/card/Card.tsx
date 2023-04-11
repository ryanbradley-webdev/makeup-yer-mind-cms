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

    const { deleteBlog, deleteLook } = useContext(DataContext) as Firestore

    const navigate = useNavigate()

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
            width: '150px'
        }
    }

    const cardImage = image2 ? (
        <div style={localStyles.doubleImgContainer}>
            <img src={image} alt="" style={localStyles.doubleImg} />
            <img src={image2} alt="" style={localStyles.doubleImg} />
        </div>
    ) : <div style={localStyles.singleImgContainer}>
            <img src={image} alt="" style={localStyles.singleImg} />
        </div>

    const cardImagePlaceholder = (
        <div className={styles.placeholder}>
            <ImageIcon/>
        </div>
    )

    function toggleDeleteModal() {
        setDeleteModalVisible(!deleteModalVisible)
    }

    function deleteArticle() {
        if (type === 'blog') deleteBlog(id)
                                .then(() => toggleDeleteModal())
                                .catch(err => console.log(err))
        if (type === 'look') deleteLook(id)
                                .then(() => toggleDeleteModal())
                                .catch(err => console.log(err))
    }

    return (
        <div className={styles.card}>
            <div className={styles.img_container}>
                {image === '' ? cardImagePlaceholder : cardImage}
                <div className={styles.card_info}>
                    <h3 className={styles.title}>{content.title}</h3>
                    {
                        content.draft ?
                        <span className={styles.draft}>Draft</span> : 
                        <div className={styles.details}>
                            <span>
                                <EyeIcon /> 
                                Views: 
                                <span style={{ fontWeight: 'bold', color: 'white' }}>
                                    {content.views}
                                </span>
                            </span>
                            <span>
                                <HeartIcon /> 
                                Likes: 
                                <span style={{ fontWeight: 'bold', color: 'white' }}>
                                    {content.likes}
                                </span>
                            </span>
                            <span>
                                <CommentIcon /> 
                                Comments: 
                                <span style={{ fontWeight: 'bold', color: 'white' }}>
                                    {content.comments.length}
                                </span>
                            </span>
                        </div>
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
                    <FormBtn variant='red' onClick={deleteArticle}>Delete</FormBtn>
                </div>
            </Modal>
        </div>
    )
}