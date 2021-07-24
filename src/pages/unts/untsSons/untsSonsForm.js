import React, { useState, useEffect , useRef,useContext} from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid,makeStyles} from '@material-ui/core';
import Form from "../../../shared/Form";
import { Input, Btn,Spinner ,Select} from "../../../controls";
import {Alert,notify,notifyErr} from "../../../components/alerts/alert"
import { createAPIEndpoint, ENDPIONTS } from "../../../api";
import Header from "../../../components/header/header"
import { Link, useHistory } from "react-router-dom"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UntsSonsTable from "./untsSonsTable"

import PrintButton  from '../../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../../print/react-to-print';
import {HistoryContext} from '../../../contexts/historyContext'

function UntsSonsForm({id , type}) {
  const { handlehistory ,action ,UserID} = useContext(HistoryContext)

    ////printing 
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
//  console.log(id)
const cst ={
  Employee26ID:"",
  EmployeeFormID:"",
  listData: [
  ]
} 
const [customers , SetCustomers] =useState(cst)
const [loading, setLoading] = useState(false);
const [update, setupdate] = useState('g');
const [uncle, setUncle] = useState([])
const [remove, setRemove] = useState(true);


useEffect(() => {
  createAPIEndpoint(ENDPIONTS.EMPLOYEES26).fetchByIdAndYear(id,type)
      .then(res => {
        if(res.data.data!= null){
          SetCustomers(res.data.data)
          console.log(res.data.data)
        }


      })
      .catch(err => console.log(err))

         // fetch unts huband 

      createAPIEndpoint(ENDPIONTS.EMPLOYEES25).fetchByIdAndYear(id,type)
      .then(res => {
    
          var parentArray = [] 
          res.data.data.listData.forEach((item ,idx) => {
            parentArray.push(
              {DepartmentID: item.Name25 , DepartmentName:item.Name25},
            )
            console.log(parentArray)
            setUncle(parentArray)
         })
    
      })
      .catch(err => console.log(err))
    



}, [])





const getFreshModelObject ={
  // EmployeeFormID:`${customers.EmployeeFormID}`,
  Employee2ID:'',
  // Name26: "",
  Address: "",
  Job: "",
  Nationality26: 'مصري',
  Age26:'',
  BDay26: '',
  uncle:"",
  name:"", 
}
const [values, setValues] = useState(getFreshModelObject);
const [errors, setErrors] = useState({});
  const history = useHistory()


const handleInputChange = e => {
const { name, value } = e.target;

var today = new Date();
var birthDate = new Date(values.BDay26);
var age_now = today.getFullYear() - birthDate.getFullYear();
var m = today.getMonth() - birthDate.getMonth();
if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
{
    age_now--; 
}
setValues({
    ...values,
    [name]: value,
    Name26 :`${values.name}  ${values.uncle}  `,
    Age26:age_now,
    UserID:UserID,


})
}

const validateForm = () => {
let temp = {};
temp.wName = values.wName != "" ? "" : "لو سمحت املا البيانات";
temp.wBirth = values.wBirth != "" ? "" : "لو سمحت املا البيانات";
temp.wAge = values.wAge != "" ? "" : "لو سمحت املا البيانات.";
temp.wNationalID = values.wNationalID != "" ? "" : "لو سمحت املا البيانات.";
temp.wJob = values.wJob != "" ? "" : "لو سمحت املا البيانات";
setErrors({ ...temp });
return Object.values(temp).every(x => x === "");
}

const resetFormControls = () => {
setValues(getFreshModelObject);
}

  // const [loading, setLoading] = useState(false)
  // const hist =[]
  function handleSubmit(e) {
    e.preventDefault()
    if (validateForm()) {
      setLoading(true)

      createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES26).createPrison( customers.EmployeeFormID, "0" ,values)
      .then(res => {
          setLoading(false)
          notify()
          SetCustomers(res.data.data)
          resetFormControls();
          console.log(res);
      })
      .then(res => {
        handlehistory( action.ADD , 'بيانات   أولاد العمات ' ,  "  اضافه  بيانات أولاد العمات    ")
      })
        .catch(function (response) {
          //handle error
           notifyErr()
         setLoading(false)
        //  setupdate(true)

          console.log(response);
        });  
 
    } 
     console.log(values);
   }
   function handleNext(e){
    e.preventDefault()
    history.push(`/KhaddUnts/${id}/${type}`)
   }

    return (
      <>
        <Form onSubmit={handleSubmit} >
        <Grid container spacing={1}>
             <Header>
                  أولاد العمات 

              </Header>
              {/* name */}
              <Grid item item  xs={12} sm={6} md={4} lg={4} >
                <Input
                autoFocus
                   name="name"
                   label="  الاسم بالكامل  "
                   value={values.name}
                  //  error={errors.wName}
                   onChange={handleInputChange}
                   type= "text"
                />
  
              </Grid>

              
              <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Select
                  label="اختار اب"
                  name="uncle"
                  // value={
                  //     values.Gender!=null ?(
                  //       genders[values.Gender].DepartmentID
                  //     ):('')
                  //   }
                    // value={
                    //   values.Gender != null  ?
                    //   (genders.find(x => x.DepartmentID == values.Gender).DepartmentID)
                    //   :("")
                    // }
                  // value={genders[values.Gender].DepartmentID}
                  onChange={handleInputChange}
                  value={values.uncle}
                  options={uncle}
                  error={errors.uncle}

                  />
                </Grid>
        
              {/* date of birth */}
              <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input className="dateInput"
                     name="BDay26"
                     label="تاريخ الميلاد"
                     value={values.BDay26}
                    //  error={errors.BDay24}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>
 
             {/* جهه الميلاد */}
             {/* <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="Age26"
                    label="السن"
                    value={values.Age26}
                    // error={errors.Address}
                    type= "text"

                    onChange={handleInputChange}
            />
        
             </Grid>  */}
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Nationality26"
                     label=" الجنسيه"
                     value={values.Nationality26}
                    //  error={errors.Nationality26}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Job"
                     label=" الوظيفه"
                     value={values.Job}
                     error={errors.Job}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
                    
             {/* محل الاقامه */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Address"
                     label=" محل الاقامه"
                     value={values.Address}
                     error={errors.Address}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
      </Grid>  
      <Btn
            size="large"
            disabled={loading}

            >
               إضافه <ExpandMoreIcon/> 
               {loading ? (
                <Spinner/>
           ): ('')}
         </Btn>
       
        </Form>
        <UntsSonsTable
              customers={customers}
              SetCustomers = {SetCustomers}
        />
                <div style={{display:"none"}}>
    <ComponentToPrint
              
              Table={UntsSonsTable}
              customers={customers}
              SetCustomers = {SetCustomers}
              title={'  بيانات   أولاد العمات '}
              ref={componentRef} 
              remove={remove}
              code={id}
              />
    </div>
              
    {customers.listData.length > 1 || customers.listData.length == 1 ?  (
      <div>
        <PrintButton onClick={handlePrint}/>
      </div>
       ) : ( '') }


        <div
          style={{marginTop:"20px", textAlign:'center', width:'100%'}}
        >
          <Btn
                size="large"
            color="primary"
            onClick={handleNext}
              >
           
           
               متابعه 
            </Btn>
  
         </div>
        </>
             
    )
}

export default UntsSonsForm
