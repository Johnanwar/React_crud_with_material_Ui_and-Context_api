import React from 'react'
import AddUncleForm from "./khaddUncleForm"
 

function AddKhUncle({match}) {
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

export default AddKhUncle
