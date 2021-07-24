import React from 'react'
  import UncleSonsForm from "./khuntsSonsForm"
 // import Header from "../../components/header/header"


function KhUntsSons({match}) {
    return (
    <>
   
               
   
             <UncleSonsForm
             id={match.params.id}  
             type={match.params.type}
             />
  
     </>
    )
}

export default KhUntsSons
