import React from 'react'
import WifeSisterHusbandForm from "./wifeSisterHusbandForm"
  

function AddWifeSisterHusband({match}) {
 
    return (
    <>
   
      
             <WifeSisterHusbandForm
                id={match.params.id} 
             type={match.params.type}
               />
      
     </>
    )
}

export default AddWifeSisterHusband
