import React, { useState ,useEffect,useRef , useContext } from "react"
import { useHistory } from "react-router-dom"
import { Grid,} from '@material-ui/core';
import Form from "../../shared/Form";
import { Input,Btn,Spinner } from "../../controls";
import {Alert,notify,notifyErr} from "../../components/alerts/alert"
import Header from "../../components/header/header"
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import AddBoxIcon from '@material-ui/icons/AddBox';
import SecondJobDataTable from "./secondJobDataTable"
import PrintButton  from '../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../print/react-to-print'
import {HistoryContext} from '../../contexts/historyContext'

function SecondJobData({match}) {
  const { handlehistory ,action  ,UserID } = useContext(HistoryContext)
  // const UserID = localStorage.getItem('UserID');
     ////printing 
     const componentRef = useRef();
     const handlePrint = useReactToPrint({
       content: () => componentRef.current,
     });

  const history = useHistory()

  const getFreshModelObject ={
      EmployeeID:"",
      JobName : "",
      PrevJobs:[
        {Job:"",JobDate:""},
  ]
  }
const [values, setValues] = useState(getFreshModelObject);
const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);


useEffect(() => {
  createAPIEndpoint(ENDPIONTS.EMPLOYEES3).fetchByIdAndYear(match.params.id,match.params.type)
      .then(res => {
          console.log(res.data.data)
          setValues(res.data.data)
      })
      .catch(err => console.log(err))
}, [])

/// add new input for multi inputs Other previous jobs
const AddPrevJob = () => {
  if(values.PrevJobs.length < 5){
  setValues(
      (prevState) => ({
        ...values,
        PrevJobs: [...prevState.PrevJobs,            
                {Job:"",JobDate:""},
                
              
          ],
      }))
    }
  }



  const handleInputChange = e => {
    const { name, value } = e.target
    let prevList = [...values.PrevJobs]
    if (["Job", "JobDate"].includes(e.target.name)) {
     
      prevList[e.target.id][e.target.name] = e.target.value;
    }
    setValues({
        ...values,
        [name]: value,
        UserID:UserID,
        PrevJobs:prevList
    })
  }

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

const resetFormControls = () => {
  setValues(getFreshModelObject);
}

    // const [loading, setLoading] = useState(false)
    // const hist =[]
     function handleSubmit(e) {
      e.preventDefault()
      if (validateForm()) {
        setLoading(true)
        createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES3).create(values)
        .then(res => {
            console.log(res)
            // setLoading(false)
            // history.push(`/Army/${match.params.id}/${match.params.type}`)
            // notify()

        })
        .then(res => {
          handlehistory( action.ADD   , 'بيانات الترشيح' ,  "تعديل  واضافه بيانات الترشيح")
        })
        .then(res => {
          notify();
          setLoading(false)
          history.push(`/Army/${match.params.id}/${match.params.type}`)
        })
          .catch(function (response) {
            //handle error
             notifyErr()
           setLoading(false)
          //  history.push(`/GetPrison/${match.params.id}/${match.params.type}`)

            console.log(response);
          });
        console.log(values);
       
   
      }  
     }


    return (
    <>
            <Alert/>
 
            <Form onSubmit={handleSubmit}>
             <Grid container spacing={1}>
               
                   <Header>
                إدخل   بيانات الترشيح 

                </Header>
                {/*الوظيفه المرشح لها  */}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Input
                  autoFocus
                     name="JobName"
                     label="  الوظيفه المرشح لها"
                     value={values.JobName!="null"?(values.JobName):('')}
                     onChange={handleInputChange}
                     type= "text"
                    />
                  </Grid>
               
                {values.PrevJobs ? (<>
             { values.PrevJobs.map((jb, idx) => (
               <>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Input
                     name="Job"
                     label=" الوظائف السابقه بالترتيب"
                     value={jb.Job}
                    //  error={errors.EmployeeCode}
                     onChange={handleInputChange}
                     type= "text"
                     id={idx} 
                  />
                </Grid>       

                <Grid item xs={12} sm={6} md={6} lg={6}>
                <Input
                      className="dateInput"
                       name="JobDate"
                       label="  تاريخ الالتحاق "
                       value={jb.JobDate}
                      id={idx}             
                      type= "date"

                     onChange={handleInputChange}
                  />           
                </Grid> 
                </>
                ))}
             
         <div
          style={{textAlign:"left" , width:"100%"}}  
          >
             <Btn onClick={AddPrevJob}
           type="button">  
            <AddBoxIcon 
            style={{margin:"0 0 0 15px" , color:"#3a3a39"}}          
             />
            إضافه لوظائف سابقه اخرى
            </Btn>
          </div>
        
           </>): (<></>)}
           

             </Grid>  
             <Btn
              size="large"
              color="primary"
              disabled={loading}
              >
                        {loading ? (
                <Spinner/>
           ): ('')}
              إضافه ومتابعه 
            </Btn>     
          </Form>
          {/* <SecondJobDataTable
              customers={values}

          /> */}

          <div style={{display:"none"}}>
<ComponentToPrint
              
              Table={SecondJobDataTable}
              customers={values}
              // SetCustomers = {SetCustomers}
              title={' بيانات  الترشيح'}
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

export default SecondJobData
