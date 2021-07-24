import React from 'react'
   import AddUntsForm from "./khaddUntsForm"
 

function KhaddUnts({match}) {
 console.log(match.params.id)
    return (
    <>
   
  
 
             <AddUntsForm
             id={match.params.id}
             type={match.params.type}
               />
  
     </>
    )
}

export default KhaddUnts
