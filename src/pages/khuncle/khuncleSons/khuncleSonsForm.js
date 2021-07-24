import React, { useState,useEffect , useContext,useRef} from "react"
import { Grid} from '@material-ui/core';
import Form from "../../../shared/Form";
import { Input, Btn,Spinner  ,Select} from "../../../controls";
import {Alert,notify,notifyErr} from "../../../components/alerts/alert"
import { createAPIEndpoint, ENDPIONTS } from "../../../api";
import Header from "../../../components/header/header"
import { useHistory } from "react-router-dom"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UncleKhSonsTable from "./khuncleSonsTable"
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
  Employee23ID:"",
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
  createAPIEndpoint(ENDPIONTS.EMPLOYEES21).fetchByIdAndYear(id,type)
  .then(res => {

  //fetch all data for uncle sons

  createAPIEndpoint(ENDPIONTS.EMPLOYEES23).fetchByIdAndYear(id,type)
      .then(res => {
          SetCustomers(res.data.data)
          console.log(res.data.data)

      })
    })
      .catch(err => console.log(err))
      /// kh uncle compo box

  createAPIEndpoint(ENDPIONTS.EMPLOYEES21).fetchByIdAndYear(id,type)
  .then(res => {
           /// fEtch uncle data
      var parentArray = [] 
      res.data.data.listData.forEach((item ,idx) => {
        parentArray.push(
          {DepartmentID: item.Name21 , DepartmentName:item.Name21},
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
  // Name23: this.Job,
  Address: "",
  Job: "",
  Nationality23: 'مصري',
  Age23:'',
  BDay23: '',
  uncle:"",
  name:"",
}
const [values, setValues] = useState(getFreshModelObject);
const [errors, setErrors] = useState({});
const [nammm, setName] = useState({Name23 : ""});
  const history = useHistory()


const handleInputChange = e => {
const { name, value } = e.target;

var today = new Date();
var birthDate = new Date(values.BDay23);
var age_now = today.getFullYear() - birthDate.getFullYear();
var m = today.getMonth() - birthDate.getMonth();
if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
{
    age_now--; 
}

setValues({
    ...values,
    [name]: value,
    Name23 :`${values.name}  ${values.uncle}  `,
    Age23:age_now,
    UserID:UserID,

})
}

const validateForm = () => {
let temp = {};
temp.name = values.name != "" ? "" : "لو سمحت املا البيانات";
temp.wBirth = values.wBirth != "" ? "" : "لو سمحت املا البيانات";
temp.wAge = values.wAge != "" ? "" : "لو سمحت املا البيانات.";
temp.Nationality23 = values.Nationality23 != "" ? "" : "لو سمحت املا البيانات.";
temp.uncle = values.uncle != "" ? "" : "لو سمحت املا البيانات";
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
      createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES23).createPrison( customers.EmployeeFormID, "0" ,values)
      .then(res => {
          setLoading(false)
          notify()
          setupdate('dd')
          resetFormControls();
          console.log(res);
          SetCustomers(res.data.data)

      })
      .then(res => {
        handlehistory( action.ADD , 'بيانات   أولاد الاخوال ' ,  "  اضافه  بيانات أولاد الاخوال    ")
      })
        .catch(function (response) {
          //handle error
          //  notifyErr()
         setLoading(false)
         notify()
         setupdate(true)
         resetFormControls()

          console.log(response);
        });  
 
    } 
   }
   function handleNext(e){
    e.preventDefault()
    history.push(`/AddUnts/${id}/${type}`)
   }

    return (
      <>
        <Form onSubmit={handleSubmit} >
        <Grid container spacing={1}>
             <Header>
                  أولاد الاخوال 

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
                  label="اختار خال"
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
                     name="BDay23"
                     label="تاريخ الميلاد"
                     value={values.BDay23}
                    //  error={errors.BDay24}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>
 
             {/* جهه الميلاد */}
             {/* <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="Age23"
                    label=" السن"
                    value={values.Age23}
                    error={errors.Age23}
                    type= "text"

                    onChange={handleInputChange}
            />
        
             </Grid>  */}
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Nationality23"
                     label=" الجنسيه"
                     value={values.Nationality23}
                     error={errors.Nationality23}
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
        <UncleKhSonsTable
              customers={customers}
              SetCustomers = {SetCustomers}
        />

<div style={{display:"none"}}>  
              <ComponentToPrint           
              Table={UncleKhSonsTable}
              customers={customers}
              SetCustomers = {SetCustomers}
              title={'  بيانات   أولاد  الاخوال'}
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
