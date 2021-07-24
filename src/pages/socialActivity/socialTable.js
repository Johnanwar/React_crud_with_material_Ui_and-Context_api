import React ,{useState} from 'react'
import { TableBody, TableCell, TableRow, TableHead } from '@material-ui/core';
import Table from "../../shared/Table";


function  SocialTable({customers}) {
    // const [loading, setLoading] = useState(false);



    


  


    return (
        <div
        style={{width:'100%', overflowX:"auto"}}
        >

        <Table>
      
      
                <TableHead>
                <TableRow>
                    <TableCell> هل لديك سياره ؟ </TableCell>
                    <TableCell> رقم اللوحه  </TableCell>
                    <TableCell>   الانديه التي تشترك فيها</TableCell>
                    <TableCell>  مشترك في احزاب دينيه او سياسيه او لا </TableCell>
                    <TableCell>  تفاصيل الاحزاب السياسيه  </TableCell>
               
    
                </TableRow>
              </TableHead>

                <TableBody>
                    <TableRow >
                      <TableCell>{customers.bPrivateCar == true ? ("نعم") : ("لا")}</TableCell>
                      <TableCell>{customers.PrivateCarNumber}</TableCell>
                      <TableCell>{customers.ClubNames}</TableCell>
                      <TableCell>{customers.bPolitical == true ? ("نعم") : ("لا")}</TableCell>
                      <TableCell>{customers.PoliticalDetails}</TableCell>

                  </TableRow>
               
                  
                  </TableBody>
         
            
       
    </Table> 
    </div>
    )
}

export default SocialTable
