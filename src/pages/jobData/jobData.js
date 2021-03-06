import React, { useState ,useEffect,useRef,useContext } from "react"
import { useHistory } from "react-router-dom"
import { Grid,} from '@material-ui/core';
import Form from "../../shared/Form";
import { Input,Btn,Spinner } from "../../controls";
import {Alert,notify,notifyErr} from "../../components/alerts/alert"
import Header from "../../components/header/header"
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import AddBoxIcon from '@material-ui/icons/AddBox';
import JobDataTable from "./jobDataTable"
import PrintButton  from '../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../print/react-to-print'
import {HistoryContext} from '../../contexts/historyContext'


function JobData({match}) {

  const history = useHistory()
  const { handlehistory , action ,UserID  } = useContext(HistoryContext)
  // const UserID = localStorage.getItem('UserID');

    ////printing 
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

// input object model
  const getFreshModelObject ={
    EmployeeCertID:"",
    EmployeeFormID:"",
      JobName:"",
      WorkPhone:"",
      WorkLine:"",
      JobTitle:"",
      CurrentSalary:"",  
      OtherIncomes:[
        ""
  ],
  Certificates:[
   { CerDate:"" , Certificate:""}
  ]
  }
    // initial model for multi inputs Other sources of income
  const  otherIncomes =  {OtherIncomes:[
    { incomeSource:"00",},
  ]}

const [values, setValues] = useState(getFreshModelObject);
const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);


/// add new input for multi inputs Other sources of income
    const AddAnotherSourse = () => {
      if(values.OtherIncomes.length < 5){
       setValues(
        (prevState) => ({
          ...values,
            OtherIncomes: [...prevState.OtherIncomes, 
                ""   
            ],
        }))
    }
  }
    const AddAnotherSertficate = () => {
      if(values.Certificates.length < 5){

      setValues(
          (prevState) => ({
            ...values,
            Certificates: [...prevState.Certificates, 
              {
                CerDate :"",
                Certificate :"",
            },
              ],
          }))
      }
    }

/// get data from api
useEffect(() => {
  createAPIEndpoint(ENDPIONTS.EMPLOYEES2).fetchByIdAndYear(match.params.id,match.params.type)
      .then(res => {
          console.log(res.data.data)
          setValues(res.data.data)
      })
      .catch(err => console.log(err))
}, [])

// onChange for object inputs 
const handleInputChange = e => {
  const { name, value } = e.target
  let incList = [...values.OtherIncomes]
  if (["incomeSource"].includes(e.target.name)) {
   
    incList[e.target.id] = e.target.value;
  }
  let serticate = [...values.Certificates]
  if (["Certificate","CerDate"].includes(e.target.name)) {
   
    serticate[e.target.id][e.target.name] = e.target.value;
  }
  setValues({
      ...values,
      [name]: value,
      UserID:UserID,
      OtherIncomes:incList,
      Certificates:serticate,
  })
}

