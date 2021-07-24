import React from 'react'
import WifeForm from "./wifeForm"
  

function AddWife({match}) {
 
    return (
    <>
   
 
      
             <WifeForm
                id={match.params.id} 
             type={match.params.type}
               />
   
     </>
    )
}

export default AddWife
