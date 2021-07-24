import React, { useState , useEffect } from "react"
import { Grid,makeStyles} from '@material-ui/core';
import Form from "../../../shared/Form";
import { Input, Btn,Spinner } from "../../../controls";
import {Alert,notify,notifyErr} from "../../../components/alerts/alert"
import Header from "../../../components/header/header"
import { useHistory } from "react-router-dom"
import WifeParentTable from "./wifeParentTable"
import { createAPIEndpoint, ENDPIONTS } from "../../../api";



function WifeParentForm({id , type}) {

    
    //get array from end point
    const cst ={
      EmployeeFormID:"",
      listData: [
      ]
    } 
    const [customers , SetCustomers] =useState(cst)
    const [loading, setLoading] = useState(false);
    const [update, setupdate] = useState('g');
  
    
    useEffect(() => {
      createAPIEndpoint(ENDPIONTS.EMPLOYEES30).fetchByIdAndYear(id,type)
          .then(res => {
              SetCustomers(res.data.data)
              console.log(res.data.data)
  
          })
          .catch(err => console.log(err))
    }, [update])
      

  const getFreshModelObject ={
    EmployeeFormID:`${customers.EmployeeFormID}`,
    EmployeeNationalityID:0,
    Name30: "",
    Type30: "",
    Nationality30: 'مصري',
    Job30: '',
    Address30: '',


}
const [values, setValues] = useState(getFreshModelObject);
const [errors, setErrors] = useState({});
  const history = useHistory()


const handleInputChange = e => {
const { name, value } = e.target;

var today = new Date();
var birthDate = new Date(values.Part_BroBDay);
var age_now = today.getFullYear() - birthDate.getFullYear();
var m = today.getMonth() - birthDate.getMonth();
if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
{
    age_now--; 
}

setValues({
    ...values,
    [name]: value
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
      console.log(values);
      notify()
      //  resetFormControls()   
 
    }  
   }
   function handleNext(e){
    e.preventDefault()
    history.push(`/addSons/${id}`)
   }

    return (
      <>
        <Form onSubmit={handleSubmit} >
        <Grid container spacing={1}>
             <Header>
              إدخل بيانات  والد الزوجه 

              </Header>
              {/* name */}
              <Grid item item  xs={12} sm={6} md={4} lg={4} >
                <Input
                autoFocus
                   name="wName"
                   label="  الاسم بالكامل  "
                   value={values.wName}
                   error={errors.wName}
                   onChange={handleInputChange}
                   type= "text"
                />
  
              </Grid>
        
              {/* date of birth */}
              <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input className="dateInput"
                     name="wBirth"
                     label="تاريخ الميلاد"
                     value={values.wBirth}
                     error={errors.wBirth}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>

             {/* age   */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="wAge"
                    label="السن"
                    value={values.wAge}
                    error={errors.wAge}
                    type= "number"

                    onChange={handleInputChange}
            />
        
             </Grid> 
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="wNationalID"
                     label="الرقم القومي"
                     value={values.wNationalID}
                     error={errors.wNationalID}
                     onChange={handleInputChange}
                     type= "number"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="wJob"
                     label=" الوظيفه"
                     value={values.wJob}
                     error={errors.wJob}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
      </Grid>  
 
         <Btn
              disabled={loading}
              >
                        {loading ? (
                <Spinner/>
           ): ('')}
              إضافه  
            </Btn>
       
        </Form>
        <WifeParentTable
           customers={customers}
          setupdate = {setupdate}
        />
        <div
          style={{marginTop:"20px", textAlign:'center', width:'100%'}}
        >
        <Btn
            size="large"
            color="primary"
            onClick={handleNext}
            >
                الصفحه التاليه 
         </Btn>
         </div>
        </>
             
    )
}

export default WifeParentForm
