import React from 'react'
import LoadingSpinner from './LoadingSpinner'
import styles from './form.module.css'
import ImagePlusIcon from '../../../assets/ImagePlusIcon'

type ImgUploaderProps = {
    uploadImg: (img: File, number: number | undefined) => void,
    isLoading: boolean,
    name: string,
    children: string,
    number?: number,
    img: string,
    single?: boolean
}

export default function ImgUploader({ uploadImg, isLoading, name, children, number, img, single }: ImgUploaderProps) {
    function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) uploadImg(e.target.files[0], number)
    }

    return (
        <label htmlFor={name} className={styles.imgUploader}>

            {children}

            <input type='file' name={name} id={name} accept='image/*' onChange={handleUpload} />

            <div 
                style={{ 
                    position: 'relative',
                    width: single ? '300px' : '150px'
                }}
            >

                {
                    // if image is supplied, render the image
                    img && !isLoading && 
                    <>
                        <img src={img} alt='' />
                        <div className={styles.thumbnail}>
                            Change Image
                        </div>
                    </>
                }

                {
                    // if image is in loading state (uploading to database) render loading UI
                    isLoading && <LoadingSpinner />
                }

                {
                    // if no image URL exists and no upload in progress, render placeholder
                    !img && !isLoading &&
                    <>
                        <ImagePlusIcon />
                        <p>Choose an image</p>
                    </>
                }

            </div>

        </label>
    )
}