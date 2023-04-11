import React from 'react'
import LoadingSpinner from './LoadingSpinner'
import styles from './form.module.css'
import ImagePlusIcon from '../../../assets/ImagePlusIcon'

type ImgUploaderProps = {
    uploadImg: (img: File, number: number | null) => void,
    isLoading: boolean,
    name: string,
    children: string,
    number: number | null,
    img: string
}

export default function ImgUploader({ uploadImg, isLoading, name, children, number = null, img }: ImgUploaderProps) {
    function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) uploadImg(e.target.files[0], number)
    }

    return (
                <label htmlFor={name} className={styles.imgUploader}>
                    {children}
                    <input type='file' name={name} id={name} accept='image/*' onChange={handleUpload} required />
                    <div style={{ position: 'relative' }}>
                        {img && !isLoading && 
                            <>
                                <img src={img} alt='' />
                                <div className={styles.thumbnail}>
                                    Change Image
                                </div>
                            </>
                        }
                        {isLoading && <LoadingSpinner />}
                        {!img && !isLoading &&
                            <>
                                <ImagePlusIcon />
                                <p>Choose an image</p>
                            </>
                        }
                    </div>
                </label>
    )
}