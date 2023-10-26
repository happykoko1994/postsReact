export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit)
}

export const getPagesArray = (totalPages) => {
    let resaul = []
    for (let i = 0; i < totalPages; i++) {
        resaul.push(i + 1)
    }
    return resaul
}

