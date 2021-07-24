import React from 'react'
 import GetPrisonForm from "./getPrisonForm"
 

function GetPrison({match}) {
 console.log(match.params.id)
    return (
    <>
   
 
             <GetPrisonForm
             id={match.params.id}  
             type={match.params.type}/>
      
     </>
    )
}

export default GetPrison
