import React, { useState , useEffect ,useRef,useContext } from "react"
import { Grid} from '@material-ui/core';
import { Input,Btn,Spinner } from "../../controls";
import {Alert,notify,notifyErr} from "../../components/alerts/alert"
import Form from "../../shared/Form";
import Header from "../../components/header/header"
import {  useHistory } from "react-router-dom"
 import { createAPIEndpoint, ENDPIONTS } from "../../api";
import ParentTable from './parentTable'

import PrintButton  from '../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../print/react-to-print'
import {HistoryContext} from '../../contexts/historyContext'

function Parents({match}) {
  const { handlehistory ,action ,UserID} = useContext(HistoryContext)

   ////printing 
   const componentRef = useRef();
   const handlePrint = useReactToPrint({
     content: () => componentRef.current,
   });
    
  const getFreshModelObject ={
    EmployeeParentID:"",
    ParentName: "",
    ParentBDay: "",
    ParentType: "الاب",
    ParentAge: '',
    ParentNationality: '',
    ParentJob: '',
    ParentAddress: '',
    UserID:UserID,

}
const [values, setValues] = useState(getFreshModelObject);
const [parentArray, setParentArray] = useState([])
const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);

useEffect(() => {
  createAPIEndpoint(ENDPIONTS.EMPLOYEES12).fetchByIdAndYear(match.params.id,match.params.type)
      .then(res => {
        if(res.data.data!= null){
          console.log(res.data.data)
          setParentArray(res.data.data.listData)
          const fatherobj =res.data.data.listData.find(x => x.ParentType == "الاب")
          console.log(fatherobj)
          setValues(fatherobj)
            
        }
      })
      .catch(err => console.log(err))
}, [])

// useEffect(() => {
//   createAPIEndpoint(ENDPIONTS.EMPLOYEES12).fetchByIdAndYear(match.params.id,match.params.type)
//   .then(res => {
//     if(res.data.data!= null){
//       console.log(res.data.data)
//       setParentArray(res.data.data.listData)
//       const fatherobj =res.data.data.listData.find(x => x.ParentType = "أب")
//       console.log(fatherobj)
//       setValues(fatherobj)
        
//     }
//   })
//       .catch(err => console.log(err))
// }, [])
  const history = useHistory()


const handleInputChange = e => {
const { name, value } = e.target;

var today = new Date();
var birthDate = new Date(values.ParentBDay);
var age_now = today.getFullYear() - birthDate.getFullYear();
var m = today.getMonth() - birthDate.getMonth();
if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
{
    age_now--; 
}

setValues({
    ...values,
    [name]: value,
    ParentAge:age_now,
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
      createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES12).createPrison( values.EmployeeFormID, values.EmployeeParentID ,values)
      .then(res => {
          console.log(res)
          // setLoading(false)
          // history.push(`/Mother/${match.params.id}/${match.params.type}`)
          // notify()

      })
      .then(res => {
        handlehistory( action.ADD , 'بيانات   الأب ' ,  "  اضافه  بيانات الأب    ")
      })
      .then(res => {
        notify();
        setLoading(false)
        history.push(`/Mother/${match.params.id}/${match.params.type}`)

       })
        .catch(function (response) {
          //handle error
           notifyErr()
         setLoading(false)
          console.log(response);
        });
      console.log(values);
     
 
    }   
   }


    return (
      <>
     
        <Form onSubmit={handleSubmit} >
        <Grid container spacing={1}>
             <Header>
              إدخل بيانات الأب  

              </Header>
              {/* name */}
              <Grid item item  xs={12} sm={6} md={4} lg={4} >
                <Input
                autoFocus
                   name="ParentName"
                   label="  الاسم بالكامل  "
                   value={values.ParentName}
                   error={errors.ParentName}
                   onChange={handleInputChange}
                   type= "text"
                />
  
              </Grid>
        
              {/* date of birth */}
              <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input className="dateInput"
                     name="ParentBDay"
                     label="تاريخ الميلاد"
                     value={values.ParentBDay!=null ?
                       ((values.ParentBDay).slice(0,10)):('')}
                     error={errors.ParentBDay}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>

             {/* age   */}
     
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="ParentNationality"
                     label="الرقم القومي"
                     value={values.ParentNationality}
                     error={errors.ParentNationality}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="ParentJob"
                     label=" الوظيفه"
                     value={values.ParentJob}
                     error={errors.ParentJob}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="ParentAddress"
                     label=" محل الاقامه"
                     value={values.ParentAddress}
                     error={errors.ParentAddress}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>

            <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="ParentAge"
                    label="السن"
                    value={values.ParentAge}
                    error={errors.ParentAge}
                    type= "number"

                    onChange={handleInputChange}
            />
        
             </Grid>
 
 
      </Grid>  
      

      <Btn
              size="large"
              color="primary"
              disabled={loading}
              >
                        {loading ? (
                <Spinner/>
           ): ('')}
              إضافه ومتابعه 
            </Btn>   
       
        </Form>

        <div style={{display:"none"}}>

<ComponentToPrint
              
              Table={ParentTable}
              customers={values}
              // SetCustomers = {SetCustomers}
              title={'بيانات الأب'}
              ref={componentRef} 
              code={match.params.id}
              />

    </div>
          

<PrintButton
  onClick={handlePrint}
/>

        </>
             
    )
}

export default Parents
