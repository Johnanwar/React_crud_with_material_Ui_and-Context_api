import React from 'react'
import BrothersWifesForm from "./BrothersWifesForm"
 

function AddBrothersWifes({match}) {
 
    return (
    <>
   
  
 
             <BrothersWifesForm
                id={match.params.id} 
             type={match.params.type}
               />
 
     </>
    )
}

export default AddBrothersWifes
