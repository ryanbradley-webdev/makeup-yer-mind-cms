import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { useState } from 'react'

const storage = getStorage()

async function downloadImg(imagePath: string) {
    const imageRef = ref(storage, `${imagePath}`)

    return await getDownloadURL(imageRef)
                    .then(url => url)
}

export async function uploadImg(imagePath: string, imageName: string, file: File) {
  const imageRef = ref(storage, `${imagePath}/${imageName}`)
  return await uploadBytesResumable(imageRef, file)
                  .then(async () => {
                    return await getDownloadURL(imageRef).then(url => url)
                  })
                  .catch(() => 'error')
}