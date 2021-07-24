import React from 'react'
 import WifeParentForm from "./wifeParentForm"
 

function AddWifeParent({match}) {
 
    return (
    <>
   
     
      
             <WifeParentForm
                id={match.params.id} 
             type={match.params.type}
               />
           
    
     </>
    )
}

export default AddWifeParent
