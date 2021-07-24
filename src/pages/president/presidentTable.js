import React ,{useState , useContext} from 'react'
import { TableBody, TableCell, TableRow, TableHead  , IconButton} from '@material-ui/core';
import { Edit, Delete} from '@material-ui/icons';
import  PresidentPopup from "./presidentPopup"
import Table from "../../shared/Table";
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import {DepartmentContext} from '../../contexts/departmentContext'
import {notifyUpdate,notifyDelete , notifyErr} from "../../components/alerts/alert"
import Popup from "../../shared/Popup"
import {Alert} from "../../components/alerts/alert";
import {HistoryContext} from '../../contexts/historyContext'

function  PresidentTable({customers ,SetCustomers , remove}) {
  const { managementValues } = useContext(DepartmentContext)
  const { handlehistory ,action ,UserID} = useContext(HistoryContext)

    const [loading, setLoading] = useState(false);
    const [openPopup, setOpenPopup] =useState(false)
    const [deletedObj, setDeletedObj] =useState({})

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
            [name]: value,
            UserID:UserID,

        })
      }
      function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
          createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES30).createPrison( editobj.EmployeeFormID, editobj.Employee30ID ,editobj)
          .then(res => {
            handleClose(true)
            setLoading(false)
            SetCustomers(res.data.data)         
            notifyUpdate()
          })
          .then(res => {
            handlehistory( action.EDIT , 'بيانات    اقارب يعملون برئاسه الجمهوريه ' ,  "تعديل  بيانات اقارب يعملون برئاسه الجمهوريه  ")
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
const ConfirmDeleteHandler = async () => {
  setLoading(true)
    createAPIEndpoint(ENDPIONTS.DELETEEMPLOYEES30).delete( deletedObj.EmployeeFormID , deletedObj.Employee30ID )
    .then(res => {
     console.log(res)
     SetCustomers(res.data.data)
     setOpenPopup(false)
     setLoading(false)
     notifyDelete()
    })
    .then(res => {
      handlehistory( action.DELETE , 'بيانات   اقارب يعملون برئاسه الجمهوريه ' ,  "حذف صف من  بيانات  اقارب يعملون برئاسه الجمهوريه  ")
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
        <PresidentPopup
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
                    <TableCell> الاسم بالكامل </TableCell>
                    <TableCell>  الإداره  التابع لها  </TableCell>
                    <TableCell> درجه القرابه  </TableCell>
                    <TableCell>    ملاحظات </TableCell>
                    {remove !== true ? (
                    <TableCell>    تعديل / حذف </TableCell>
                    ) : ("")}
    
                </TableRow>
              </TableHead>

                <TableBody>
                {customers.listData.map((cust) => (
                    <TableRow 
                    key={cust.Employee30ID}
                     id={cust.Employee30ID}
                    >
                      <TableCell>{cust.Name30}</TableCell>
                      <TableCell>{
                      
                          cust.DepID != null && cust.DepID != '0'  && managementValues.length > 0  ?
                      (managementValues.find(x => x.DepartmentID == cust.DepID).DepartmentName)
                      :("")
                        }
                      </TableCell>
                      <TableCell> {cust.RelativeDegree} </TableCell>
                      <TableCell> {cust.Notes} </TableCell>
                    {remove !== true ? (
                      <TableCell>
                        <IconButton
                         onClick={() => getOneCustomer( cust,cust.Employee30ID)} 
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

export default PresidentTable
