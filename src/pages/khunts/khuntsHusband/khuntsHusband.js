import React from 'react'
  import UntsHusbandForm from "./khuntsHusbandForm"
 

function KhUntsHusband({match}) {
    return (
    <>
   
     
 
     
             <UntsHusbandForm
             id={match.params.id}  
             type={match.params.type}
             />
        
     </>
    )
}

export default KhUntsHusband
