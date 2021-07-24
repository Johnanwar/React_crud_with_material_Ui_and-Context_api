import React from 'react'
  import SisterForm from "./SisterForm"
 

function AddSister({match}) {
 
    return (
    <>
              <SisterForm
                id={match.params.id} 
             type={match.params.type}
               />
      
     </>
    )
}

export default AddSister
