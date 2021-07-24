import React, { useState ,useEffect, useContext , useRef} from "react"
import {useHistory } from "react-router-dom"
import { Grid} from '@material-ui/core';
import Form from "../../shared/Form";
import { Input, Select, Btn,Spinner } from "../../controls";
import UploadImg from "../../controls/uploadImg";
 import Header from "../../components/header/header"
 import { createAPIEndpoint, ENDPIONTS } from "../../api";
import AddBoxIcon from '@material-ui/icons/AddBox';
import {Alert,notify,notifyErr} from "../../components/alerts/alert"
import {Religion } from "../../controls/religion";
import {DepartmentContext} from '../../contexts/departmentContext'
import {HistoryContext} from '../../contexts/historyContext'
import PersonalDataTable from "./PersonalDataTable"
import PrintButton  from '../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../print/react-to-print'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import DatePicker from 'react-date-picker';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import zIndex from "@material-ui/core/styles/zIndex";


function PersonalData({match}) {
      ////printing 
      const componentRef = useRef();
      const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

      
  const { managementValues  } = useContext(DepartmentContext)
  const { handlehistory , action ,UserID  } = useContext(HistoryContext)
  const [valuee, onChange] = useState(new Date());




  //dropdown for genders
    const genders = [
    {DepartmentID: '0' , DepartmentName:'ذكر'},
    {DepartmentID: '1' , DepartmentName:'انثى'},
  ]
  const history = useHistory()


  
// initial model for inputs object
  const getFreshModelObject ={
    EmployeeCode:"",
    EmployeeID:"",
    EmployeeID:"",
    FormYear:"",
    DepID:null,
    ImageName:null,
    EmployeeFormID:"",
      E_Name: "",
      P_Name: "",
      NationalID: "",
      Gender: null,
      BCountry:"",
      Religion:null,
      BDate:"",
      Nationality:"",
      O_Country:"",
      C_Phone:"",
      C_Address:"",
      C_Phone_Name:"",  
      Places:[
       '',""
      ]
    
  }


const [values, setValues] = useState(getFreshModelObject);
const [errors, setErrors] = useState({});
const [loading, setLoading] = useState(false);
const [DocImage, setDocImage] = useState(null); 
const [url, setUrl] = useState(null)
const [departmentId, setDepartmentId] = useState({DepartmentID: '' , DepartmentName:''},)
const [gend, setGender] = useState(null)



/// add new input for prev places 
    const AddPlaces = () => {
      if(values.Places.length  < 5){
      setValues(
        (prevState) => ({
          ...values,
            Places: [...prevState.Places, 
               ""   
            ],
        }))
      }
    }

// get data from api
useEffect(() => {
  createAPIEndpoint(ENDPIONTS.EMPLOYEES).fetchByIdAndYear(match.params.id,match.params.type)
      .then(res => {
          // console.log(res.data.data)
          if(res.data.data != null){
            // console.log(res.data.data)
            setValues(res.data.data)
            // setSelectedDate(new Date(res.data.data.BDate))
           const imgUrl =  res.data.data.ImageName
            setUrl(imgUrl)
            setGender(genders[res.data.data.Gender])
            console.log(res.data.data.DepID )
            if(res.data.data.DepID !== null && res.data.data.DepID.DepID !== '0'  && managementValues.length > 0 ){
              const x = managementValues.find(x => x.DepartmentID == res.data.data.DepID)
              if( x !== undefined) {
              setDepartmentId(x)
              console.log(x)

              }

            }
           
          }
      })
    
      .catch(err => console.log(err));
}, [])



//onChange for inputs object
const handleInputChange = e => {
  const {id, value , name } = e.target
  // var test = localStorage.getItem('myData');
  // test = JSON.parse(test)
  let pllist = [...values.Places]
  if (["prevPlace"].includes(e.target.name)) {
    pllist[e.target.id]= e.target.value;
  }
  setValues({
      ...values,
      [name]: value,
      Places:pllist,
      UserID:UserID,
  })
  console.log(departmentId);

}


//onCahange for multi inputs

 // validation form
const validateForm = () => {
  let temp = {};
  temp.management = values.management != "" ? "" : "لو سمحت املا البيانات";
  setErrors({ ...temp });
  return Object.values(temp).every(x => x === "");
}

//  to make inputs empty
const resetFormControls = () => {
  setValues(getFreshModelObject);
}
// submit all form
     function handleSubmit(e) {
      e.preventDefault()
      if (validateForm()) {
   
        var bodyFormData = new FormData();
        bodyFormData.append('E_Name', values.E_Name);
        bodyFormData.append('P_Name', values.P_Name);
        bodyFormData.append('EmployeeFormID', values.EmployeeFormID);
        bodyFormData.append('FormYear', values.FormYear);
        bodyFormData.append('EmployeeID', values.EmployeeID);
        bodyFormData.append('EmployeeCode', values.EmployeeCode);
        bodyFormData.append('DepID', departmentId.DepartmentID);
        bodyFormData.append('NationalID', values.NationalID);
        bodyFormData.append('Gender',gend.DepartmentID);
        bodyFormData.append('BDate', values.BDate);
        bodyFormData.append('BCountry', values.BCountry);
        bodyFormData.append('Religion', values.Religion);
        bodyFormData.append('Nationality', values.Nationality);
        bodyFormData.append('O_Country', values.O_Country);
        bodyFormData.append('C_Address', values.C_Address);
        bodyFormData.append('C_Phone', values.C_Phone);
        bodyFormData.append('C_Phone_Name', values.C_Phone_Name);
        bodyFormData.append('UserID',UserID);
        bodyFormData.append('DocImage', DocImage);
        values.Places.forEach((item) => {
          bodyFormData.append('Places', item)
       })
        setLoading(true)
        createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES).create(bodyFormData)
        .then(res => {
            console.log(res)
            notify()
        })
        .then(res => {
          handlehistory( action.ADD   , 'البيانات الشخصيه' ,  "تعديل  واضافه البيانات الشخصيه")
        })
        .then(res => {
          notify();
          setLoading(false)
           history.push(`/JobData/${match.params.id}/${match.params.type}`)
        })
          .catch(function (response) {
            //handle error
            notifyErr()
           setLoading(false)
            console.log(response);
          });
      }  
     }
     const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));


    return (
    <>
     
      <Alert/>

        
      
            <Form onSubmit={handleSubmit}>
             <Grid container spacing={1}>          
             <Header>
               إدخل  البيانات الشخصيه 
              </Header>
              {/* <Grid item xs={12} sm={12} md={12} lg={12}>           
                  <DatePicker
                  style={{zIndex:"999999999999999"}}
                        onChange={onChange}
                        value={valuee}
                      />
                </Grid> */}
                {/* full name */}
                <Grid container spacing={1}>
                
                <Grid item xs={12} sm={8} md={8} lg={8}>
                {/* rowwwwwwwwwwwwwwwww */}
                  <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Input
                     autoFocus 
                     name="E_Name"
                     label="الاسم بالكامل"
                     value={
                      values.E_Name!='null' ?
                       (values.E_Name ):('')}
                     id="E_Name"
                     error={errors.EmployeeCode}
                     onChange={handleInputChange}
                     type= "text"
                  />
                </Grid>
                 {/* famous name */}
              <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Input
                     name="P_Name"
                     label=" اسم الشهره  "
                     value={values.P_Name!='null' ?
                       (values.P_Name ):('')}
                    //  error={errors.EmployeeCode}
                     onChange={handleInputChange}
                     type= "text"
                  />
                </Grid> 

                <Grid item xs={12} sm={6} md={6} lg={6}>
                       <Autocomplete
                        id="country-select-demo"
                        options={managementValues}
                        onChange={(e, value) => setDepartmentId(value)}
                      getOptionSelected={(option, value) => option.DepartmentID === value.DepartmentID}
                      value={departmentId}
                        autoHighlight
                        getOptionLabel={(option) => option.DepartmentName}
                        renderOption={(option) => (
                          <React.Fragment>
                            {option.DepartmentName} 
                          </React.Fragment>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="الإداره"
                            variant="outlined"
                            name="DepID"
                          />
                        )}
                        /> 

                  </Grid>


                {/* national ID */}
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Input
                       name="NationalID"
                       label="الرقم القومي"
                       value={values.NationalID!='null' ?
                       (values.NationalID ):('')}
                       className="NationalID"
                      //  error={errors.DestinationID}
                       type= "text" 

                     onChange={handleInputChange}
                  />
             
               </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                       <Autocomplete
                        id="country-select-demo"
                        options={genders}
                        onChange={(e, value) => setGender(value)}
                      getOptionSelected={(option, value) => option.DepartmentID === value.DepartmentID}
                      value={gend}
                        autoHighlight
                        getOptionLabel={(option) => option.DepartmentName}
                        renderOption={(option) => (
                          <React.Fragment>
                            {option.DepartmentName} 
                          </React.Fragment>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="النوع"
                            variant="outlined"
                            name="Gender"
                          />
                        )}
                        /> 

                  </Grid> 

                 
                 {/* date of birth */}
              <Grid item  xs={12} sm={6} md={4} lg={6}>  
         
          
                   <Input className="dateInput"
                     name="BDate"
                     label="تاريخ الميلاد"
                    //  format="MM/dd/yyyy"
                     dateFormat="dd/MM/yyyy" 
                     value={values.BDate!=null ?
                       ((values.BDate).slice(0,10)):('')}
                    //  error={errors.BbDate}
                     type= "date"
                   onChange={handleInputChange}
                  />      
                  </Grid>
                 {/* birth place  */}
              <Grid item item  xs={12} sm={6} md={6} lg={6} >
                   <Input
                     name="BCountry"
                     label="  جهه الميلاد  "
                     value={values.BCountry!='null' ?
                       (values.BCountry ):('')}
                    //  error={errors.wName}
                    onChange={handleInputChange}
                    type= "text"
                  />
                  </Grid>
                 {/* Religion */}
              <Grid item xs={12} sm={6} md={6} lg={6}>
                              <Select
                              label="الديانه"
                              name="Religion"
                              
                              // value={
                              //   values.Religion!=null ?(
                              //     Religion[values.Religion].DepartmentID
                              //   ):('')
                              //  }
                               value={
                      values.Religion != null  ?
                      (Religion.find(x => x.DepartmentID == values.Religion).DepartmentID)
                      :("")
                    }

                           
                              onChange={handleInputChange}
                              options={Religion}
                              // error={errors.management}

                         />
                      </Grid>

                      <Grid item item  xs={12} sm={6} md={6} lg={6} >
                   <Input
                     name="Nationality"
                     label=" الجنسيه "

                      value={values.Nationality!='null' ?
                       (values.Nationality ):('')}
                    //  error={errors.wName}
                    onChange={handleInputChange}
                    type= "text"
                  />
                  </Grid>
                 {/* place of birth */}
              <Grid item item  xs={12} sm={6} md={6} lg={6} >
                   <Input
                     name="O_Country"
                     label="البلده الاصليه"
                      value={values.O_Country!='null' ?
                       (values.O_Country ):('')}
                    //  error={errors.O_Country}
                    onChange={handleInputChange}
                    type= "text"
                  />
                  </Grid>
                 {/* current  address */}
              <Grid item item  xs={12} sm={6} md={6} lg={6} >
                   <Input
                     name="C_Address"
                     label="  محل الإقامه الحالي   "
                      value={values.C_Address!='null' ?
                       (values.C_Address ):('')}
                    //  error={errors.wName}
                    onChange={handleInputChange}
                    type= "text"
                  />
                  </Grid>
                 {/* mobile*/}
              <Grid item item  xs={12} sm={6} md={6} lg={6} >
                   <Input
                     name="C_Phone"
                     value={values.C_Phone!='null' ?
                       (values.C_Phone ):('')}
                     label="  رقم الموبايل  "
                    //  error={errors.wName}
                    onChange={handleInputChange}
                    type= "text"
                  />
                  </Grid>
                 {/*  مقيد بأسم */}
               <Grid item item  xs={12} sm={6} md={6} lg={6} >
                   <Input
                     name="C_Phone_Name"
                     label=" مقيد بأسم "
                     value={values.C_Phone_Name!='null' ?
                       (values.C_Phone_Name ):('')}
                    //  error={errors.wName}
                    onChange={handleInputChange}
                    type= "text"
                  />
                   {/* اماكن الاقامة السابقه */}
                  </Grid>

                  </Grid>
                </Grid>
                {/* 333333333333333333 */}
                {/* uplooooooooooooooooood immmmmmmmmmmage */}
                <Grid item xs={12} sm={4} md={4} lg={4}>
                {    url ? (
                  <img
                  style={{width:"100%" , margin:"auto" , maxHeight:"200px"}}
                  
                  className='img-fluid mb-3 login-logo' src={url}/>
                  ) : ("")}


                  <UploadImg
                  // style={{ ( height: url ? "80px !important") : "500px"}}
                  label='  الصوره الشخصيه'
                  setDocImage={setDocImage}
                  />
                </Grid>

                </Grid>
                {/* .......................................................... */}
              

     


                {/* departement */}
   
                 {/* nationality */}
    
                  {/* اماكن الاقامة السابقه  */}
                 {values.Places ? (<>
                 { values.Places.map((prev, idx) => (
                    <Grid key={idx} item item  xs={9} sm={6} md={8} lg={8} >
                                <Input
                                name='prevPlace'
                                id={idx}
                                label="  اماكن الاقامة السابقه "
                                value={prev}
                                //  error={errors.wName}
                                onChange={handleInputChange}
                                type= "text"                       
                              />               
                    </Grid>
                          ))}
               
          
               <div
          style={{textAlign:"left" , width:"100%"}}  
          >
           <Btn onClick={AddPlaces}
           type="button"
           >  
            <AddBoxIcon 
            style={{margin:"0 0 0 15px" , color:"#3a3a39"}}          
             />
            إضافه  محل اقامه اخر
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


               
                 {/* <PersonalDataTable
              customers={values}

          /> */}

          <div style={{display:"none"}}>
<ComponentToPrint
              
              Table={PersonalDataTable}
              customers={values}
              // SetCustomers = {SetCustomers}
              title={'     البيانات الشخصيه'}
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

export default PersonalData
