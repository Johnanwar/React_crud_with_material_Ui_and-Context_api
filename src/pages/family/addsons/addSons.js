import React from 'react'
import { Container,Grid,makeStyles} from '@material-ui/core';
import SonsForm from "./SonsForm"
 

function AddSons({match}) {
 
    return (
    <>
   
 
             <SonsForm
                id={match.params.id} 
             type={match.params.type}
               />
     
     </>
    )
}

export default AddSons
