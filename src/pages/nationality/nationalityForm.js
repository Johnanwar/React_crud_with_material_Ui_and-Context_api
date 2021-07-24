import React, { useState , useEffect ,useRef ,useContext } from "react"
import {Grid ,FormControlLabel ,RadioGroup ,Radio } from '@material-ui/core';
import Form from "../../shared/Form";
import {  useHistory } from "react-router-dom"
import { Input,Btn,Spinner } from "../../controls";
import {Alert,notify,notifyErr} from "../../components/alerts/alert"
import NationalityTable from "./nationalityTable"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import PrintButton  from '../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../print/react-to-print'
import {HistoryContext} from '../../contexts/historyContext'

function NationalityForm({id ,type}) {
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
    const [crime, setCrime] = useState('no');
    const [remove, setRemove] = useState(true);

  
    
    useEffect(() => {
      createAPIEndpoint(ENDPIONTS.EMPLOYEES7).fetchByIdAndYear(id,type)
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
    EmployeeFormID:`${customers.EmployeeFormID}`,
    EmployeeNationalityID:0,
    Nat_Name: "",
    Nat_Degree: "",
    Nat_Type: '',
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
temp.Nat_Name = values.Nat_Name != "" ? "" : "من فضلك ادخل البيانات";
temp.Nat_Degree = values.Nat_Degree != "" ? "" : "من فضلك ادخل البيانات";
temp.wAge = values.wAge != "" ? "" : "من فضلك ادخل البيانات";

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

      createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES7).createPrison( customers.EmployeeFormID, "0" ,values)
      .then(res => {
          setLoading(false)
          notify()
          resetFormControls()
          SetCustomers(res.data.data)
      })
      .then(res => {
        handlehistory( action.ADD , 'بيانات  الجنسيه  ' , "   اضافه  بيانات   الجنسيه   ")
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
    history.push(`/religion/${id}/${type}`)
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
                  بالإضافه الى الجنسيه المصريه هل لك او لأحد اقاربك جنسيات اخرى؟
                  </h4>

                  <RadioGroup className="flex-row" 
                  flexDirection="row"
                  aria-label="  بالإضافه الى الجنسيه المصريه هل لك او لأحد اقاربك جنسيات اخرى؟" 
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
              {/* الأسم بالكامل */}
         
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                autoFocus
                     name="Nat_Name"
                     label="الأسم بالكامل"

                     value={values.Nat_Name}
                     error={errors.Nat_Name}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>

    
             {/*درجه القرابه */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Nat_Degree"
                     label="انت او احد اقاربك مع ذكر درجه القرابه "
                     value={values.Nat_Degree}
                     error={errors.Nat_Degree}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
            <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input 
              
                     name="Nat_Type"
                     label="  الجنسيه"

                     value={values.Nat_Type}
                     error={errors.Nat_Type}
                     type= "text"
                   onChange={handleInputChange}
                />       
             </Grid>
             {/*  الجنسيه */}
        
            <div
  style={{margin:"20px 0", textAlign:'center', width:'100%'}}
  >
                   <Btn
            size="large"
             disabled={loading}
              >
                        {loading ? (
                <Spinner/>
           ): ('')}
          
               إضافه <ExpandMoreIcon/>  
         </Btn>
         </div>
         </> ): ("")}
         </Grid>  
    
       
        </Form>
        {crime == 'yes'? (
        <NationalityTable
          customers={customers}
          SetCustomers = {SetCustomers}
          setCrime={setCrime}

        />
          ): ("")}

          <div style={{display:"none"}}>
    <ComponentToPrint
              
              Table={NationalityTable}
              customers={customers}
              SetCustomers = {SetCustomers}
              title={'بالإضافه الى الجنسيه المصريه هل لك او لأحد اقاربك جنسيات اخرى؟'}
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

export default NationalityForm
