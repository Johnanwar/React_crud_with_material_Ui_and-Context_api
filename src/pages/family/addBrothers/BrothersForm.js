import React, { useState , useEffect , useRef ,useContext} from "react"
import { Grid} from '@material-ui/core';
import Form from "../../../shared/Form";
import { Input, Btn,Spinner ,Select} from "../../../controls";
import {Alert,notify,notifyErr} from "../../../components/alerts/alert"
import Header from "../../../components/header/header"
import { useHistory } from "react-router-dom"
import BrothersTable from "./BrothersTable"
import { createAPIEndpoint, ENDPIONTS } from "../../../api";
import PrintButton  from '../../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../../print/react-to-print';
import {HistoryContext} from '../../../contexts/historyContext'


function BrothersForm({id , type}) {
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
    const [uncle, setUncle] = useState([])
    const [remove, setRemove] = useState(true);

    
    useEffect(() => {
      createAPIEndpoint(ENDPIONTS.EMPLOYEES13).fetchByIdAndYear(id,type)
          .then(res => {
              SetCustomers(res.data.data);
              console.log(res.data.data);
  
          })
          .catch(err => console.log(err));

              // fetch  parent   createAPIEndpoint(ENDPIONTS.EMPLOYEES12).fetchByIdAndYear(id,type)
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

    // fetch  parent 

  

  const getFreshModelObject ={
    EmployeeFormID:`${customers.EmployeeFormID}`,
    EmployeeBrotherID:0,
    BrotherName: "",
    BrotherBDay:"",
    BrotherAge:"",
    BrotherAddress:"",
    BrotherNationality: 'مصري',
    BrotherJob:"",
    BrotherType:"شقيق",
    uncle:"",
    name:"",


}
const [values, setValues] = useState(getFreshModelObject);
const [errors, setErrors] = useState({});
  const history = useHistory()


const handleInputChange = e => {
const { name, value } = e.target;

var today = new Date();
var birthDate = new Date(values.BrotherBDay);
var age_now = today.getFullYear() - birthDate.getFullYear();
var m = today.getMonth() - birthDate.getMonth();
if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
{
    age_now--; 
}

setValues({
    ...values,
    [name]: value,
    BrotherName :`${values.name}  ${values.uncle}  `,
    BrotherAge:age_now,
    UserID:UserID,

})
}

const validateForm = () => {
let temp = {};
temp.BrotherName = values.BrotherName != "" ? "" : "لو سمحت املا البيانات";
temp.BrotherBDay = values.BrotherBDay != "" ? "" : "لو سمحت املا البيانات";
temp.wAge = values.wAge != "" ? "" : "لو سمحت املا البيانات.";
temp.BrotherNationality = values.BrotherNationality != "" ? "" : "لو سمحت املا البيانات.";
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

      createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES13).createPrison( customers.EmployeeFormID, "0" ,values)
      .then(res => {
          setLoading(false)
          notify()
          resetFormControls();
          console.log(res);
          SetCustomers(res.data.data)
      })
      .then(res => {
        handlehistory( action.ADD , 'بيانات   الاخوه ' ,  "  اضافه  بيانات الاخوه    ")
      })
        .catch(function (response) {
           notifyErr()
         setLoading(false)
          console.log(response);
        });  
 
    } 
     console.log(values);
   }
   function handleNext(e){
    e.preventDefault()
    history.push(`/AddSister/${id}/${type}`)
   }

    return (
      <>
        <Form onSubmit={handleSubmit} >
        <Grid container spacing={1}>
             <Header>
               بيانات   الاخوه يذكر ان كان شقيق او غير شقيق

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
                     name="BrotherType"
                     label=" شقيق او غير شقيق"
                     value={values.BrotherType}
                     error={errors.BrotherNationality}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>


{/* 
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Select
                  label="شقيق او غير شقيق"
                  name="Gender"
                    value={
                      values.BrotherType != null  ?
                      (Typee.find(x => x.DepartmentID == values.BrotherType).DepartmentID)
                      :("")
                    }
                  onChange={handleInputChange}
                  options={Typee}
                  // error={errors.management}

                  />
                </Grid> */}
        
              {/* date of birth */}
              <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input className="dateInput"
                     name="BrotherBDay"
                     label="تاريخ الميلاد"
                     value={values.BrotherBDay}
                     error={errors.BrotherBDay}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>
      
             {/* age   */}
             {/* <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="BrotherAge"
                    label="السن"
                    value={values.BrotherAge}
                    error={errors.BrotherAge}
                    type= "number"

                    onChange={handleInputChange}
            />
        
             </Grid>  */}


      
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="BrotherNationality"
                     label=" الجنسيه"
                     value={values.BrotherNationality}
                     error={errors.BrotherNationality}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="BrotherJob"
                     label=" الوظيفه"
                     value={values.BrotherJob}
                    //  error={errors.BrotherJob}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
            
            <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input 
                     name="BrotherAddress"
                     label=" محل الاقامه"
                     value={values.BrotherAddress}
                    //  error={errors.BrotherAddress}
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
        <BrothersTable
           customers={customers}
           SetCustomers = {SetCustomers}
        />

<div style={{display:"none"}}>
    <ComponentToPrint
              
              Table={BrothersTable}
              customers={customers}
              SetCustomers = {SetCustomers}
              title={'  بيانات    الاخوه'}
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

export default BrothersForm
