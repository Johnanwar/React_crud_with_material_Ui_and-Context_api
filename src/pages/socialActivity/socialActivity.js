import React, { useState ,useEffect , useRef , useContext } from "react"
import {useHistory } from "react-router-dom"
import { Grid ,FormControlLabel ,RadioGroup ,Radio } from '@material-ui/core';
import Form from "../../shared/Form";
import { Input,Btn,Spinner } from "../../controls";
import {Alert,notify,notifyErr} from "../../components/alerts/alert";
  import Header from "../../components/header/header"
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import SocialTable from "./socialTable"
import PrintButton  from '../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../print/react-to-print'
import {HistoryContext} from '../../contexts/historyContext'

function SocialActivity({match}) {
  const { handlehistory , action ,UserID } = useContext(HistoryContext)
  // const UserID = localStorage.getItem('UserID');
   ////printing 
   const componentRef = useRef();
   const handlePrint = useReactToPrint({
     content: () => componentRef.current,
   });
  const history = useHistory()

  const getFreshModelObject ={
    // have car 
    bPrivateCar:true,
    //vcar num
    PrivateCarNumber : "",

    ClubNames: "",
   //  مشترك في احزاب دينيه او لا او سياسيه
    // true or false
   bPolitical: "",
   //  تفاصيل لااحزاب
    PoliticalDetails: "",

    bCrime: "",
    //details
    // CrimeDetails:""
  }
const [values, setValues] = useState(getFreshModelObject);
const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);


useEffect(() => {
  createAPIEndpoint(ENDPIONTS.EMPLOYEES5).fetchByIdAndYear(match.params.id,match.params.type)
      .then(res => {
          console.log(res.data.data)
          setValues(res.data.data)
      })
      .catch(err => console.log(err))
}, [])



/// add new input for multi inputs Other clubs
const handleInputChange = e => {
  const { name, value } = e.target
  setValues({
      ...values,
      [name]: value,
      UserID:UserID,

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

function handleSubmit(e) {
  e.preventDefault()
  if (validateForm()) {
    setLoading(true)
    createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES5).create(values)
    .then(res => {
        console.log(res)
        setValues(res.data.data)
        // stLoading(false)
        // history.push(`/Socialissue/${match.params.id}/${match.params.type}`)
        // notify()

    })
    .then(res => {
      handlehistory( action.ADD  , 'بيانات النشاط الاجتماعي ' ,  "تعديل  واضافه بيانات بيانات النشاط الاجتماعي  ")
    })
    .then(res => {
      notify();
      setLoading(false)
      history.push(`/Socialissue/${match.params.id}/${match.params.type}`)
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
     
      <Alert /> 
 
            <Form onSubmit={handleSubmit}>
             <Grid container spacing={1}>
               
                   <Header>
                   بيانات النشاط الاجتماعي 

                </Header>
                {/*  هل لديك سياره   */}
                <Grid item xs={12} sm={12} md={12} lg={12}>                
                  <h4 
                    align ="right"
                  // component="legend"
                  color="primary"
                  > 
                  هل لديك سياره ؟
                  </h4>
                  <RadioGroup className="flex-row" 
                  flexDirection="row"
                  aria-label="هل لديك سياره" 
                  name="bPrivateCar" value={(values.bPrivateCar).toString()} 
                  onChange={handleInputChange}>
              
                  <FormControlLabel
                    value="false"
                    control={<Radio color="primary" />}
                    label="لا"
                  />
                  <FormControlLabel
                    value="true"
                    control={<Radio color="primary" />}
                    label="نعم"
                  />
                
                  </RadioGroup>
                </Grid>
                {/*  رقم اللوحه " */}
                {values.bPrivateCar == 'true' || values.bPrivateCar == true? (
                  <Grid item item  xs={12} sm={12} md={12} lg={12} >
                   <Input
                   autoFocus
                     name="PrivateCarNumber"
                     label="  رقم اللوحه "
                     value={values.PrivateCarNumber}
                    //  error={errors.wName}
                    onChange={handleInputChange}
                    type= "text"
                  />
                   {/* محلات الاقامة السابفة */}
                  </Grid>

                ):("")}

     
            
              {/* الانديه التي تشترك فيها  */}
       
                   <Grid item xs={12} sm={12} md={12} lg={12}>
                   <Input
                      name="ClubNames"
                      label="   الانديه التي تشترك فيها  "
                      value={values.ClubNames}
                     //  error={errors.EmployeeCode}
                      onChange={handleInputChange}
                      type= "text"
                   />
                 </Grid> 

                 <Grid item xs={12} sm={12} md={12} lg={12}>                
                  <h4 
                    align ="right"
                  // component="legend"
                  color="primary"
                  > 
                 مشترك في احزاب دينيه او  سياسيه  او لا
                  </h4>
                  <RadioGroup className="flex-row" 
                  flexDirection="row"
                  aria-label=" مشترك في احزاب دينيه او  سياسيه  او لا" 
                  name="bPolitical" value={(values.bPolitical).toString()} 
                  onChange={handleInputChange}>
              
                  <FormControlLabel
                    value="false"
                    control={<Radio color="primary" />}
                    label="لا"
                  />
                  <FormControlLabel
                    value="true"
                    control={<Radio color="primary" />}
                    label="نعم"
                  />
                
                  </RadioGroup>
                </Grid>
                {values.bPolitical == 'true'  || values.bPolitical == true? (
                <Grid item item  xs={12} sm={12} md={12} lg={12} >
                   <Input
                     name="PoliticalDetails"
                     label="   التفاصيل "
                     value={values.PoliticalDetails}
                    //  error={errors.wName}
                    onChange={handleInputChange}
                    type= "text"
                  />
                   {/* محلات الاقامة السابفة */}
                  </Grid>
                  ):("")}
          
      
          {/*    هل تم إعتقالك او إتهامك في اي نوع من انواع القضايا؟   */}

                {/*  رقم القضيه */}          

      

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
             {/* <SocialTable
               customers={values}
             />   */}

<div style={{display:"none"}}>

<ComponentToPrint
              
              Table={SocialTable}
              customers={values}
              // SetCustomers = {SetCustomers}
              title={' بيانات النشاط الاجتماعي'}
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

export default SocialActivity
