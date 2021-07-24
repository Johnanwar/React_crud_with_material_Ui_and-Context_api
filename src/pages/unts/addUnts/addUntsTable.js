import React ,{useState,useContext} from 'react'
import { TableBody, TableCell, TableRow, TableHead,
    TableContainer  , IconButton} from '@material-ui/core';
import {AddCircle, Edit, Delete} from '@material-ui/icons';
import {ScaleLoader} from 'react-spinners';
import  AddUntsPopup from "./addUntsPopup"
import Table from "../../../shared/Table";
import { createAPIEndpoint, ENDPIONTS } from "../../../api";
import {notifyUpdate,notifyDelete , notifyErr} from "../../../components/alerts/alert"
import Popup from "../../../shared/Popup"
import {Alert} from "../../../components/alerts/alert";
import {HistoryContext} from '../../../contexts/historyContext'

function AddUntsTable({customers,SetCustomers , remove}) {
    const [loading, setLoading] = useState(false);
    const { handlehistory ,action ,UserID} = useContext(HistoryContext)

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
    const [openPopup, setOpenPopup] =useState(false)
    const [deletedObj, setDeletedObj] =useState({})
    const handleInputChange = e => {
        const { name, value } = e.target
        setEditobj({
            ...editobj,
            [name]: value,
    UserID:UserID,

        })
      }
      function handleSubmit(e) {
        setLoading(true)
        e.preventDefault()
        console.log(editobj);
        createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES24).createPrison( editobj.EmployeeFormID, editobj.Employee24ID ,editobj)
        .then(res => {
          handleClose(true)
          setLoading(false)
          SetCustomers(res.data.data)         
          notifyUpdate()
        })
        .then(res => {
          handlehistory( action.EDIT , 'بيانات    العمات ' ,  "تعديل  بيانات العمات  ")
        })
          .catch(function (response) {
            handleClose()
            // setupdate(true)
           setLoading(false)
           notifyErr()
  
          });   
   
     
       }
       ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // data comes from data base

    
    
    const getOneCustomer = async (cust, id) => {
        handleOpen()
        console.log(id)
        setEditobj(cust)

}
const ConfirmDeleteHandler = async () => {
  setLoading(true)
    createAPIEndpoint(ENDPIONTS.DELETEEMPLOYEES24).delete( deletedObj.EmployeeFormID , deletedObj.Employee24ID )
    .then(res => {
     console.log(res)
     SetCustomers(res.data.data)
     setOpenPopup(false)
     setLoading(false)
     notifyDelete()
    })
    .then(res => {
      handlehistory( action.DELETE , 'بيانات   العمات ' ,  "حذف صف من  بيانات  العمات  ")
    })
      .catch(function (response) {
        handleClose();
        setLoading(false)
        notifyErr();
        setOpenPopup(false)
      
      });  
}

const deleteHandler = async (cust ) => {
  setDeletedObj(cust)
  console.log(cust)
  setOpenPopup(true)  
}



    return (
        <div
        style={{width:'100%', overflowX:"auto"}}
        >
        <AddUntsPopup
        handleClose={handleClose}
        open={open}
        editobj={editobj}
        handleInputChange ={handleInputChange}
        handleSubmit = {handleSubmit}
        loading={loading}
        />
        <Popup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          title={'حذف'}
          ConfirmDeleteHandler={ConfirmDeleteHandler}
          loading={loading}
        />

{remove !== true ? (
        <Alert/>
        ) : ("")}

        <Table>
      
        
        {customers ?  (
            <>

                <TableHead>
                <TableRow>
                    <TableCell>  الاسم بالكامل  </TableCell>
                    <TableCell >تاريخ الميلاد </TableCell>
                    <TableCell> السن  </TableCell>
                    <TableCell> الجنسيه</TableCell>
                    <TableCell>الوظيفه</TableCell>
                    <TableCell>محل الاقامه</TableCell>
                    {remove !== true ? (
                    <TableCell> تعديل  حذف </TableCell>
                    ) : ("")}
    
                </TableRow>
              </TableHead>

                <TableBody>
                {customers.listData.map((cust) => (
                    <TableRow key={cust.Employee24ID}>
                      <TableCell>{cust.Name24}</TableCell>
                      <TableCell>{(cust.BDay24).slice(0, 10)}</TableCell>
                      <TableCell>{cust.Age24}</TableCell>
                      <TableCell> {cust.Nationality24} </TableCell>
                      <TableCell> {cust.Job} </TableCell>
                      <TableCell> {cust.Address} </TableCell>

                    {remove !== true ? (
                      <TableCell>
                        <IconButton
                         onClick={() => getOneCustomer( cust,cust.Employee24ID)} 
                         color="primary"
                         aria-label="update customer">
                                <Edit />
                        </IconButton>
                        <IconButton onClick={() => deleteHandler(cust)}
                         color="secondary" aria-label="delete customer">
                            <Delete />
                        </IconButton>
                      </TableCell>
                      ) : ("")}

                  </TableRow>
                ))}
                  
                  </TableBody>
            </>
            ): (
              <h2
            style={{padding:"15px", backgroundColor:"#eee" , marginTop:"20px"}}
            >لا يوجد بيانات مضافه
             </h2>
            ) }
            
            
       
    </Table> 
    </div>
    )
}

export default AddUntsTable
