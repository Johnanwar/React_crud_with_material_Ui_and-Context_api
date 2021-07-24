import React from 'react'
 import UntsHusbandForm from "./untsHusbandForm"
 

function UntsHusband({match}) {
    return (
    <>
   
         
 
     
             <UntsHusbandForm
             id={match.params.id}  
             type={match.params.type}
             />
    
     </>
    )
}

export default UntsHusband
