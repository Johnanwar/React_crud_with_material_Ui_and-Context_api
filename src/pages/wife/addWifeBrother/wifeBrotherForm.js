import React, { useState , useEffect } from "react"
import { Grid,makeStyles} from '@material-ui/core';
import Form from "../../../shared/Form";
import { Input, Btn,Spinner ,Select } from "../../../controls";
import {Alert,notify,notifyErr} from "../../../components/alerts/alert"
import Header from "../../../components/header/header"
import { useHistory } from "react-router-dom"
import WifeBrotherTable from "./wifeBrotherTable"
import { createAPIEndpoint, ENDPIONTS } from "../../../api";
import {HistoryContext} from '../../../contexts/historyContext'



function WifeBrotherForm({id , type}) {

    
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

    useEffect(() => {
      createAPIEndpoint(ENDPIONTS.EMPLOYEES10).fetchByIdAndYear(id,type)
      .then(res => {
               /// fEtch uncle fateer dataa
          var parentArray = [] 
          res.data.data.listData.forEach((item ,idx) => {
            parentArray.push(
              {DepartmentID: item.FatherName , DepartmentName:item.FatherName},
            )
            console.log(parentArray)
            setUncle(parentArray)
         })
    
      })
      .catch(err => console.log(err))
    
    }, [])

    useEffect(() => {
      createAPIEndpoint(ENDPIONTS.EMPLOYEES16).fetchByIdAndYear(id,type)
          .then(res => {
              SetCustomers(res.data.data)
              console.log(res.data.data)
  
          })
          .catch(err => console.log(err))
          



    }, [])
      

    const getFreshModelObject ={
      EmployeeFormID:`${customers.EmployeeFormID}`,
      EmployeePart_BroID:0,
      Part_BroName: "",
      Part_BroBDay:"",
      Part_BroAge:"",
      Part_BroAddress:"",
      // KidGender: "",
      Part_BroNationality: 'مصري',
      Part_BroJob:"",
      uncle:"",
      name:"",
  
  
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
    [name]: value,
    Part_BroName :`${values.name}  ${values.uncle}  `,
    Part_BroAge:age_now,


})
}

const validateForm = () => {
let temp = {};
temp.name = values.name != "" ? "" : "لو سمحت املا البيانات";
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

      createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES16).createPrison( customers.EmployeeFormID, "0" ,values)
      .then(res => {
          setLoading(false)
          notify()
          setupdate('dd')
          resetFormControls();
          console.log(res);
      })
        .catch(function (response) {
          //handle error
           notifyErr()
         setLoading(false)
         setupdate(true)
        //  resetFormControls()

          console.log(response);
        });  
 
    } 
     console.log(values); 
 }
   function handleNext(e){
    e.preventDefault()
    history.push(`/AddWifeSisterHusband/${id}/${type}`)
   }

    return (
      <>
        <Form onSubmit={handleSubmit} >
        <Grid container spacing={1}>
             <Header>
             بيانات    اشقاء وشقيقات الزوجه

              </Header>
              {/* name */}
              <Grid item item  xs={12} sm={6} md={4} lg={4} >
                <Input
                autoFocus
                   name="name"
                   label="  الاسم بالكامل  "
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
                  error={errors.uncle}

                  />
                </Grid>
        
              {/* date of birth */}
              <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input className="dateInput"
                     name="Part_BroBDay"
                     label="تاريخ الميلاد"
                     value={values.Part_BroBDay}
                    //  error={errors.Part_BroBDay}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>
             <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input 
                     name="Part_BroAddress"
                     label=" محل الاقامه"
                     value={values.Part_BroAddress}
                    //  error={errors.Part_BroBDay}
                     type= "text"
                   onChange={handleInputChange}
                />       
             </Grid>

             {/* age   */}
             {/* <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="wAge"
                    label="السن"
                    value={values.wAge}
                    error={errors.wAge}
                    type= "number"

                    onChange={handleInputChange}
            />
        
             </Grid>  */}
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Part_BroNationality"
                     label=" الجنسيه"
                     value={values.Part_BroNationality}
                     error={errors.wNationalID}
                     onChange={handleInputChange}
                     type= "فصثءف"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Part_BroJob"
                     label=" الوظيفه"
                     value={values.Part_BroJob}
                    //  error={errors.Part_BroJob}
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
        <WifeBrotherTable
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

export default WifeBrotherForm
