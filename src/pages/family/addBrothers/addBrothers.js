import React from 'react'
import BrothersForm from "./BrothersForm"
  

function AddBrothers({match}) {
 
    return (
    <>
   
       
                  
  
                
      
             <BrothersForm
                id={match.params.id} 
             type={match.params.type}
               />
           
       
     </>
    )
}

export default AddBrothers
