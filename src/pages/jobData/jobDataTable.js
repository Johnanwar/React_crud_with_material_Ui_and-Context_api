import React ,{useState} from 'react'
import { TableBody, TableCell, TableRow, TableHead } from '@material-ui/core';
import Table from "../../shared/Table";


function  JobDataTable({customers}) {


    return (
        <div
        style={{width:'100%', overflowX:"auto"}}
        >

        <Table>
      
      
                <TableHead>
                <TableRow>
                    <TableCell> المؤهل الدراسي </TableCell>
                    <TableCell>  تاريخ الحصول على المؤهل   </TableCell>
                    <TableCell> الوظيفه الحاليه</TableCell>
                    <TableCell>  تليفون العمل </TableCell>
   
             
               
    
                </TableRow>
              </TableHead>

                <TableBody>
                    <TableRow >
                      <TableCell> 
                      {customers.Certificates ? (<>
             { customers.Certificates.map((jb ,idx) => (
                 <p key={idx}>  {jb.Certificate} </p>
                 ))}
                 </> ): ('')}
        
                      </TableCell>
                      <TableCell> 

                      {customers.Certificates ? (<>
             { customers.Certificates.map((jb , idx) => (
                 <p  key={idx}>  {jb.CerDate} </p>
                 ))}
                 </> ): ('')}
                      
                      </TableCell>

                 <TableCell>{customers.JobName}</TableCell>
                 <TableCell>{customers.WorkPhone}</TableCell>
                


                  </TableRow>
               
                  
                  </TableBody>
         
            
       
    </Table> 

    <Table>
      
      
      <TableHead>
      <TableRow>

          <TableCell> الخط الداخلي </TableCell>
          <TableCell>  الدرجه الحاليه </TableCell>
          <TableCell>  المرتب الحالي </TableCell>
          <TableCell>  مصادر دخل أخرى </TableCell>
   
     

      </TableRow>
    </TableHead>

      <TableBody>
          <TableRow >
 

       <TableCell>{customers.WorkLine}</TableCell>
       <TableCell>{customers.JobTitle}</TableCell>
       <TableCell>{customers.CurrentSalary}</TableCell>
       <TableCell> 
          {customers.OtherIncomes ? (<>
          { customers.OtherIncomes.map((jb , idx) => (
          <p  key={idx}>  {jb} </p>
          ))}
          </> ): ('')}
      </TableCell>


        </TableRow>
     
        
        </TableBody>

  

</Table> 
    </div>
    )
}

export default JobDataTable
