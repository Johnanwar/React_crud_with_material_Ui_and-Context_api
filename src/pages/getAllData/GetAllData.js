import React , {useRef} from 'react'
import PrintButton  from '../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../print/react-to-print' 
import { ComponentpageBreack } from '../../print/pageBreack' 


import GetAllDataTable from "./GetAllDataTable"

function GetAllData({match}) {
        ////printing 
        const componentRef = useRef();
        const handlePrint = useReactToPrint({
          content: () => componentRef.current,
        });



    return  (
    <>
    

    <PrintButton
  onClick={handlePrint}/>


{/* <div style={{display:"none"}}> */}
         <ComponentToPrint     
              Table={GetAllDataTable}
            //   customers={values}
              // SetCustomers = {SetCustomers}
              id={match.params.id}  
              type={match.params.type}
              title={' بيانات   الموظف بالكامل '}
              ref={componentRef} 
              code={match.params.id}
              // remove={remove}
              /> 

 
       </>
    )
}

export default GetAllData
