import React from 'react'
 import UncleSonsForm from "./uncleSonsForm"
 

function UncleSons({match}) {
    return (
    <>
   
            
 
             <UncleSonsForm
             id={match.params.id}  
             type={match.params.type}
             />
           
 
     </>
    )
}

export default UncleSons
