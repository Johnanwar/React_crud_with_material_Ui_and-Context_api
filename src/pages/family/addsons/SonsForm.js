import React, { useState , useEffect , useRef, useContext } from "react"
import { Grid,makeStyles} from '@material-ui/core';
import Form from "../../../shared/Form";
import { Input,Select, Btn,Spinner } from "../../../controls";
import {notify,notifyErr} from "../../../components/alerts/alert"
import Header from "../../../components/header/header"
import { useHistory } from "react-router-dom"
import SonsTable from "./SonsTable"
import { createAPIEndpoint, ENDPIONTS } from "../../../api";
import PrintButton  from '../../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../../print/react-to-print';
import {HistoryContext} from '../../../contexts/historyContext'


function SonsForm({id , type}) {
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
    const [uncle, setUncle] = useState([
      {DepartmentID: '' , DepartmentName:''},
    ])
    
    useEffect(() => {
      createAPIEndpoint(ENDPIONTS.EMPLOYEES11).fetchByIdAndYear(id,type)
          .then(res => {
              SetCustomers(res.data.data)
              console.log(res.data.data)
  
          })
          .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        /// fEtch uncle data
        createAPIEndpoint(ENDPIONTS.EMPLOYEES).fetchByIdAndYear(id,type)
        .then(res => {
            // console.log(res.data.data.listData)
            var parentArray = [] 
            // res.data.data.listData.forEach((item ,idx) => {
              parentArray.push(
                {DepartmentID: res.data.data.E_Name , DepartmentName:res.data.data.E_Name},
              )
              console.log(parentArray)
              setUncle(parentArray)
          //  })
      
        })
        .catch(err => console.log(err))


}, [])
      

  const getFreshModelObject ={
    EmployeeFormID:`${customers.EmployeeFormID}`,
    EmployeeKidID:0,
    KidName: "",
    KidBDay:"",
    KidAge:"",
    KidAddress:"",
    KidGender: "",
    KidNationality: 'مصري',
    KidJob:"",
    KidAge:"",

    uncle:"",
    name:"",

}
const [values, setValues] = useState(getFreshModelObject);
const [errors, setErrors] = useState({});
const [remove, setRemove] = useState(true);

  const history = useHistory()


const handleInputChange = e => {
const { name, value } = e.target;

var today = new Date();
var birthDate = new Date(values.KidBDay);
var age_now = today.getFullYear() - birthDate.getFullYear();
var m = today.getMonth() - birthDate.getMonth();
if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
{
    age_now--; 
}

setValues({
    ...values,
    [name]: value,
    KidAge:age_now,
    UserID:UserID,
    KidName :`${values.name} ${values.uncle}  `,

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

      createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES11).createPrison( customers.EmployeeFormID, "0" ,values)
      .then(res => {
          setLoading(false)
          notify()
          resetFormControls();
          console.log(res);
          SetCustomers(res.data.data)
      })
      .then(res => {
        handlehistory( action.ADD , '  بيانات الابناء  ' , "   اضافه  بيانات الابناء    ")
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
    history.push(`/Parents/${id}/${type}`)
   }
   
    return (
      <>
        <Form onSubmit={handleSubmit} >
        <Grid container spacing={1}>
             <Header>
              إدخل بيانات   الابناء 

              </Header>
              {/* name */}
              <Grid item item  xs={12} sm={6} md={4} lg={4} >
                <Input
                autoFocus
                   name="name"
                   label="  الاسم بالكامل  "
                   value={values.name}
                   error={errors.wName}
                   onChange={handleInputChange}
                   type= "text"
                />
  
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Select
                  label="اختار اب"
                  name="uncle"
           
                    // value={
                    //   values.uncle != null && values.uncle != '0'  && uncle.length  > 0  && uncle ?
                    //   (uncle.find(x => x.DepartmentID == values.uncle).DepartmentName)
                    //   :("")
                    // }
                  value={values.uncle}
                  onChange={handleInputChange}
                  options={uncle}
                  error={errors.uncl}

                  />
                </Grid>
        
              {/* date of birth */}
              <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input className="dateInput"
                     name="KidBDay"
                     label="تاريخ الميلاد"
                     value={values.KidBDay}
                    //  error={errors.KidBDay}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>


             {/* age   */}
             {/* <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="KidAge"
                    label="السن"
                    value={values.KidAge}
                    error={errors.KidAge}
                    type= "number"

                    onChange={handleInputChange}
            />
        
             </Grid>  */}
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="KidNationality"
                     label=" الجنسيه"
                     value={values.KidNationality}
                     error={errors.wNationalID}
                     onChange={handleInputChange}
                     type= "فصثءف"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="KidJob"
                     label=" الوظيفه"
                     value={values.KidJob}
                    //  error={errors.KidJob}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
            <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input 
                     name="KidAddress"
                     label=" محل الاقامه"
                     value={values.KidAddress}
                    //  error={errors.KidBDay}
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
        <SonsTable
           customers={customers}
           SetCustomers = {SetCustomers}
        />

<div style={{display:"none"}}>
    <ComponentToPrint
              
              Table={SonsTable}
              customers={customers}
              SetCustomers = {SetCustomers}
              title={'  بيانات   الابناء '}
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
                الصفحه التاليه 
         </Btn>
         </div>
        </>
             
    )
}

export default SonsForm
