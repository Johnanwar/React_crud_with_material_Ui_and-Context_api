import React from 'react'
import GlobalForm from "./globalForm"
 
function Global({match}) {
//  console.log(match)
    return (
    <>
   
   
             <GlobalForm
             id={match.params.id} 
             type={match.params.type}
           />
  
     </>
    )
}

export default Global
