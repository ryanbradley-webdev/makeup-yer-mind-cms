import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

const storage = getStorage()

export async function uploadImg(imagePath: string, imageName: string, file: File) {
  const imageRef = ref(storage, `${imagePath}/${imageName}`)
  return await uploadBytesResumable(imageRef, file)
                  .then(async () => {
                    return await getDownloadURL(imageRef).then(url => url)
                  })
                  .catch(() => 'error')
}

// TODO consolidate function into DataContext