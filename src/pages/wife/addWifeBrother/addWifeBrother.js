import React from 'react'
import WifeBrotherForm from "./wifeBrotherForm"
  

function AddWifeBrother({match}) {
    // WifeBrothers
 
    return (
    <>
 
             <WifeBrotherForm
                id={match.params.id} 
             type={match.params.type}
               />
 
     </>
    )
}

export default AddWifeBrother
