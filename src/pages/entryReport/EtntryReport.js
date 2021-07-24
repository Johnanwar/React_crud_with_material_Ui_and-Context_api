import React from 'react'
 import Nav from "../../components/nav/nav"
import EntryReportForm from "./EntryReportForm"
 

function EtntryReport({match}) {
//  console.log(match)
    return (
    <>
   
       
                  
 
      
             <EntryReportForm
             id={match.params.id} 
             type={match.params.type}
           />
      
     </>
    )
}

export default EtntryReport
