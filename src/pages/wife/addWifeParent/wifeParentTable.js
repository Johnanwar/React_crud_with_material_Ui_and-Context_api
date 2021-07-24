import React ,{useState} from 'react'
import { TableBody, TableCell, TableRow, TableHead,
    TableContainer  , IconButton} from '@material-ui/core';
import { Edit, Delete} from '@material-ui/icons';
import WifeParentPopup from "./wifeParentPopup"
import Table from "../../../shared/Table";
import { createAPIEndpoint, ENDPIONTS } from "../../../api";

function WifeParentTable({customers ,setupdate}) {
  const [loading, setLoading] = useState(false);

  // for open poup
  const [open, setOpen] = useState(false);
  const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //for edit obj
  const [editobj , setEditobj] =useState({})
  const handleInputChange = e => {
      const { name, value } = e.target
      setEditobj({
          ...editobj,
          [name]: value
      })
    }
    function handleSubmit(e) {
      e.preventDefault()
        console.log(editobj);
        createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES7).createPrison( editobj.EmployeeFormID, editobj.Employee30ID ,editobj)
        .then(res => {
          handleClose()
          setupdate(true)
        })
          .catch(function (response) {
            handleClose()
            setupdate(true)
          //  setLoading(false)
          //  notify()
  
          });  
        // handleClose()
      //   notify()     
      // resetFormControls()   
   
     }
     ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // data comes from data base

  
  
  const getOneCustomer = async (cust, id) => {
      handleOpen()
      console.log(id)
      setEditobj(cust)
      // try {
      //     setFormMode(false);
      //     setCustId(id);
      //     const response = await getCustomer(id);
      //      setFirstName(response.firstname);
      //      setLastName(response.lastname);
      //      setOpen(true);
      // } catch (error) {
      //     toast.error(error.message);
      // }

}
const deleteHandler = async (id) => {
  console.log(id)
      // try {
      //     await deleteCustomer(id);
      //     getlist();
      //     toast.success('Customer Deleted Successfully');
      // } catch (error) {
      //     toast.error(error.message);
      // }
}



  return (
      <div
      style={{width:'100%', overflowX:"auto"}}
      >
      <WifeParentPopup
      handleClose={handleClose}
      open={open}
      editobj={editobj}
      handleInputChange ={handleInputChange}
      handleSubmit = {handleSubmit}
      />
      <Table>
    
      
      {customers.listData.length > 1 || customers.listData.length == 1 ?  (
          <>
              <TableHead>
              <TableRow>
                  <TableCell>نوع الجنسيه </TableCell>
                  <TableCell>  درجه القرابه </TableCell>
                  <TableCell> الوظيفه  </TableCell>
                  <TableCell>    الجنسيه</TableCell>
                  <TableCell>  محل الاقامه  </TableCell>
                  <TableCell>    تعديل / حذف </TableCell>
 
  
              </TableRow>
            </TableHead>

              <TableBody>
              {customers.listData.map((cust) => (
                  <TableRow 
                  key={cust.Employee30ID}
                   id={cust.Employee30ID}
                  >
                    <TableCell>{cust.Name30}</TableCell>
                    <TableCell>{cust.Type30}</TableCell>
                    <TableCell> {cust.Job30} </TableCell>
                    <TableCell> {cust.Nationality30} </TableCell>
                    <TableCell> {cust.Address30} </TableCell>
                    <TableCell>
                      <IconButton
                       onClick={() => getOneCustomer( cust,cust.Employee30ID)} 
                       color="primary"
                       aria-label="update customer">
                              <Edit />
                      </IconButton>
                      <IconButton onClick={() => deleteHandler(cust.Employee30ID)}
                       color="secondary" aria-label="delete customer">
                          <Delete />
                      </IconButton>
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

export default WifeParentTable
