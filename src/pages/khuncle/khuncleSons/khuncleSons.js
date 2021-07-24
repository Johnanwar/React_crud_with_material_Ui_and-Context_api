import React from 'react'
  import UncleSonsForm from "./khuncleSonsForm"
 

function UncleKhSons({match}) {
    return (
    <>
   
              <UncleSonsForm
             id={match.params.id}  
             type={match.params.type}
             />
     
     </>
    )
}

export default UncleKhSons
