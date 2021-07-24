import React from 'react'
 import UncleWifeForm from "./uncleWifeForm"
  

function UncleWife({match}) {
    return (
    <>
   
      
             <UncleWifeForm
             id={match.params.id}  
             type={match.params.type}
             />
    
     </>
    )
}

export default UncleWife
