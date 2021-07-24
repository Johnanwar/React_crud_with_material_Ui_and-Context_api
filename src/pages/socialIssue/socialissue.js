import React from 'react'
 import SocialissueForm from "./socialissueForm"
 


function Socialissue({match}) {
     return (
    <>
        <SocialissueForm
             id={match.params.id} 
             type={match.params.type}
           />
     
     </>
    )
}

export default Socialissue
