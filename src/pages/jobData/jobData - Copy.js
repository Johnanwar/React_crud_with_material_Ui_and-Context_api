import React, { useState ,useEffect,useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import { Container,Grid,makeStyles,Modal,Backdrop,Fade,Button} from '@material-ui/core';
import Form from "../../shared/Form";
import { Input, Select, Btn } from "../../controls";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from "../../components/nav/nav"
import RightNav from "../../components/nav/rightNav"
import Header from "../../components/header/header"
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import AddBoxIcon from '@material-ui/icons/AddBox';

const notify = () => toast.success("تم إضافه بيانات الوظيفه");
function JobData({match}) {

  const history = useHistory()

// input object model
  const getFreshModelObject ={
      EmployeeID:"",
      EmployeeCode : "",
      EmployeeEnglishName: "",
      NationalID: "",
      EmployeeName: "",
      gender: "",
      JobPosition:"",
      BbDate:"2021-04-07",
      JobName:"",
  }
    // initial model for multi inputs Other sources of income
  const  otherIncomes =  {incomesList:[
    { incomeSource:"00"},
  ]}

const [values, setValues] = useState(getFreshModelObject);
const [sourceIncome, setSourceIncome] = useState(otherIncomes);
const [errors, setErrors] = useState({});

/// add new input for multi inputs Other sources of income
    const AddAnotherSourse = () => {
    setSourceIncome(
        (prevState) => ({
            incomesList: [...prevState.incomesList, 
                {
                  incomeSource:""
                },
            ],
        }))
    }

/// get data from api
// useEffect(() => {
//   createAPIEndpoint(ENDPIONTS.EMPLOYEES).fetchById(match.params.id)
//       .then(res => {
//           console.log(res.data.data)
//           setValues(res.data.data)
//       })
//       .catch(err => console.log(err))
// }, [])

// onChange for object inputs 
const handleInputChange = e => {
  const { name, value } = e.target
  setValues({
      ...values,
      [name]: value
  })
}
//onCahange for multi inputs
const handleInputChangeInc = e => {
    let incList = [...sourceIncome.incomesList]
    incList[e.target.id][e.target.name] = e.target.value;
 setSourceIncome({
   incomesList:incList})

}

//form valdation
const validateForm = () => {
  let temp = {};
  // temp.management = values.management != "" ? "" : "لو سمحت املا البيانات";
  // temp.EmployeeCode  = values.EmployeeCode  != "" ? "" : "لو سمحت املا البيانات";
  // temp.year = values.year != "" ? "" : "لو سمحت املا البيانات.";
  // temp.EmployeeName = values.EmployeeName != "" ? "" : "لو سمحت املا البيانات.";
  // temp.nationalID = values.nationalID != "" ? "" : "لو سمحت املا البيانات";
  setErrors({ ...temp });
  return Object.values(temp).every(x => x === "");
}
//reset form
const resetFormControls = () => {
  setValues(getFreshModelObject);
}

    /// submit form
     function handleSubmit(e) {
      e.preventDefault()
      if (validateForm()) {
        // notify()
        // history.push(`/SecondJobData/${match.params.id}`)
        console.log(values);
        console.log(sourceIncome);
       
        //  resetFormControls()   
   
      }  
     }

    return (
    <>
     <Nav/>        
      <Grid container spacing={1}
          style={{overflowX:"hidden", margin:"0 -10px"}}
      >
      {/* right naaaaaaaaaaaaav */}
      <Grid item xs={12} sm={3} md={3} lg={3}>
        <RightNav
          num={match.params.id}
        />
      </Grid>
      {/* grid for body  */}
     <Grid item xs={12} sm={9} md={9} lg={9}>
       <Form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
         <Header> إدخل   بيانات الوظيفه  </Header>
          {/* المؤهل الدراسي  */}
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Input
                name="JobName"
                label=" المؤهل الدراسي"
                value={values.JobName}
                error={errors.EmployeeCode}
                onChange={handleInputChange}
                type= "text"
            />
          </Grid>
          {/* تاريخ الحصول على المؤهل  */}
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Input
                name="BbDate"
                label="  تاريخ الحصول على المؤهل  "
                value={values.BbDate}
              //  error={errors.EmployeeCode}
                onChange={handleInputChange}
                type= "date"
            />
          </Grid>         
          {/*الوظيفه الحاليه */}
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Input
                name="JobPosition"
                label=" الوظيفه الحاليه"
                value={values.JobPosition}
                //  error={errors.DestinationID}
              type= "number"
              onChange={handleInputChange}
            />          
          </Grid>           
                {/*تليفون العمل */}
                        <Grid item  xs={12} sm={6} md={4} lg={4}>  
                 <Input className="dateInput"
                     name="EmployeeName"
                     label="تليفون العمل"
                     value={values.EmployeeName}
                    //  error={errors.BbDate}
                     type= "text"
                   onChange={handleInputChange}
                  />       
            </Grid>                
           {/* الخط الداخلي */}
           <Grid item item  xs={12} sm={6} md={4} lg={4}>
                   <Input
                     name=""
                     label="الخط الداخلي "
                    //  value={values.wName}
                    //  error={errors.wName}
                    onChange={handleInputChange}
                    type= "text"
                   />
           </Grid>    
          {/* الدرجه الحاليه */}
          <Grid item item  xs={12} sm={6} md={4} lg={4} >
            <Input
              name=""
              label=" الدرجه الحاليه "
            //  value={values.wName}
            //  error={errors.wName}
            onChange={handleInputChange}
            type= "text"
            />
          </Grid>
          {/*  المرتب الحالي*/}
          <Grid item item  xs={12} sm={6} md={4} lg={4} >
            <Input
              name=""
              label=" المرتب الحالي "
            //  value={values.wName}
            //  error={errors.wName}
            onChange={handleInputChange}
            type= "text"
            />
          </Grid>
          {/*  مصادر دخل أخرى*/}
           {sourceIncome.incomesList ? (<>
             { sourceIncome.incomesList.map((inc, idx) => (
              <Grid item item  xs={12} sm={12} md={12} lg={12} >
                  <Input
                    name="incomeSource"
                    label="  مصادر دخل أخرى "
                    id={idx}
                    value={inc.incomeSource}
                  //  error={errors.wName}
                  onChange={handleInputChangeInc}
                  type= "text"
                  />
              </Grid>           
                 ))}
               
          
          <div
          style={{textAlign:"left" , width:"100%"}}  
          >
             <Btn onClick={AddAnotherSourse}
           type="button">  
            <AddBoxIcon 
            style={{margin:"0 0 0 15px" , color:"#3a3a39"}}          
             />
            إضافه  مصادر دخل أخرى
            </Btn>
          </div>
        
           </>): (<></>)}

     
   
             <Btn
              size="large"
              color="primary">
                إضافه ومتابعه 
            </Btn>
         </Grid>  
       </Form>
      </Grid>
    </Grid>
    </>
    )
}

export default JobData
