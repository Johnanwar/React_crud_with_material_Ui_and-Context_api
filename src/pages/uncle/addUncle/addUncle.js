import React from 'react'
 import AddUncleForm from "./addUncleForm"
 

function AddUncle({match}) {
 console.log(match.params.id)
    return (
    <>
    
             <AddUncleForm
             id={match.params.id}
             type={match.params.type}
               />
  
     </>
    )
}

export default AddUncle
