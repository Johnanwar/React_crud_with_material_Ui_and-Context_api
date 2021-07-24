import React from 'react'
import UncleWifeForm from "./khuncleWifeForm"
  

function UncleKhWife({match}) {
    return (
    <>
 
             <UncleWifeForm
             id={match.params.id}  
             type={match.params.type}
             />
  
     </>
    )
}

export default UncleKhWife
