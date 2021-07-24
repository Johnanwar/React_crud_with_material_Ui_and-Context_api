import React, { useState , useEffect , useContext, useRef } from "react"
import {Grid  } from '@material-ui/core';
import Form from "../../shared/Form";
import {  useHistory } from "react-router-dom"
import { Input,Btn,Spinner } from "../../controls";
import {Alert,notify,notifyErr} from "../../components/alerts/alert"
import GlobalTable from "./globalTable"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import Header from "../../components/header/header"
import PrintButton  from '../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../print/react-to-print';
import {HistoryContext} from '../../contexts/historyContext'


function GlobalForm({id ,type}) {
  const { handlehistory ,action ,UserID} = useContext(HistoryContext)

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
    // const [update, setupdate] = useState('g');
    const [remove, setRemove] = useState(true);
  
    
    useEffect(() => {
      createAPIEndpoint(ENDPIONTS.EMPLOYEES31).fetchByIdAndYear(id,type)
          .then(res => {
              SetCustomers(res.data.data)
              console.log(res.data.data)
  
          })
          .catch(err => console.log(err))
    }, [])
      

  const getFreshModelObject ={
    EmployeeFormID:`${customers.EmployeeFormID}`,
    EmployeeNationalityID:0,
    Name31: "",
    Type31: "",
    Nationality31: 'مصري',
    Job31: '',
    Address31: '',


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
temp.Nat_Degree = values.Nat_Degree != "" ? "" : "لو سمحت املا من فضلك ادخل البيانات";
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

      createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES31).createPrison( customers.EmployeeFormID, "0" ,values)
      .then(res => {
          setLoading(false)
          notify()
          SetCustomers(res.data.data)
          resetFormControls();
          console.log(res);
      })
      .then(res => {
        handlehistory( action.ADD , 'بيانات   اقارب يعملون بمؤسسات عالميه او خارج البلاد ' ,  "  اضافه  بيانات اقارب يعملون بمؤسسات عالميه او خارج البلاد    ")
      })
        .catch(function (response) {
          //handle error
           notifyErr()
         setLoading(false)
        //  setupdate(true)

          console.log(response);
        });  
 
    } 
     console.log(values);
   }
   function handleNext(e){
    e.preventDefault()
    history.push(`/Document/${id}/${type}`)

   }
   



    return (
      <>
        <Form onSubmit={handleSubmit} >
        <Grid container spacing={1}>
            
              {/* name */}
           <Header>  اقارب يعملون بمؤسسات عالميه او خارج البلاد</Header>
               
        
              {/* الأسم بالكامل */}
              <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input className="Name31"
              autoFocus
                     name="Name31"
                     label="الأسم بالكامل"
                     value={values.Nat_Name}
                     error={errors.Nat_Name}
                     type= "text"
                   onChange={handleInputChange}
                />       
             </Grid>

    
             {/*درجه القرابه */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Type31"
                     label="درجه القرابه"
                     value={values.Type31}
                    //  error={errors.Type31}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/*  الوظيفه */}
               <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Job31"
                     label="الوظيفه"
                     value={values.Job31}
                    //  error={errors.Nat_Type}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
                  {/*  جهه العمل */}
                  <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Nationality31"
                     label="    الجنسيه"
                     value={values.Nationality31}
                    //  error={errors.Nationality31}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
                  {/*  الجنسيه */}
                  <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Address31"
                     label="  محل الاقامه"
                     value={values.Address31}
                    //  error={errors.Nat_Type}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
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

         </Grid>  
    
       
        </Form>
        <GlobalTable
          customers={customers}
          SetCustomers = {SetCustomers}
        />
        <div style={{display:"none"}}>
    <ComponentToPrint
              
              Table={GlobalTable}
              customers={customers}
              SetCustomers = {SetCustomers}
              title={' اقارب يعملون بمؤسسات عالميه او خارج البلاد '}
              ref={componentRef} 
              remove={remove}
              code={id}
              />
    </div>
              
    {customers.listData.length > 1 || customers.listData.length == 1 ?  (
      <div>
        <PrintButton onClick={handlePrint}/>
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

export default GlobalForm
