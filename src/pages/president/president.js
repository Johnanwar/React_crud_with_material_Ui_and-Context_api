import React from 'react'
import {Grid} from '@material-ui/core';
 import GlobalForm from "./presidentForm"
   

function President({match}) {
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

export default President
