import React from 'react'  
import ReligionForm from "./religionForm"
 

function Religion({match}) {

 console.log(match.params.id)
    return (
    <>
 
             <ReligionForm
             id={match.params.id}
             type={match.params.type}
               />
 
     </>
    )
}

export default Religion
