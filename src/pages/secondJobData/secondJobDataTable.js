import React ,{useState} from 'react'
import { TableBody, TableCell, TableRow, TableHead } from '@material-ui/core';
import Table from "../../shared/Table";


function  SecondJobDataTable({customers}) {


    return (
        <div
        style={{width:'100%', overflowX:"auto"}}
        >

        <Table>
      
      
                <TableHead>
                <TableRow>
                    <TableCell> الوظيفه المرشح لها </TableCell>
                    <TableCell>   الوظائف السابقه بالترتيب  </TableCell>
                    <TableCell>  تاريخ الالتحاق </TableCell>
             
               
    
                </TableRow>
              </TableHead>

                <TableBody>
                    <TableRow >
             

                      <TableCell>{customers.JobName}</TableCell>
                      <TableCell> 
                      {customers.PrevJobs ? (<>
             { customers.PrevJobs.map((jb ,idx) => (
                 <p key={idx}>  {jb.Job} </p>
                 ))}
                 </> ): ('')}
        
                      </TableCell>
                      <TableCell> 

                      {customers.PrevJobs ? (<>
             { customers.PrevJobs.map((jb , idx) => (
                 <p  key={idx}>  {jb.JobDate} </p>
                 ))}
                 </> ): ('')}
                      
                      {/* {customers.MilitaryDate!=null ?
                                   ((customers.MilitaryDate).slice(0,10)):('')}  */}
                      </TableCell>

                  </TableRow>
               
                  
                  </TableBody>
         
            
       
    </Table> 
    </div>
    )
}

export default SecondJobDataTable
