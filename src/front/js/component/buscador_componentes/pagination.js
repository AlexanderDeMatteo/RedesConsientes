import React, { useState, useContext, useEffect } from "react";
import {Pagination, Button} from "@nextui-org/react";


export const Pagination2 = ({ currentPage, setCurrentPage, totalPerPage, psicologyPerPage}) => {
    
    console.log(totalPerPage)
 
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPerPage/ psicologyPerPage); i++) {
        pageNumbers.push(i)
    }
    const totalPageFinal = pageNumbers.length
    console.log(totalPageFinal)

    

    return (
        <>
            <div className="d-flex justify-content-center">
     
    
                <Pagination
                    initialPage={currentPage}
                    total={totalPageFinal}
                    color="secondary"
                    isCompact 
                    showControls
                    // page={currentPage}
                    onChange={setCurrentPage}
                />
      
            </div>
            
        </>

    )
}
