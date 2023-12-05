import React from 'react'


export const Pagination = ({ currentPage, setCurrentPage, psicologytotal, psicologyPerPage }) => {

    const pageNumbers = []


    for (let i = 1; i <= Math.ceil(psicologytotal / psicologyPerPage); i++) {
        pageNumbers.push(i)
    }

    const onPreviosPage = () => {
        if (currentPage > 1) {

            setCurrentPage(currentPage - 1)
        }
    }

    const onNextPage = () => {
        if (currentPage < pageNumbers.length) {
            setCurrentPage(currentPage + 1)
        }
    }
    console.log(currentPage)
    const onSpecificPage = (e) => {
        setCurrentPage(e)
    }

    return (
        <>
            <nav class="pagination is-centered" role="navigation" aria-label="pagination">
                <button className={`pagination-previous ${currentPage === 1 ? "is-disabled" : ""}`} onClick={onPreviosPage}>Anterior</button>
                <button className={`pagination-next ${currentPage >= pageNumbers.length ? "is-disabled" : ""}`} onClick={onNextPage}>Siguiente</button>
                {/* <button className={`button is-info ${currentPage === 1 ? "is-disabled" : ""}`} onClick={onPreviosPage}>Anterior</button> */}
                <ul className="pagination-list">


                    {pageNumbers.map(noPage => (
                        <li key={noPage}>
                            <a onClick={() => onSpecificPage(noPage)}
                                className={`pagination-link ${noPage === currentPage ? "is-current" : ""}`}>{noPage}</a>
                        </li>
                    ))}


                </ul>
            </nav>
        </>

    )
}
