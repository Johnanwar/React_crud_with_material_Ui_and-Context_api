import React ,{useState,useContext} from 'react'
import { TableBody, TableCell, TableRow, TableHead, IconButton} from '@material-ui/core';
import { Edit, Delete} from '@material-ui/icons';
import  UncleWifePopup from "./uncleWifePopup"
import Table from "../../../shared/Table";
import { createAPIEndpoint, ENDPIONTS } from "../../../api";
import {notifyUpdate,notifyDelete , notifyErr} from "../../../components/alerts/alert"
import Popup from "../../../shared/Popup";
import {Alert} from "../../../components/alerts/alert";
import {HistoryContext} from '../../../contexts/historyContext'

function UncleWifeTable({customers , SetCustomers , remove}) {
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
        e.preventDefault()
        setLoading(true)
        createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES19).createPrison( editobj.EmployeeFormID, editobj.Employee19ID ,editobj)
        .then(res => {
          handleClose(true)
          setLoading(false)
          SetCustomers(res.data.data)         
          notifyUpdate()
        })
        .then(res => {
          handlehistory( action.EDIT , 'بيانات    زوجات الاعمام ' ,  "تعديل  بيانات زوجات الاعمام  ")
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
    createAPIEndpoint(ENDPIONTS.DELETEEMPLOYEES19).delete( deletedObj.EmployeeFormID , deletedObj.Employee19ID )
    .then(res => {
     console.log(res)
     SetCustomers(res.data.data)
     setOpenPopup(false)
     setLoading(false)
     notifyDelete()
    })
    .then(res => {
      handlehistory( action.DELETE , 'بيانات   زوجات الاعمام ' ,  "حذف صف من  بيانات  زوجات الاعمام  ")
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
        <UncleWifePopup
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
      
        
 {customers  ?  (
      <>

          <TableHead>
          <TableRow>
              <TableCell>  الاسم بالكامل  </TableCell>
              <TableCell >تاريخ الميلاد </TableCell>
              <TableCell>  السن </TableCell>
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
              <TableRow key={cust.Employee19ID}>
                <TableCell>{cust.Name19}</TableCell>
                <TableCell>{(cust.BDay19).slice(0, 10)}</TableCell>
                <TableCell>{cust.Age19}</TableCell>
                <TableCell> {cust.Nationality19} </TableCell>
                <TableCell> {cust.Job} </TableCell>
                <TableCell> {cust.Address} </TableCell>
           {remove !== true ? (
                <TableCell>
                  <IconButton
                   onClick={() => getOneCustomer( cust,cust.Employee19ID)} 
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

export default UncleWifeTable
