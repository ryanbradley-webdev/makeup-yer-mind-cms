export const getWindowWidth = () => {
    const { innerWidth } = window
    return innerWidth
}

export const titleCase = (string: string) => {
    const words = string.split(' ')
    words.forEach((word, index) => {
        const letters = word.split('')
        letters[0] = letters[0].toUpperCase()
        words[index] = letters.join('')
    })
    return words.join(' ')
}

export const generateBtnBackground = (variant: string | undefined) => {
    switch (variant) {
        case 'red':
            return 'linear-gradient(#F54343, #D32A2A)'
        case 'blue':
            return 'linear-gradient(#43B5F5, #2F9BD8)'
        default:
            return 'linear-gradient(#F2F2F2, #C8C8C8)'
    }
}

export const generateBtnColor = (variant: string | undefined) => {
    switch (variant) {
        case 'red':
        case 'blue':
            return '#FFFFFF'
        default:
            return '#121212'
    }
}

export const slugify = (title: string) => {
    const wordArr = title.split(' ')

    let slugifiedArr = wordArr.map(word => {
        let newWord = word.replaceAll(':', '')

        newWord = newWord.replaceAll(';', '')

        newWord = newWord.replaceAll('#', '')

        newWord = newWord.replaceAll('&', '')

        newWord = newWord.replaceAll('$', '')

        newWord = newWord.replaceAll('*', '')

        newWord = newWord.replaceAll('@', '')

        newWord = newWord.replaceAll("'", '')

        return newWord.toLowerCase()
    })

    return slugifiedArr.join('-')
}