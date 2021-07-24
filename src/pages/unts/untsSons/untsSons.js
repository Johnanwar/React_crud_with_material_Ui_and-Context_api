import React from 'react'
import UncleSonsForm from "./untsSonsForm"
 

function UntsSons({match}) {
    return (
    <>
   
        
     
             <UncleSonsForm
             id={match.params.id}  
             type={match.params.type}
             />
 
     </>
    )
}

export default UntsSons
