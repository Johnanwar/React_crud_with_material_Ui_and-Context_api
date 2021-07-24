import React, { useState , useEffect , useRef , useContext} from "react"
import { Grid} from '@material-ui/core';
import Form from "../../../shared/Form";
import { Input, Btn,Spinner } from "../../../controls";
import {Alert,notify,notifyErr} from "../../../components/alerts/alert"
import Header from "../../../components/header/header"
import { useHistory } from "react-router-dom"
import SisterHusbTable from "./sisterHusbTable"
import { createAPIEndpoint, ENDPIONTS } from "../../../api";
import PrintButton  from '../../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../../print/react-to-print';
import {HistoryContext} from '../../../contexts/historyContext'


function SisterHusbForm({id , type}) {
  const { handlehistory ,action ,UserID} = useContext(HistoryContext)

      ////printing 
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
    //get array from end point
    const cst ={
      EmployeeFormID:"",
      listData: [
      ]
    } 
    const [customers , SetCustomers] =useState(cst)
    const [loading, setLoading] = useState(false);
    const [remove, setRemove] = useState(true);
  
    
    useEffect(() => {
      createAPIEndpoint(ENDPIONTS.EMPLOYEES15).fetchByIdAndYear(id,type)
          .then(res => {
              SetCustomers(res.data.data)
              console.log(res.data.data)
              
  
          })
          .catch(err => console.log(err))
    }, [])
      

  const getFreshModelObject ={
    EmployeeFormID:`${customers.EmployeeFormID}`,
    EmployeeSisterHID:0,
    SisterHName: "",
    SisterHBDay:"",
    SisterHAge:"",
    SisterHAddress:"",
    // KidGender: "",
    SisterHNationality: 'مصري',
    SisterHJob:"",


}
const [values, setValues] = useState(getFreshModelObject);
const [errors, setErrors] = useState({});
  const history = useHistory()


const handleInputChange = e => {
const { name, value } = e.target;

var today = new Date();
var birthDate = new Date(values.SisterHBDay);
var age_now = today.getFullYear() - birthDate.getFullYear();
var m = today.getMonth() - birthDate.getMonth();
if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
{
    age_now--; 
}

setValues({
    ...values,
    [name]: value,
    SisterHAge:age_now,
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
    if (validateForm()) {
      e.preventDefault()
      setLoading(true)

      createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES15).createPrison( customers.EmployeeFormID, "0" ,values)
      .then(res => {
          setLoading(false)
          notify()
          resetFormControls();
          console.log(res);         
           SetCustomers(res.data.data)
      })
      .then(res => {
        handlehistory( action.ADD , 'بيانات   ازواج الاخوات ' ,  "  اضافه  بيانات ازواج الاخوات    ")
      })
        .catch(function (response) {
          //handle error
           notifyErr()
         setLoading(false)

          console.log(response);
        });  
 
    } 
     console.log(values);
   }
   
   function handleNext(e){
    e.preventDefault()
    history.push(`/AddBrothersWifes/${id}/${type}`)
   }

    return (
      <>
        <Form onSubmit={handleSubmit} >
        <Grid container spacing={1}>
             <Header>
               بيانات   ازواج الاخوات 

              </Header>
              {/* name */}
     
              <Grid item item  xs={12} sm={6} md={4} lg={4} >
                <Input
                autoFocus
                   name="SisterHName"
                   label="  الاسم بالكامل  "
                   value={values.SisterHName}
                   error={errors.wName}
                   onChange={handleInputChange}
                   type= "text"
                />
  
              </Grid>
        
              {/* date of birth */}
              <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input className="dateInput"
                     name="SisterHBDay"
                     label="تاريخ الميلاد"
                     value={values.SisterHBDay}
                    //  error={errors.SisterHBDay}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>
        

             {/* age   */}
             {/* <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="SisterHAge"
                    label="السن"
                    value={values.SisterHAge}
                    // error={errors.wAge}
                    type= "number"

                    onChange={handleInputChange}
            />
        
             </Grid>  */}
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="SisterHNationality"
                     label=" الجنسيه"
                     value={values.SisterHNationality}
                     error={errors.wNationalID}
                     onChange={handleInputChange}
                     type= "فصثءف"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="SisterHJob"
                     label=" الوظيفه"
                     value={values.SisterHJob}
                    //  error={errors.SisterHJob}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
            <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input 
                     name="SisterHAddress"
                     label=" محل الاقامه"
                     value={values.SisterHAddress}
                    //  error={errors.SisterHBDay}
                     type= "text"
                   onChange={handleInputChange}
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
        <SisterHusbTable
           customers={customers}
           SetCustomers = {SetCustomers}
        />

<div style={{display:"none"}}>
    <ComponentToPrint
              
              Table={SisterHusbTable}
              customers={customers}
              SetCustomers = {SetCustomers}
              title={'  بيانات    ازواج الاخوات'}
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

        <div style={{marginTop:"20px", textAlign:'center', width:'100%'}}
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

export default SisterHusbForm
