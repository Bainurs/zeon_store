export default function pagination(pagesQuantity, currentPage, oldPage) {

    let limit = 3
    let limit2 = 4
    let max = 5
    if (window.innerWidth <= 370) {
        limit = 2
        limit2 = 3
        max = 4
    }

    let pagesArray = []
    pagesArray.push(currentPage)

    if (currentPage > oldPage || !oldPage || currentPage === 1) {
        for (let i=currentPage - 1; i > 0 && pagesArray.length < limit; i--) {
            pagesArray.unshift(i)
        }
        for (let i=currentPage + 1; i < pagesQuantity && pagesArray.length < limit2; i++) {
            pagesArray.push(i)
        }
    } else {
        for (let i=currentPage + 1; i < pagesQuantity && pagesArray.length < limit; i++) {
            pagesArray.push(i)
        }
        for (let i=currentPage - 1; i > 0 && pagesArray.length < limit2; i--) {
            pagesArray.unshift(i)
        }
    }
    if (pagesQuantity -2 > currentPage && pagesArray[pagesArray.length -1] +1 !== pagesQuantity) {
        // pagesArray.splice(-2, 1)
        pagesArray.push('...')
    }
    if (currentPage !== pagesQuantity) {
        pagesArray.push(pagesQuantity)
    }
    for (let i=pagesArray[0] - 1; pagesArray.length < max && i !== 0; i--) {
        pagesArray.unshift(i)
    }

    return pagesArray
}

