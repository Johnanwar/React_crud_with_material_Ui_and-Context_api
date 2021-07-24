import React, { useState , useEffect , useRef ,useContext} from "react"
 import {  Grid ,FormControlLabel ,RadioGroup ,Radio } from '@material-ui/core';
import Form from "../../shared/Form";
import { Input, Btn , Spinner} from "../../controls";
import {  useHistory } from "react-router-dom"
import ReligionTable from "./religionTable"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import {Alert,notify,notifyErr} from "../../components/alerts/alert"
import PrintButton  from '../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../print/react-to-print'
import {HistoryContext} from '../../contexts/historyContext'

function ReligionForm({id,type}) {
  const { handlehistory ,action , UserID } = useContext(HistoryContext)
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
    const [crime, setCrime] = useState('no');
    const [remove, setRemove] = useState(true);

    const history = useHistory()
    
    useEffect(() => {
      createAPIEndpoint(ENDPIONTS.EMPLOYEES8).fetchByIdAndYear(id,type)
          .then(res => {
              SetCustomers(res.data.data)
              console.log(res.data.data)
              if(res.data.data.listData.length > 1 || res.data.data.listData.length == 1 ){
                setCrime("yes")
              }
  
          })
          .catch(err => console.log(err))
    }, [])
      
    
  const getFreshModelObject ={
    EmployeeReligionID: 0,
    // EmployeeFormID: "",
    Rel_Name: "",
    // درجه القرابه
    Rel_Degree: '',
    // العنوان
    Rel_Add:"",
    // الديانه
    Rel_Self:'',
    // اسم الزوج او الزوجه
    Spouse_Name: '',
    //ديانه الزوج او الزوجه
    Rel_Spouse: '',

}
const [values, setValues] = useState(getFreshModelObject);
const [errors, setErrors] = useState({});


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
temp.Rel_Name = values.Rel_Name != "" ? "" : "من فضلك ادخل البيانات";
temp.Rel_Degree = values.Rel_Degree != "" ? "" : "من فضلك ادخل البيانات";
temp.Rel_Add = values.Rel_Add != "" ? "" : "من فضلك ادخل البيانات";
temp.Rel_Self = values.Rel_Self != "" ? "" : "من فضلك ادخل البيانات";
temp.Spouse_Name = values.Spouse_Name != "" ? "" : "من فضلك ادخل البيانات";
temp.Rel_Spouse = values.Rel_Spouse != "" ? "" : "من فضلك ادخل البيانات";
setErrors({ ...temp });
return Object.values(temp).every(x => x === "");
}

const resetFormControls = () => {
setValues(getFreshModelObject);
}

function handleSubmit(e) {
  e.preventDefault()
  // if (validateForm()) {
    setLoading(true)

    createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES8).createPrison( customers.EmployeeFormID, "0" ,values)
    .then(res => {
        setLoading(false)
        notify()
        resetFormControls()
        SetCustomers(res.data.data)
    })
    .then(res => {
      handlehistory( action.ADD , 'بيانات    الديانه  ' , "   اضافه  بيانات     الديانه   ")
    })
      .catch(function (response) {
        //handle error
         notifyErr()
       setLoading(false)
        console.log(response);
      });  
      console.log(values);

  // } 
 }
 function handleNext(e){
  e.preventDefault()
  history.push(`/AddWife/${id}/${type}`)
 }
 
    return (
      <>
        <Form onSubmit={handleSubmit} >
        <Grid container spacing={1}>
            
              {/* name */}
                  {/*    هل تم إعتقالك او إتهامك في اي نوع من انواع القضايا؟   */}
                  <Grid item xs={12} sm={12} md={12} lg={12}>                
                  <h4 
                    align ="right"
                  // component="legend"
                  color="primary"
                  > 
                  هل لك احد الاقارب (ذكر او انثى) متزوجا من غير ديانته ؟
                  </h4>

                  <RadioGroup className="flex-row" 
                  flexDirection="row"
                  aria-label=" هل لك احد الاقارب (ذكر او انثى) متزوجا من غير ديانته ؟   " 
                  name="crime" value={crime} 
                  onChange={(e)=> setCrime(e.target.value)}>
              
                  <FormControlLabel
                    value="no"
                    control={<Radio color="primary" />}
                    label="لا"
                  />
                  <FormControlLabel
                    value="yes"
                    control={<Radio color="primary" />}
                    label="نعم"
                  />
                
                  </RadioGroup>
                </Grid>
                {/* { values.nationality == 'yes' ? (<> */}
               
                  {crime == 'yes'? (<> 
              {/* الأسم بالكامل */}
              <Grid item  xs={12} sm={6} md={6} lg={6}>  
              <Input 
              autoFocus
                     name="Rel_Name"
                     label="الأسم بالكامل"
                     value={values.Rel_Name}
                     error={errors.Rel_Name}
                     type= "text"
                   onChange={handleInputChange}
                />       
             </Grid>

    
             {/*درجه القرابه */}
             <Grid item  xs={12} sm={6} md={6} lg={6}>
                <Input
                     name="Rel_Degree"
                     label="درجه القرابه"
                     value={values.Rel_Degree}
                     error={errors.Rel_Degree}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/*  الاقامه */}
               <Grid item  xs={12} sm={6} md={6} lg={6}>
                <Input
                     name="Rel_Add"
                     label="  محل الاقامه"
                     value={values.Rel_Add}
                     error={errors.Rel_Add}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
            {/* الديانه */}
            {/* <Grid item  xs={12} sm={6} md={6} lg={6}>
                <Input
                     name="Rel_Self"
                     label="  الديانه"
                     value={values.Rel_Self}
                     error={errors.Rel_Self}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid> */}
            <Grid item xs={12} sm={6} md={6} lg={6}>
            <Input
                  label="الديانه"
                  name="Rel_Self"
                  value={values.Rel_Self}
               
                  

                  onChange={handleInputChange}
                  // error={errors.management}

                  />
                </Grid>
                    {/*  اسم الزوج او الزوجه */}
                    <Grid item  xs={12} sm={6} md={6} lg={6}>
                <Input
                     name="Spouse_Name"
                     label="   اسم الزوج او الزوجه"
                     value={values.Spouse_Name}
                     error={errors.Spouse_Name}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
            {/* ديانه الزوج او الزوجه  */}
            <Grid item xs={12} sm={6} md={6} lg={6}>
            <Input
                  label="ديانه الزوج او الزوجه"
                  name="Rel_Spouse"
                  value={values.Rel_Spouse}
                  onChange={handleInputChange}
                  // error={errors.management}

                  />
                </Grid>


            <div
  style={{margin:"20px 0", textAlign:'center', width:'100%'}}
  >
               <Btn
            size="large"
            disabled={loading}

            >
               إضافه <ExpandMoreIcon/> 
               {loading ? (
                <Spinner/>
           ): ('')}
         </Btn>
         </div>
         </> ): ("")}

            {/* </>) : (<></>) } */}
         </Grid>  
    
       
        </Form>

        {crime == 'yes'? (
        <ReligionTable
           customers={customers}
           SetCustomers = {SetCustomers}
           setCrime={setCrime}
        />
      ): ("")}

      <div style={{display:"none"}}>
    <ComponentToPrint
              
              Table={ReligionTable}
              customers={customers}
              SetCustomers = {SetCustomers}
              title={'هل لك احد الاقارب (ذكر او انثى) متزوجا من غير ديانته ؟'}
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
                الصفحه التاليه 
         </Btn>

  </div>
      


        </>

             
    )
}

export default ReligionForm
