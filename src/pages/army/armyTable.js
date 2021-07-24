import React ,{useState} from 'react'
import { TableBody, TableCell, TableRow, TableHead } from '@material-ui/core';
import Table from "../../shared/Table";


function  ArmyTable({customers}) {


    return (
        <div
        style={{width:'100%', overflowX:"auto"}}
        >

        <Table>
      
      
                <TableHead>
                <TableRow>
                    <TableCell> الموقف من التنجيد </TableCell>
                    <TableCell>  الرتبه  </TableCell>
                    <TableCell>  الرقم العسكري </TableCell>
                    <TableCell>  رقم الوحده</TableCell>
                    <TableCell>   جماعه بريد حربي </TableCell>
                    <TableCell>   السلاح</TableCell>
                    <TableCell>   تاريخ التسريح على الاحتياط</TableCell>
               
    
                </TableRow>
              </TableHead>

                <TableBody>
                    <TableRow >
                      <TableCell>
                      {(() => {
                        switch (customers.MilitaryStatus ) {
                        case 1:   return "معاف نهائي";
                        case 2: return "معاف مؤقت";
                        case 3:  return "مجند";
                        case 4:  return "متطوع";
                        case 5:  return "ادى الخدمه العسكريه";
                        default:      return "";
                        }
                    })()}
                      </TableCell>

                      <TableCell>{customers.RankName}</TableCell>
                      <TableCell>{customers.MilitaryNumber}</TableCell>
                      <TableCell>{customers.UnitNumber}</TableCell>
                      <TableCell>{customers.MilitaryPost}</TableCell>
                      <TableCell>{customers.Weapon}</TableCell>
                      <TableCell> {customers.MilitaryDate!=null ?
                                   ((customers.MilitaryDate).slice(0,10)):('')} </TableCell>

                  </TableRow>
               
                  
                  </TableBody>
         
            
       
    </Table> 
    </div>
    )
}

export default ArmyTable
