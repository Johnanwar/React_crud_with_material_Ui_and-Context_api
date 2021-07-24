import React ,{useContext} from 'react'
import { TableBody, TableCell, TableRow, TableHead } from '@material-ui/core';
import Table from "../../shared/Table";
import {DepartmentContext} from '../../contexts/departmentContext'
import {Religion } from "../../controls/religion";


function  PersonalDataTable({customers}) {

      
    const { managementValues } = useContext(DepartmentContext)
  



    //dropdown for genders
      const genders = [
      {DepartmentID: '0' , DepartmentName:'ذكر'},
      {DepartmentID: '1' , DepartmentName:'انثى'},
    ]

    return (
        <div
        style={{width:'100%', overflowX:"auto"}}
        >
        <div
        style={{textAlign:'center'}}>
        {customers.ImageName!= null?(
          <img
          style={{maxHeight:"300px"}}
           src={customers.ImageName}/>

        ):("")}
        </div>

        <Table>
      
      
                <TableHead>
                <TableRow>
                    <TableCell> الاسم بالكامل </TableCell>
                    <TableCell>  اسم الشهره  </TableCell>
                    <TableCell> الإداره</TableCell>
                    <TableCell> الرقم القومي </TableCell>
                    <TableCell> النوع </TableCell>
                    <TableCell>  تاريخ الميلاد </TableCell>
                    <TableCell>   جهه الميلاد  </TableCell>
             
               
    
                </TableRow>
              </TableHead>

                <TableBody>
                    <TableRow >
                      <TableCell> {
                          customers.E_Name!='null' ?
                        (customers.E_Name ):('')}   
                       </TableCell>
                      <TableCell>  
                      {customers.P_Name!='null' ?
                       (customers.P_Name ):('')}
                       </TableCell>
                      <TableCell>{
                        customers.DepID != null && customers.DepID != '0'  && managementValues.length > 0  ?
                      (managementValues.find(x => x.DepartmentID == customers.DepID).DepartmentName)
                      :("")
                      }</TableCell>
                      <TableCell>
                      {customers.NationalID!='null' ?
                       (customers.NationalID ):('')}
                      </TableCell>
                      <TableCell>{
                        customers.Gender != null  ?
                      (genders.find(x => x.DepartmentID == customers.Gender).DepartmentName)
                      :("")
                      }</TableCell>
                      <TableCell>  {customers.BDate!=null ?
                       ((customers.BDate).slice(0,10)):('')}</TableCell>
                      <TableCell> 
                        {customers.BCountry!='null' ?
                        (customers.BCountry ):('')}
                       </TableCell>
       
                  </TableRow>
               
                  
                  </TableBody>
          
    </Table> 



{/* second table */}
    <Table>
      <TableHead>
      <TableRow>
          <TableCell> الديانه</TableCell>
          <TableCell>  الجنسيه </TableCell>
          <TableCell> البلده الاصليه</TableCell>
          <TableCell> محل الإقامه الحالي </TableCell>
          <TableCell>  رقم الموبايل  </TableCell>
          <TableCell>   مقيد بأسم  </TableCell>
          <TableCell>  اماكن الاقامة السابقه </TableCell>
   
     

      </TableRow>
    </TableHead>

      <TableBody>
          <TableRow >
            <TableCell>   {
              
              customers.Religion != null  ?
                      (Religion.find(x => x.DepartmentID == customers.Religion).DepartmentName)
                      :("")
            }   </TableCell>
            <TableCell> 
            {customers.Nationality!='null' ?
                       (customers.Nationality ):('')}
            </TableCell>
            <TableCell> 
            {customers.O_Country!='null' ?
                       (customers.O_Country ):('')}
            </TableCell>
            <TableCell> 
            {customers.C_Address!='null' ?
                       (customers.C_Address ):('')}
            </TableCell>
            <TableCell> 
            {customers.C_Phone!='null' ?
                       (customers.C_Phone ):('')}
            </TableCell>
            <TableCell> 
            {customers.C_Phone_Name!='null' ?
                       (customers.C_Phone_Name ):('')}
            </TableCell>
       <TableCell> 
          {customers.Places ? (<>
          { customers.Places.map((jb , idx) => (
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

export default PersonalDataTable
