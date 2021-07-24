import React from 'react'
  import SisterForm from "./sisterHusbForm"
  

function SisterHusb({match}) {
 
    return (
    <>
 
      
             <SisterForm
                id={match.params.id} 
             type={match.params.type}
               />
           
     
     </>
    )
}

export default SisterHusb
