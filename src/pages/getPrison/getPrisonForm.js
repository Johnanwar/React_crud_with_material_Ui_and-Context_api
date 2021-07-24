import React, { useState ,useEffect , useRef ,useContext} from "react"
import 'react-toastify/dist/ReactToastify.css';
import {Grid ,FormControlLabel ,RadioGroup ,Radio } from '@material-ui/core';
import Form from "../../shared/Form";
import { Input,Btn,Spinner } from "../../controls";
import {Alert,notify,notifyErr} from "../../components/alerts/alert"
// import Header from "../../components/header/header"
import {useHistory } from "react-router-dom"
import GetPrisonTable from "./getPrisonTable"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import PrintButton  from '../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../print/react-to-print'
import {HistoryContext} from '../../contexts/historyContext'

function GetPrisonForm({id , type}) {
  const { handlehistory , action } = useContext(HistoryContext)
  const UserID = localStorage.getItem('UserID');
  
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

    
    useEffect(() => {
      createAPIEndpoint(ENDPIONTS.EMPLOYEES6).fetchByIdAndYear(id,type)
          .then(res => {
              SetCustomers(res.data.data)
              console.log(res.data.data.listData.length)
              if(res.data.data.listData.length > 1 || res.data.data.listData.length == 1 ){
                setCrime("yes")
     console.log(res.data.data)

              }
  
          })
          .catch(err => console.log(err))
    }, [])
    
  const getFreshModelObject ={
    EmployeeFormID:`${customers.EmployeeFormID}`,
    EmployeeRelativeID:0,
    Rel_Name: "",
    Rel_Job: "",
    Rel_Degree: "",
    Rel_Add: '',
    Rel_Reason: '',
    // crime:'yes'
}
const [values, setValues] = useState(getFreshModelObject);
const [errors, setErrors] = useState({});
  const history = useHistory()


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
temp.Rel_Job = values.Rel_Job != "" ? "" : "من فضلك ادخل البيانات";
temp.Rel_Degree = values.Rel_Degree != "" ? "" : "من فضلك ادخل البيانات";
temp.Rel_Add = values.Rel_Add != "" ? "" : "من فضلك ادخل البيانات";
temp.Rel_Reason = values.Rel_Reason != "" ? "" : "من فضلك ادخل البيانات";
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

      createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES6).createPrison( customers.EmployeeFormID, "0" ,values)
      .then(res => {
          resetFormControls()
          SetCustomers(res.data.data)
          // notify()
          // setLoading(false)

      })
      .then(res => {
        handlehistory( action.ADD , 'بيانات النشاط السياسي ' , "   اضافه  بيانات النشاط السياسي  ")
      })
      .then(res => {
        notify();
        setLoading(false)
        // history.push(`/Socialissue/${match.params.id}/${match.params.type}`)
      })
        .catch(function (response) {
          //handle error
           notifyErr()
         setLoading(false)
          console.log(response);
        });  
 
    } 
     console.log(values);
   }
   function handleNext(e){
    e.preventDefault()
    history.push(`/SocialActivity/${id}/${type}`)
   }



    return (
      <>
        <Form onSubmit={handleSubmit} >
        <Grid container spacing={1}>
      
                  {/*    هل تم إعتقالك او إتهامك في اي نوع من انواع القضايا؟   */}
                  <Grid item xs={12} sm={12} md={12} lg={12}>                
                  <h3
                    align ="right"
                  // component="legend"
                  color="primary"
                  > 
                   هل سبق إتهام او أعتقال احد أقاربك لنشاط سياسي او جنائي وهل تعرف لأي منهم نشاط سياسي ولو لم يكن سبق إتهامه ؟
                  </h3>
                  <RadioGroup className="flex-row" 
                  flexDirection="row"
                  aria-label="هل لديك سياره" 
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
              
               
                {crime == 'yes'? (<> 
                  <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input
              autoFocus
              //  className="dateInput"
                     name="Rel_Name"
                     label="الأسم بالكامل"
                     value={values.Rel_Name}
                     error={errors.Rel_Name}
                     type= "text"
                   onChange={handleInputChange}
                />       
             </Grid>

             {/* الوظيفه   */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="Rel_Job"
                    label="الوظيفه"
                    value={values.Rel_Job}
                    error={errors.Rel_Job}
                    type= "text"

                    onChange={handleInputChange}
               />      
             </Grid> 
            
             {/*درجه القرابه */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Rel_Degree"
                     label="درجه القرابه"
                     value={values.Rel_Degree}
                     error={errors.Rel_Degree}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/* محل الاقامه */}
               <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Rel_Add"
                     label=" محل الاقامه"
                     value={values.Rel_Add}
                     error={errors.Rel_Add}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
                   {/* سبب الاتهام */}
                   <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Rel_Reason"
                     label="سبب الاتهام"
                     value={values.Rel_Reason}
                     error={errors.Rel_Reason}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
            <Grid item  xs={12} sm={12} md={12} lg={12}>

            <Btn
            size="large"
             disabled={loading}
              >
                        {loading ? (
                <Spinner/>
           ): ('')}
          
               إضافه <ExpandMoreIcon/>  
         </Btn>
              </Grid> 
              </> ): ("")}
          
     

      
         </Grid>  
 
       
        </Form>

        {crime == 'yes'? (
          <GetPrisonTable
        SetCustomers={SetCustomers}
          customers={customers}
          setCrime={setCrime}
        />
        ): ("")}
     
      
    
        <div style={{display:"none"}}>
    <ComponentToPrint
              
              Table={GetPrisonTable}
              customers={customers}
              SetCustomers = {SetCustomers}
              title={'   هل سبق إتهام او أعتقال احد أقاربك لنشاط سياسي او جنائي وهل تعرف لأي منهم نشاط سياسي ولو لم يكن سبق إتهامه ؟'}
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

export default GetPrisonForm
