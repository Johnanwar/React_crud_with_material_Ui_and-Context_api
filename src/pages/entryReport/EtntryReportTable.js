import React ,{useState} from 'react'
import { TableBody, TableCell, TableRow, TableHead  , IconButton} from '@material-ui/core';
// import { Edit, Delete} from '@material-ui/icons';
 import Table from "../../shared/Table";
// import { createAPIEndpoint, ENDPIONTS } from "../../api";
// import {notifyUpdate,notifyDelete , notifyErr} from "../../components/alerts/alert"
// import Popup from "../../shared/Popup";
// import {Alert} from "../../components/alerts/alert";

function  EtntryReportTable({customers , values}) {
    // const [loading, setLoading] = useState(false);



    return (
        <div
        style={{width:'100%', overflowX:"auto"}}
        >
        {/* {values && values.EmployeeName !== "" ? (<p> الاسم :        {values.EmployeeName}</p>):("")}
        {values && values.FormYearFrom != 0   ? <p> من تاريخ :     {values.FormYearFrom}</p>:("")}
        {values  && values.FormYearTo  !=0    ? ( <p> الى تاريخ :  {values.FormYearTo}</p>):("")}
        {values && values.DepartmentID !==0   ? ( <p> الاداره :     {values.DepartmentID}</p>):("")} */}
      {/* <p> الاسم : ${values.EmployeeName}</p>
      <p> من تاريخ : ${values.FormYearFrom}</p>
      <p> الى تاريخ : ${values.FormYearTo}</p>
      <p> الاداره : ${values.DepartmentID}</p> */}
        
        <Table>
      
        
        {customers  ?  (
            <>
                <TableHead>
                <TableRow>
                    <TableCell> الأسم بالكامل</TableCell>
                    <TableCell>  الكود   </TableCell>
                    <TableCell> الاداره التابع لها   </TableCell>
    
                </TableRow>
              </TableHead>

                <TableBody>
                {customers.data.map((cust) => (
                    <TableRow 
                    key={cust.EmployeeFromID}
                     >
                      <TableCell> 
                     {cust.EmployeeName!='null' ?
                       (cust.EmployeeName ):('-')}
                      </TableCell>
                      <TableCell> 
                      { cust.EmployeeCode!='null' ?
                       (cust.EmployeeCode ):('')}
                      </TableCell>
                      <TableCell> 
                      { cust.DepartmentName!='null' ?
                       (cust.DepartmentName ):('')}
                      </TableCell>

                  </TableRow>
                ))}
                  
                  </TableBody>
            </>
            ) : (
              <h2
            style={{padding:"15px", backgroundColor:"#eee" , marginTop:"20px"}}
            >لا يوجد بيانات مضافه
             </h2>
            ) }
            
       
    </Table> 
    </div>
    )
}

export default EtntryReportTable
