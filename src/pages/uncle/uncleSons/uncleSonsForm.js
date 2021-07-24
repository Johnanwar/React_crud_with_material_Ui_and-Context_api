import React, { useState,useEffect ,useContext, useRef} from "react"
import { Grid} from '@material-ui/core';
import Form from "../../../shared/Form";
import { Input, Btn,Spinner , Select } from "../../../controls";
import {Alert,notify,notifyErr} from "../../../components/alerts/alert"
import { createAPIEndpoint, ENDPIONTS } from "../../../api";
import Header from "../../../components/header/header"
import { useHistory } from "react-router-dom"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UncleSonsTable from "./uncleSonsTable"
import PrintButton  from '../../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../../print/react-to-print';
import {HistoryContext} from '../../../contexts/historyContext'


function UncleSonsForm({id , type}) {
  const { handlehistory ,action ,UserID} = useContext(HistoryContext)
   
  ////printing 
     const componentRef = useRef();
     const handlePrint = useReactToPrint({
       content: () => componentRef.current,
     })

const cst ={
  Employee20ID:"",
  EmployeeFormID:"",
  listData: [
  ]
} 
const [customers , SetCustomers] =useState(cst)
const [loading, setLoading] = useState(false);
const [uncle, setUncle] = useState([
  {DepartmentID: '' , DepartmentName:''},
])
    const [remove, setRemove] = useState(true);

useEffect(() => {
  //fetch all data for uncle sons
  createAPIEndpoint(ENDPIONTS.EMPLOYEES20).fetchByIdAndYear(id,type)
      .then(res => {
          SetCustomers(res.data.data)
          // console.log(res.data.data)

      })


        /// fEtch uncle data
        createAPIEndpoint(ENDPIONTS.EMPLOYEES18).fetchByIdAndYear(id,type)
        .then(res => {
            // console.log(res.data.data.listData)
            var parentArray = [] 
            res.data.data.listData.forEach((item ,idx) => {
              parentArray.push(
                {DepartmentID: item.Name18 , DepartmentName:item.Name18},
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
  name: "",
  Address: "",
  Job: "",
  Nationality20: 'مصري',
  Age20:'',
  BDay20: '',
  uncle:"",
  Name20:"",
}
const [values, setValues] = useState(getFreshModelObject);
const [errors, setErrors] = useState({});
  const history = useHistory()


const handleInputChange = e => {
const { name, value } = e.target
var today = new Date();
var birthDate = new Date(values.BDay20);
var age_now = today.getFullYear() - birthDate.getFullYear();
var m = today.getMonth() - birthDate.getMonth();
if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
{
    age_now--; 
}


setValues({
    ...values,
    [name]: value,
    Name20 :`${values.name} ${values.uncle}  `,
    Age20:age_now,
    UserID:UserID,
})
}

const validateForm = () => {
let temp = {};
temp.name = values.name != "" ? "" : " من فضلك ادخل الاسم";
temp.uncl = values.uncl != "" ? "" : "من فضلك ادخل اسم الاب";
temp.Nationality20 = values.Nationality20 != "" ? "" : "لو سمحت املا البيانات.";
// temp.wNationalID = values.wNationalID != "" ? "" : "لو سمحت املا البيانات.";
// temp.wJob = values.wJob != "" ? "" : "لو سمحت املا البيانات";
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

      createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES20).createPrison( customers.EmployeeFormID, "0" ,values)
      .then(res => {
          setLoading(false)
          notify()
          SetCustomers(res.data.data)
          resetFormControls();
         
      })
      .then(res => {
        handlehistory( action.ADD , 'بيانات   أولاد الاعمام ' ,  "  اضافه  بيانات أولاد الاعمام    ")
      })
        .catch(function (response) {
          //handle error
           notifyErr()
         setLoading(false)
        //  notify()
          console.log(response);
        });  
 
    } 
     console.log(values);
   }
   function handleNext(e){
    e.preventDefault()
    history.push(`/AddKhUncle/${id}/${type}`)
   }

    return (
      <>
        <Form onSubmit={handleSubmit} >
        <Grid container spacing={1}>
             <Header>
                  أولاد الاعمام 

              </Header>
              {/* name */}
              <Grid item item  xs={12} sm={6} md={4} lg={4} >
                <Input
                autoFocus
                   name="name"
                   label="  الاسم   "
                   value={values.name}
                   error={errors.name}
                   onChange={handleInputChange}
                   type= "text"
                />
  
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Select
                  label="اختار عم"
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
                     name="BDay20"
                     label="تاريخ الميلاد"
                     value={values.BDay20}
                    //  error={errors.BDay24}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>
             
 
             {/* جهه الميلاد */}
             {/* <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="Age20"
                    label=" السن"
                    value={values.Age20}
                    // error={errors.Age20}
                    type= "number"

                    onChange={handleInputChange}
            />
        
             </Grid>  */}
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Nationality20"
                     label=" الجنسيه"
                     value={values.Nationality20}
                     error={errors.Nationality20}
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
        <UncleSonsTable
              customers={customers}
              SetCustomers = {SetCustomers}
        />

<div style={{display:"none"}}> 
    <ComponentToPrint           
              Table={UncleSonsTable}
              customers={customers}
              SetCustomers = {SetCustomers}
              title={'  بيانات    أولاد  الاعمام'}
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

export default UncleSonsForm