//form valdation
const validateForm = () => {
  let temp = {};
  // temp.management = values.management != "" ? "" : "???? ???????? ???????? ????????????????";
  // temp.EmployeeCode  = values.EmployeeCode  != "" ? "" : "???? ???????? ???????? ????????????????";
  // temp.year = values.year != "" ? "" : "???? ???????? ???????? ????????????????.";
  // temp.EmployeeName = values.EmployeeName != "" ? "" : "???? ???????? ???????? ????????????????.";
  // temp.nationalID = values.nationalID != "" ? "" : "???? ???????? ???????? ????????????????";
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
        setLoading(true)
        createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES2).create(values)
        .then(res => {
            console.log(res)
            // setLoading(false)
            // notify()
        })
        .then(res => {
          handlehistory( action.ADD   , '???????????? ??????????????' ,  "??????????  ???????????? ???????????? ??????????????")
        })
        .then(res => {
          notify();
          setLoading(false)
          history.push(`/SecondJobData/${match.params.id}/${match.params.type}`)
        })

          .catch(function (response) {
            notifyErr()
            setLoading(false)
            console.log(response);
          });
        console.log(values);   
      }  
     }

    return (
    <>
         
 
            <Alert />
       {/* right naaaaaaaaaaaaav */}
     
      {/* grid for body  */}
        <Form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
         <Header> ????????   ???????????? ??????????????  </Header>

         {values.Certificates? (<>
             { values.Certificates.map((inc, idx) => (
               <> 
                     {/* ???????????? ??????????????  */}
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Input
            autoFocus
                name="Certificate"
                id={idx}
                label=" ???????????? ??????????????"
                value={inc.Certificate}
                // error={errors.EmployeeCode}
                onChange={handleInputChange}
                type= "text"
            />
          </Grid>
          {/* ?????????? ???????????? ?????? ????????????  */}
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Input className="dateInput"
                name="CerDate"
                id={idx}
                label="  ?????????? ???????????? ?????? ????????????  "
                value={inc.CerDate}
              //  error={errors.EmployeeCode}
                onChange={handleInputChange}
                type= "date"
            />
          </Grid> 
               </>
           ))}

         <div
          style={{textAlign:"left" , width:"100%"}}  
          >
             <Btn onClick={AddAnotherSertficate}
           type="button">  
            <AddBoxIcon 
            style={{margin:"0 0 0 15px" , color:"#3a3a39"}}          
             />
            ??????????   ???????????? ???????????? ????????
            </Btn>
          </div>
        
           </>): (
                  <> 
         
     
            </>
              
           )}

            
          {/*?????????????? ?????????????? */}
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Input
                name="JobName"
                label=" ?????????????? ??????????????"
                value={
                  values.JobName!="null"?(values.JobName):('')}
                //  error={errors.DestinationID}
              type= "text"
              onChange={handleInputChange}
            />          
          </Grid>           
                {/*???????????? ?????????? */}
          <Grid item  xs={12} sm={6} md={4} lg={4}>  
                   <Input 
                     name="WorkPhone"
                     label="???????????? ??????????"
                     value={
                  values.WorkPhone!="null"?(values.WorkPhone):('')}
                    //  error={errors.BbDate}
                     type= "text"
                   onChange={handleInputChange}
                  />       
            </Grid>                
           {/* ???????? ?????????????? */}
           <Grid item item  xs={12} sm={6} md={4} lg={4}>
                   <Input
                     name="WorkLine"
                     label="???????? ?????????????? "
                     value={
                  values.WorkLine!="null"?(values.WorkLine):('')}
                    //  error={errors.wName}
                    onChange={handleInputChange}
                    type= "text"
                   />
           </Grid>    
          {/* ???????????? ?????????????? */}
          <Grid item item  xs={12} sm={6} md={4} lg={4} >
            <Input
              name="JobTitle"
              label=" ???????????? ?????????????? "
              value={
                  values.JobTitle!="null"?(values.JobTitle):('')}
            //  error={errors.wName}
            onChange={handleInputChange}
            type= "text"
            />
          </Grid>
          {/*  ???????????? ????????????*/}
          <Grid item item  xs={12} sm={6} md={4} lg={4} >
            <Input
              name="CurrentSalary"
              label=" ???????????? ???????????? "
              value={
                  values.CurrentSalary!="null"?(values.CurrentSalary):('')}
            //  error={errors.wName}
            onChange={handleInputChange}
            type= "text"
            />
          </Grid>
          {/*  ?????????? ?????? ????????*/}
        
           {values.OtherIncomes ? (<>
             { values.OtherIncomes.map((inc, idx) => (
              <Grid item item  xs={12} sm={12} md={12} lg={12} >
                  <Input
                    name="incomeSource"
                    label="  ?????????? ?????? ???????? "
                    id={idx}
                    value={inc}
                  //  error={errors.wName}
                  onChange={handleInputChange}
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
            ??????????  ?????????? ?????? ????????
            </Btn>
          </div>
        
           </>): (<></>)}

     
          <div
          style={{textAlign:"center" , width:"100%"}}  
          >
          
          <Btn
              size="large"
              color="primary"
              disabled={loading}
              >
                        {loading ? (
                <Spinner/>
           ): ('')}
              ?????????? ?????????????? 
            </Btn>
          </div>
         </Grid>  
       </Form>

                 {/* <JobDataTable
              customers={values}

          /> */}

          <div style={{display:"none"}}>
<ComponentToPrint
              
              Table={JobDataTable}
              customers={values}
              // SetCustomers = {SetCustomers}
              title={' ????????????   ??????????????'}
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

export default JobData
