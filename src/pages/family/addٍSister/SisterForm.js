import React, { useState , useEffect, useRef,useContext} from "react"
import { Grid,makeStyles} from '@material-ui/core';
import Form from "../../../shared/Form";
import { Input, Btn,Spinner , Select} from "../../../controls";
import {Alert,notify,notifyErr} from "../../../components/alerts/alert"
import Header from "../../../components/header/header"
import { useHistory } from "react-router-dom"
import SisterTable from "./SisterTable"
import { createAPIEndpoint, ENDPIONTS } from "../../../api";
import PrintButton  from '../../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../../print/react-to-print';
import {HistoryContext} from '../../../contexts/historyContext'


function SisterForm({id , type}) {
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
    const [update, setupdate] = useState('g');
    const [uncle, setUncle] = useState([])
    const [remove, setRemove] = useState(true);

    
    useEffect(() => {
      createAPIEndpoint(ENDPIONTS.EMPLOYEES14).fetchByIdAndYear(id,type)
          .then(res => {
              SetCustomers(res.data.data)
              console.log(res.data.data)
              
  
          })
          .catch(err => console.log(err))
    }, [])

        // fetch  parent 
useEffect(() => {
  createAPIEndpoint(ENDPIONTS.EMPLOYEES12).fetchByIdAndYear(id,type)
  .then(res => {
      var parentArray = [] ;
      var objArr = [];
      const fatherobj =res.data.data.listData.find(x => x.ParentType = "الاب")
      objArr.push(fatherobj)
      objArr.forEach((item ,idx) => {
        parentArray.push(
          {DepartmentID: item.ParentName , DepartmentName:item.ParentName},
        )
        // console.log(parentArray)
        setUncle(parentArray)
     })

  })
  .catch(err => console.log(err))

}, [])
      

  const getFreshModelObject ={
    EmployeeFormID:`${customers.EmployeeFormID}`,
    EmployeeSisterID:0,
    SisterName: "",
    SisterBDay:"",
    SisterAge:"",
    SisterAddress:"",
    // KidGender: "",
    SisterNationality: 'مصري',
    SisterJob:"",
    uncle:"",
    name:"",
    SisterType:"شقيقه"

}
const [values, setValues] = useState(getFreshModelObject);
const [errors, setErrors] = useState({});
  const history = useHistory()


const handleInputChange = e => {
const { name, value } = e.target;

var today = new Date();
var birthDate = new Date(values.SisterBDay);
var age_now = today.getFullYear() - birthDate.getFullYear();
var m = today.getMonth() - birthDate.getMonth();
if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
{
    age_now--; 
}

setValues({
    ...values,
    [name]: value,
    SisterName :`${values.name}  ${values.uncle}  `,
    SisterAge:age_now,
    UserID:UserID,
})
}

const validateForm = () => {
let temp = {};
temp.SisterName = values.SisterName != "" ? "" : "لو سمحت املا البيانات";
temp.SisterBDay = values.SisterBDay != "" ? "" : "لو سمحت املا البيانات";
temp.wAge = values.wAge != "" ? "" : "لو سمحت املا البيانات.";
temp.SisterNationality = values.SisterNationality != "" ? "" : "لو سمحت املا البيانات.";
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

      createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES14).createPrison( customers.EmployeeFormID, "0" ,values)
      .then(res => {
          setLoading(false)
          notify()
          resetFormControls();
          console.log(res);         
           SetCustomers(res.data.data)
      })
      .then(res => {
        handlehistory( action.ADD , 'بيانات   الاخوات  ' ,  "  اضافه  بيانات الاخوات     ")
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
    history.push(`/SisterHusb/${id}/${type}`)
   }

    return (
      <>
        <Form onSubmit={handleSubmit} >
        <Grid container spacing={1}>
             <Header>
               بيانات   الاخوات  يذكر ان كانت    شقيقه او غير شقيقه

              </Header>
              {/* name */}
     
              <Grid item item  xs={12} sm={6} md={4} lg={4} >
                <Input
                autoFocus
                   name="name"
                   label="  الاسم   "
                   value={values.name}
                   error={errors.SisterName}
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
                  // error={errors.uncle}

                  />
                </Grid>





                <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="SisterType"
                     label=" شقيقه او غير شقيقه"
                     value={values.SisterType}
                    //  error={errors.BrotherNationality}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>

                
        
              {/* date of birth */}
              <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input className="dateInput"
                     name="SisterBDay"
                     label="تاريخ الميلاد"
                     value={values.SisterBDay}
                     error={errors.SisterBDay}
                     type= "date"
                   onChange={handleInputChange}
                />       
     </Grid>

             {/* age   */}
             {/* <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="SisterAge"
                    label="السن"
                    value={values.SisterAge}
                    // error={errors.wAge}
                    type= "number"

                    onChange={handleInputChange}
            />
        
             </Grid>  */}
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="SisterNationality"
                     label=" الجنسيه"
                     value={values.SisterNationality}
                     error={errors.SisterNationality}
                     onChange={handleInputChange}
                     type= "فصثءف"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="SisterJob"
                     label=" الوظيفه"
                     value={values.SisterJob}
                    //  error={errors.SisterJob}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
          
             <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input 
                     name="SisterAddress"
                     label=" محل الاقامه"
                     value={values.SisterAddress}
                     error={errors.SisterAddress}
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
        <SisterTable
           customers={customers}
           SetCustomers = {SetCustomers}
        />

<div style={{display:"none"}}>
    <ComponentToPrint
              
              Table={SisterTable}
              customers={customers}
              SetCustomers = {SetCustomers}
              title={'  بيانات    الاخوات'}
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

export default SisterForm
