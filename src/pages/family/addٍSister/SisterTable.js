import React ,{useState,useContext} from 'react'
import { TableBody, TableCell, TableRow, TableHead, IconButton} from '@material-ui/core';
import { Edit, Delete} from '@material-ui/icons';
import SisterPopup from "./SisterPopup"
import Table from "../../../shared/Table";
import { createAPIEndpoint, ENDPIONTS } from "../../../api";
import {notifyUpdate,notifyDelete , notifyErr} from "../../../components/alerts/alert"
import Popup from "../../../shared/Popup";
import {Alert} from "../../../components/alerts/alert";
import {Typee } from "../../../controls/typee";
import {HistoryContext} from '../../../contexts/historyContext'

function SisterTable({customers ,SetCustomers ,remove}) {
  const { handlehistory ,action ,UserID} = useContext(HistoryContext)
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
        createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES14).createPrison( editobj.EmployeeFormID, editobj.EmployeeSisterID ,editobj)
        .then(res => {
          handleClose(true)
          setLoading(false)
          console.log(res)
          SetCustomers(res.data.data)         
          notifyUpdate()
        })
        .then(res => {
          handlehistory( action.EDIT , 'بيانات    الاخوات  ' ,  "تعديل  بيانات الاخوات   ")
        })
          .catch(function (response) {
            handleClose()
            // setupdate(true)
           setLoading(false)
           notifyErr()
           console.log(response)
  
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
    createAPIEndpoint(ENDPIONTS.DELETEEMPLOYEES14).delete( deletedObj.EmployeeFormID , deletedObj.EmployeeSisterID )
    .then(res => {
     console.log(res)
     SetCustomers(res.data.data)
     setOpenPopup(false)
     setLoading(false)
     notifyDelete()
    })
    .then(res => {
      handlehistory( action.DELETE , 'بيانات   الاخوات  ' ,  "حذف صف من  بيانات  الاخوات   ")
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
      <SisterPopup
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
              <TableCell> الاسم بالكامل </TableCell>
              <TableCell> شقيقه او غير شقيقه </TableCell>
                  <TableCell>  تاريخ الميلاد </TableCell>
                  <TableCell>   السن  </TableCell>
                  <TableCell>    الجنسيه</TableCell>
                  <TableCell>  الوظيفه </TableCell>
                  <TableCell>  محل الاقامه  </TableCell>

                  {remove !== true ? (
                  <TableCell>    تعديل / حذف </TableCell>

                   ) : ("")}
 
  
              </TableRow>
            </TableHead>

              <TableBody>
              {customers.listData.map((cust) => (
                  <TableRow 
                  key={cust.EmployeeSisterID}
                   id={cust.EmployeeSisterID}
                  >
                    <TableCell>{cust.SisterName}</TableCell>
                    <TableCell>{cust.SisterType}</TableCell>
                    <TableCell>{(cust.SisterBDay).slice(0, 10)}</TableCell>
                    <TableCell> {cust.SisterAge} </TableCell>
                    <TableCell> {cust.SisterNationality} </TableCell>
                    <TableCell> {cust.SisterJob} </TableCell>
                    <TableCell> {cust.SisterAddress} </TableCell>

                  {remove !== true ? (

                    <TableCell>
                      <IconButton
                       onClick={() => getOneCustomer( cust,cust.EmployeeSisterID)} 
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

export default SisterTable
