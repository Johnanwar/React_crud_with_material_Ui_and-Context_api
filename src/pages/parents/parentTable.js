import React ,{useState} from 'react'
import { TableBody, TableCell, TableRow, TableHead } from '@material-ui/core';
import Table from "../../shared/Table";


function  ParentTable({customers}) {
    // const [loading, setLoading] = useState(false);



    


  


    return (
        <div
        style={{width:'100%', overflowX:"auto"}}
        >

        <Table>
      
      
                <TableHead>
                <TableRow>
                    <TableCell>الأسم بالكامل  </TableCell>
                    <TableCell>تاريخ الميلاد </TableCell>
                    <TableCell>   السن</TableCell>
                    <TableCell>  الرقم القومي </TableCell>
                    <TableCell>  الوظيفه </TableCell>
                    <TableCell>  محل الاقامه </TableCell>
               
    
                </TableRow>
              </TableHead>

                <TableBody>
                    <TableRow >
                      <TableCell>{customers.ParentName}</TableCell>
                      <TableCell>{customers.ParentBDay!=null ?
                       ((customers.ParentBDay).slice(0,10)):('')} </TableCell>
                      <TableCell>{customers.ParentAge}</TableCell>
                      <TableCell>{customers.ParentNationality}</TableCell>
                      <TableCell>{customers.ParentJob}</TableCell>
                      <TableCell>{customers.ParentAddress}</TableCell>

                  </TableRow>
               
                  
                  </TableBody>
         
            
       
    </Table> 
    </div>
    )
}

export default ParentTable
