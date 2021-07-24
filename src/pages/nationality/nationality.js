import React from 'react'
 
import NationalityForm from "./nationalityForm"
  

function Nationality({match}) {
 console.log(match.params.id)
    return (
    <>
   
   
             <NationalityForm
             id={match.params.id} 
             type={match.params.type}
           />
       
     </>
    )
}

export default Nationality
