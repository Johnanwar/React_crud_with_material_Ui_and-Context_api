import React ,{useState} from 'react'
import { TableBody, TableCell, TableRow, TableHead,
  IconButton} from '@material-ui/core';
import { Edit, Delete} from '@material-ui/icons';
import WifeBrotherPopup from "./wifeBrotherPopup"
import Table from "../../../shared/Table";
import { createAPIEndpoint, ENDPIONTS } from "../../../api";

function WifeBrotherTable({customers ,setupdate}) {
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
        createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES16).createPrison( editobj.EmployeeFormID, editobj.EmployeePart_BroID ,editobj)
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
      <WifeBrotherPopup
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
        <TableCell> الاسم بالكامل </TableCell>
            <TableCell>  تاريخ الميلاد </TableCell>
            <TableCell>  محل الاقامه  </TableCell>
            <TableCell>    الجنسيه</TableCell>
            <TableCell>  الوظيفه  </TableCell>
            <TableCell>    تعديل / حذف </TableCell>


        </TableRow>
      </TableHead>

        <TableBody>
        {customers.listData.map((cust) => (
            <TableRow 
            key={cust.EmployeePart_BroID}
             id={cust.EmployeePart_BroID}
            >
              <TableCell>{cust.Part_BroName}</TableCell>
              <TableCell>{(cust.Part_BroBDay).slice(0, 10)}</TableCell>
              <TableCell> {cust.Part_BroAddress} </TableCell>
              <TableCell> {cust.Part_BroNationality} </TableCell>
              <TableCell> {cust.Part_BroJob} </TableCell>
              <TableCell>
                <IconButton
                 onClick={() => getOneCustomer( cust,cust.EmployeePart_BroID)} 
                 color="primary"
                 aria-label="update customer">
                        <Edit />
                </IconButton>
                <IconButton onClick={() => deleteHandler(cust.EmployeePart_BroID)}
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

export default WifeBrotherTable
