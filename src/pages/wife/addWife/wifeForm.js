import React, { useState , useEffect , useRef ,useContext } from "react"
import {Grid ,FormControlLabel ,RadioGroup ,Radio } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';

import Form from "../../../shared/Form";
import { Input, Btn,Spinner } from "../../../controls";
import {Alert,notify,notifyErr} from "../../../components/alerts/alert"
import Header from "../../../components/header/header"
import { useHistory } from "react-router-dom"
import WifeTable from "./wifeTable"
import { createAPIEndpoint, ENDPIONTS } from "../../../api";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import PrintButton  from '../../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../../print/react-to-print';
import {HistoryContext} from '../../../contexts/historyContext'


function WifeForm({id , type}) {

  const { handlehistory ,action ,UserID } = useContext(HistoryContext)
  // const UserID = localStorage.getItem('UserID');
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
    const [crime, setCrime] = useState('');
    const [checked, setChecked] = React.useState(true);

    
    useEffect(() => {
      createAPIEndpoint(ENDPIONTS.EMPLOYEES10).fetchByIdAndYear(id,type)
          .then(res => {
            if(res.data.data!= null){
              SetCustomers(res.data.data)
              console.log(res.data.data)
              const statu = res.data.data.listData[res.data.data.listData.length - 1]
              if(statu.bSingle == true){
                console.log('bSingle')
                setCrime('bSingle')
              }else if(statu.bEngaged == true){
                console.log('bEngaged')
                setCrime('bEngaged')
              }
              else if(statu.bMarried == true){
                console.log('bMarried')
                setCrime('bMarried')
              }
              else if(statu.bWidow == true){
                console.log('bWidow')
                setCrime('bWidow')
              }
              else if(statu.bDivorced == true){
                console.log('bDivorced')
                setCrime('bDivorced')
              }
              
            }
           
  
          })
          .catch(err => console.log(err))
    }, [])
      

    const getFreshModelObject ={
      EmployeeFormID:`${customers.EmployeeFormID}`,
      bSingle: true,
      bEngaged : false,
      bMarried: false,
      bWidow : false,
      bDivorced:false,
      crime:"",
      EmployeeMaritalID:0,

      FatherName: "",
      FatherBDay: "",
      FatherAge: "",
      FatherNationality: "????????",
      FatherAddress : "",
      FatherJob : "",

      RelationDate:"",
      MotherName: "",
      MotherBDay : "",
      MotherAge : "",
      MotherNationality : "????????",
      MotherAddress: "",
      MotherJob : "",
      UserID:UserID,


      PartnerName : "",
      PartnerBDay: "",
      PartnerAge: "",
      PartnerNationality : "????????",
      PartnerAddress :"",
      PartnerJob : "",

     
    }
  
  
const [values, setValues] = useState(getFreshModelObject);
const [errors, setErrors] = useState({});
const [statues, setStatues] = useState({});
const [remove, setRemove] = useState(true);

  const history = useHistory()

  const handleInputChange2 = e => {
    setCrime(e.target.value)
    console.log(crime)
    // const { name, value } = e.target
    
    if(e.target.value == 'bSingle'){
      // setStatues({bSingle: true})
      setValues({
        ...values,
        bSingle: true,
        UserID:UserID,

    })
    }
    else if(e.target.value == 'bEngaged'){
      // setStatues({bEngaged: true})
      setValues({
        ...values,
        bEngaged: true,
        bSingle: false,
        bMarried: false,
        bWidow : false,
        bDivorced:false,
        
    })
    } 
    else if(e.target.value == 'bMarried'){
      // setStatues({bMarried: true})
      setValues({
        ...values,
        bMarried: true,
        bEngaged: false,
        bSingle: false,
        bWidow : false,
        bDivorced:false,
    })
    } 
    else if(e.target.value == 'bWidow'){
      setValues({
        ...values,
        bWidow: true,
        bMarried: false,
        bEngaged: false,
        bSingle: false,
        bDivorced:false,
    })
    } 
    else if(e.target.value == 'bDivorced'){
      setValues({
        ...values,
        bDivorced: true,
        bWidow: false,
        bMarried: false,
        bEngaged: false,
        bSingle: false,
    })
    } 
  
    }


  

const handleInputChange = e => {
const { name, value } = e.target;

var today1 = new Date();
var birthDate1 = new Date(values.FatherBDay);
var age_now1 = today1.getFullYear() - birthDate1.getFullYear();
var m1 = today1.getMonth() - birthDate1.getMonth();
if (m1 < 0 || (m1 === 0 && today1.getDate() < birthDate1.getDate())) 
{
    age_now1--; 
}

var today2 = new Date();
var birthDate2 = new Date(values.MotherBDay);
var age_now2 = today2.getFullYear() - birthDate2.getFullYear();
var m2 = today2.getMonth() - birthDate2.getMonth();
if (m2 < 0 || (m2 === 0 && today2.getDate() < birthDate2.getDate())) 
{
    age_now2--; 
}

var today3 = new Date();
var birthDate3 = new Date(values.PartnerBDay);
var age_now3 = today3.getFullYear() - birthDate3.getFullYear();
var m3 = today3.getMonth() - birthDate3.getMonth();
if (m3 < 0 || (m3 === 0 && today3.getDate() < birthDate3.getDate())) 
{
    age_now3--; 
}


if(crime == 'bSingle'){
  // setStatues({bSingle: true})
  setValues({
    ...values,
    bSingle: true,
    [name]: value,
    PartnerAge:age_now3,
    MotherAge:age_now2,
    FatherAge:age_now1,
})
}
else if(crime == 'bEngaged'){
  // setStatues({bEngaged: true})
  setValues({
    ...values,
    bEngaged: true,
    bSingle: false,
    bMarried: false,
    bWidow : false,
    bDivorced:false,
    [name]: value,
    PartnerAge:age_now3,
    MotherAge:age_now2,
    FatherAge:age_now1,
})
} 
else if(crime == 'bMarried'){
  // setStatues({bMarried: true})
  setValues({
    ...values,
    bMarried: true,
    bEngaged: false,
    bSingle: false,
    bWidow : false,
    bDivorced:false,
    [name]: value,
    PartnerAge:age_now3,
    MotherAge:age_now2,
    FatherAge:age_now1,
})
} 
else if(crime == 'bWidow'){
  setValues({
    ...values,
    bWidow: true,
    bMarried: false,
    bEngaged: false,
    bSingle: false,
    bDivorced:false,
    [name]: value,
    PartnerAge:age_now3,
    MotherAge:age_now2,
    FatherAge:age_now1,
})
} 
else if(crime == 'bDivorced'){
  setValues({
    ...values,
    bDivorced: true,
    bWidow: false,
    bMarried: false,
    bEngaged: false,
    bSingle: false,
    [name]: value,
    PartnerAge:age_now3,
    MotherAge:age_now2,
    FatherAge:age_now1,
})
} 
else{
  setValues({
    ...values,
    bDivorced: false,
    bWidow: false,
    bMarried: false,
    bEngaged: false,
    bSingle: false,
    [name]: value,
    PartnerAge:age_now3,
    MotherAge:age_now2,
    FatherAge:age_now1,
})
}
// setValues({
//     ...values,
//     [name]: value
// })
}

const validateForm = () => {
let temp = {};
temp.PartnerName = values.PartnerName != "" ? "" : "???? ???????? ???????? ????????????????";
temp.wBirth = values.wBirth != "" ? "" : "???? ???????? ???????? ????????????????";
temp.wAge = values.wAge != "" ? "" : "???? ???????? ???????? ????????????????";
temp.wNationalID = values.wNationalID != "" ? "" : "???? ???????? ???????? ????????????????";
temp.wJob = values.wJob != "" ? "" : "???? ???????? ???????? ????????????????";
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
    if (validateForm() ) {
      setLoading(true)

      createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES10).createPrison( customers.EmployeeFormID, "0" ,values)
      .then(res => {
          setLoading(false)
          notify()
          resetFormControls();
          SetCustomers(res.data.data)

          console.log(res);
      })
      .then(res => {
        handlehistory( action.ADD , '????????????    ?????????? /  ????????????  ' , "   ??????????  ????????????     ?????????? /  ????????????   ")
      })
        .catch(function (response) {
          //handle error
           notifyErr()
         setLoading(false)
         resetFormControls()

          console.log(response);
        });  
 
    } 
     console.log(values);
     console.log(crime);
   }




   function handleNext(e){
    e.preventDefault()

    console.log(values);

    // if (validateForm()) {
      // setLoading(true)

      createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES10).createPrison( customers.EmployeeFormID, "0" ,values)
      .then(res => {
          // setLoading(false)
          notify()
          resetFormControls();
          SetCustomers(res.data.data)
          history.push(`/addSons/${id}/${type}`)

          console.log(res);
      })
      .then(res => {
        handlehistory( action.ADD , '????????????    ?????????? /  ????????????  ' , "   ??????????  ????????????     ?????????? /  ????????????   ")
      })
      
        .catch(function (response) {
          //handle error
           notifyErr()
        //  setLoading(false)
         resetFormControls()

          console.log(response);
        });  
 
    // } 
    history.push(`/addSons/${id}/${type}`)
   }

    return (
      <>
        <Form onSubmit={handleSubmit} >
        <Grid container spacing={1}>
      
              {/* name */}

              {/* radio buttons */}
              <Grid item xs={12} sm={4} md={4} lg={4}>                
                  <h4 
                    align ="right"
                  // component="legend"
                  color="primary"
                  > 
                   ???????????? ???????????????????? 
                  </h4>

{/* 
    <Checkbox
    // defaultChecked
    onChange={handleInputChange}
    name="crime"
    color="primary"
    inputProps={{ 'aria-label': 'secondary checkbox' }}
  /> */}







                  <RadioGroup className="flex-row" 
                  flexDirection="row"
                  aria-label="   ???????????? ???????????????????? " 
                  name="crime" value={crime} 
                  // onChange={(e)=> setCrime(e.target.value)}
                  onChange={handleInputChange2}
                  >

              
                  <FormControlLabel
                    value="bSingle"
                    control={<Radio color="primary" />}
                    label="????????"
                  />
                    <FormControlLabel
                    value="bEngaged"
                    control={<Radio color="primary" />}
                    label="????????"
                  />
                  <FormControlLabel
                    value="bMarried"
                    control={<Radio color="primary" />}
                    label="??????????"
                  />
                     <FormControlLabel
                    value="bWidow"
                    control={<Radio color="primary" />}
                    label="????????"
                  />
                     <FormControlLabel
                    value="bDivorced"
                    control={<Radio color="primary" />}
                    label="????????"
                  />
                
                  </RadioGroup>
                </Grid>

                {crime == 'bEngaged' ||crime == 'bMarried'  ||  crime == 'bWidow'  || crime == 'bDivorced'  || crime == ""? (
                <Grid item  xs={12} sm={8} md={8} lg={8}>  
              <Input className="dateInput"
                     name="RelationDate"
                     label="?????????????? "
                    //  value={values.RelationDate}
                     value={values.RelationDate!=null ?
                       ((values.RelationDate).slice(0,10)):('')}
                    //  error={errors.wBirth}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>):("")}




             {crime == 'bEngaged' ||crime == 'bMarried'  ||  crime == 'bWidow'  || crime == 'bDivorced' || crime == ""? (<> 
             <Grid
              style={{borderBottom:"2px solid #0572b9"}}
               item   xs={12} sm={12} md={12} lg={12} >
                
              </Grid>



             <Header>
              ???????? ???????????? ?????????? / ???????????? 

              </Header>
         


              <Grid item   xs={12} sm={6} md={4} lg={4} >
                <Input
                autoFocus
                   name="PartnerName"
                   label="  ?????????? ??????????????  "
                   value={values.PartnerName}
                   error={errors.PartnerName}
                   onChange={handleInputChange}
                   type= "text"
                />

              </Grid>
        
              {/* date of birth */}
              <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input className="dateInput"
                     name="PartnerBDay"
                     label="?????????? ??????????????"
                     value={values.PartnerBDay}
                    //  error={errors.wBirth}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>

             {/* age   */}
             {/* <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="PartnerAge"
                    label="????????"
                    value={values.PartnerAge}
                    error={errors.PartnerAge}
                    type= "text"
                    onChange={handleInputChange}
            />
        
             </Grid>  */}
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="PartnerNationality"
                     label=" ??????????????"
                     value={values.PartnerNationality}
                     error={errors.PartnerNationality}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
                    {/* national ID */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="PartnerAddress"
                     label=" ??????????????"
                     value={values.PartnerAddress}
                     error={errors.PartnerAddress}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="PartnerJob"
                     label=" ??????????????"
                     value={values.PartnerJob}
                    //  error={errors.PartnerJob}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>

            {/* ********************paaremt8********************88 */}
            <Header>
              ???????? ???????????? ???????? ?????????? /  ???????????? 

              </Header>
              {/* name */}
              <Grid item item  xs={12} sm={6} md={4} lg={4} >
                <Input
                   name="FatherName"
                   label="  ?????????? ??????????????  "
                   value={values.FatherName}
                  //  error={errors.wName}
                   onChange={handleInputChange}
                   type= "text"
                />
     
              </Grid>
        
              {/* date of birth */}
              <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input className="dateInput"
                     name="FatherBDay"
                     label="?????????? ??????????????"
                     value={values.FatherBDay}
                    //  error={errors.wBirth}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>

             {/* age   */}
             {/* <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="FatherAge"
                    label="????????"
                    value={values.FatherAge}
                    // error={errors.PartnerAge}
                    type= "text"
                    onChange={handleInputChange}
            />
        
             </Grid>  */}
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="FatherNationality"
                     label=" ??????????????"
                     value={values.FatherNationality}
                     error={errors.FatherNationality}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
                    {/* national ID */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="FatherAddress"
                     label=" ??????????????"
                     value={values.FatherAddress}
                    //  error={errors.FatherAddress}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="FatherJob"
                     label=" ??????????????"
                     value={values.FatherJob}
                     error={errors.FatherJob}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
            {/* ***********************************mother******************* */}
            <Header>
              ???????? ???????????? ?????????? ?????????? /  ???????????? 

              </Header>
              

  
              
              {/* name */}
              <Grid item item  xs={12} sm={6} md={4} lg={4} >
                <Input
                
                   name="MotherName"
                   label="  ?????????? ??????????????  "
                   value={values.MotherName}
                  //  error={errors.wName}
                   onChange={handleInputChange}
                   type= "text"
                />

              </Grid>
        
              {/* date of birth */}
              <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input className="dateInput"
                     name="MotherBDay"
                     label="?????????? ??????????????"
                     value={values.MotherBDay}
                    //  error={errors.wBirth}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>

             {/* age   */}
             {/* <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="MotherAge"
                    label="????????"
                    value={values.MotherAge}
                    error={errors.MotherAge}
                    type= "text"
                    onChange={handleInputChange}
            />
        
             </Grid>  */}
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="MotherNationality"
                     label=" ??????????????"
                     value={values.MotherNationality}
                    //  error={errors.MotherNationality}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
                    {/* national ID */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="MotherAddress"
                     label=" ??????????????"
                     value={values.MotherAddress}
                    //  error={errors.MotherAddress}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="MotherJob"
                     label=" ??????????????"
                     value={values.MotherJob}
                    //  error={errors.MotherJob}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>


      
 <div
 style={{textAlign:"center" , width:"100%" , margin:"10px 0"}}>
            <Btn
            size="large"
            disabled={loading}

            >
               ?????????? <ExpandMoreIcon/> 
               {loading ? (
                <Spinner/>
           ): ('')}
         </Btn>
         </div>
            </> ): ("")}


            </Grid> 

            
        </Form>

        {crime == 'bEngaged' ||crime == 'bMarried'  ||  crime == 'bWidow'  || crime == 'bDivorced' || crime == ""? ( 

        // style={{ display: "none" }}
      
      
         <WifeTable
        ref={componentRef}
           customers={customers}
           SetCustomers = {SetCustomers}
        />
         ): ("")}


    <div style={{display:"none"}}>
    <ComponentToPrint
              
              Table={WifeTable}
              customers={customers}
              SetCustomers = {SetCustomers}
              title={'???????????? ?????????? ?????????? /  ????????????'}
              ref={componentRef} 
              remove={remove}
              code={id}
              />
    </div>

  
      
    {customers.listData.length > 1 || customers.listData.length == 1 ?  (

          <div>
          <PrintButton
            onClick={handlePrint}
          />
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
                ???????????? ?????????????? 
         </Btn>
         </div>
        </>
             
    )
}

export default WifeForm
