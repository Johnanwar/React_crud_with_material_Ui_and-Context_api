import React ,{useState ,useContext} from 'react'
import { TableBody, TableCell, TableRow, TableHead, IconButton} from '@material-ui/core';
import { Edit, Delete} from '@material-ui/icons';
import SonsPopup from "./SonsPopup"
import Table from "../../../shared/Table";
import { createAPIEndpoint, ENDPIONTS } from "../../../api";
import {notifyUpdate,notifyDelete , notifyErr} from "../../../components/alerts/alert"
import Popup from "../../../shared/Popup";
import {Alert} from "../../../components/alerts/alert"
import {HistoryContext} from '../../../contexts/historyContext'


function SonsTable({customers ,SetCustomers ,remove}) {
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
        createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES11).createPrison( editobj.EmployeeFormID, editobj.EmployeeKidID ,editobj)
        .then(res => {
          handleClose(true)
          setLoading(false)
          SetCustomers(res.data.data)         
          notifyUpdate()
        })
        .then(res => {
          handlehistory( action.EDIT , 'بيانات    الابناء ' ,  "تعديل  بيانات الابناء  ")
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
    createAPIEndpoint(ENDPIONTS.DELETEEMPLOYEES11).delete( deletedObj.EmployeeFormID , deletedObj.EmployeeKidID )
    .then(res => {
     console.log(res)
     SetCustomers(res.data.data)
     setOpenPopup(false)
     setLoading(false)
     notifyDelete()
    })
    .then(res => {
      handlehistory( action.DELETE , 'بيانات   الابناء ' ,  "حذف صف من  بيانات  الابناء  ")
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
} // }




  return (
      <div
      style={{width:'100%', overflowX:"auto"}}
      >
      <SonsPopup
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
                  key={cust.EmployeeKidID}
                   id={cust.EmployeeKidID}
                  >
                    <TableCell>{cust.KidName}</TableCell>
                    <TableCell>{(cust.KidBDay).slice(0, 10)}</TableCell>
                    <TableCell> {cust.KidAge} </TableCell>
                    <TableCell> {cust.KidNationality} </TableCell>
                    <TableCell> {cust.KidJob} </TableCell>
                    <TableCell> {cust.KidAddress} </TableCell>

                    {remove !== true ? (
                      <TableCell>
                        <IconButton
                        onClick={() => getOneCustomer( cust,cust.EmployeeMaritalID)} 
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

export default SonsTable
