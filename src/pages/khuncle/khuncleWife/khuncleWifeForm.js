import React, { useState ,useEffect ,useContext , useRef } from "react"
import 'react-toastify/dist/ReactToastify.css';
import { Grid} from '@material-ui/core';
import Form from "../../../shared/Form";
import { Input, Btn,Spinner } from "../../../controls";
import {Alert,notify,notifyErr} from "../../../components/alerts/alert"
import { createAPIEndpoint, ENDPIONTS } from "../../../api";
import Header from "../../../components/header/header"
import {  useHistory } from "react-router-dom"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UncleKhWifeTable from "./khuncleWifeTable"
import PrintButton  from '../../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../../print/react-to-print';
import {HistoryContext} from '../../../contexts/historyContext'


function UncleWifeForm({id , type}) {
  const { handlehistory ,action ,UserID} = useContext(HistoryContext)

     ////printing 
     const componentRef = useRef();
     const handlePrint = useReactToPrint({
       content: () => componentRef.current,
     })
    //get array from end point
    const cst ={
      Employee22ID:"",
      EmployeeFormID:"",
      listData: [
      ]
    } 
    const [customers , SetCustomers] =useState(cst)
    const [loading, setLoading] = useState(false);
    const [update, setupdate] = useState('g');
    const [remove, setRemove] = useState(true);
  
    
    useEffect(() => {
      createAPIEndpoint(ENDPIONTS.EMPLOYEES22).fetchByIdAndYear(id,type)
          .then(res => {
            if(res.data.data!= null){
              SetCustomers(res.data.data)
              console.log(res.data.data)
            }
             
  
          })
          .catch(err => console.log(err))
    }, [])


    
    const getFreshModelObject ={
      EmployeeFormID:`${customers.EmployeeFormID}`,
      Employee22ID:'',
      Name22: "",
      Address: "",
      Job: "",
      Nationality22: 'مصري',
      Age22:'',
      BDay22: '',
  }
const [values, setValues] = useState(getFreshModelObject);
const [errors, setErrors] = useState({});
  const history = useHistory()


const handleInputChange = e => {
const { name, value } = e.target;

var today = new Date();
var birthDate = new Date(values.BDay22);
var age_now = today.getFullYear() - birthDate.getFullYear();
var m = today.getMonth() - birthDate.getMonth();
if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
{
    age_now--; 
}

setValues({
    ...values,
    [name]: value,
    Age22:age_now,
    UserID:UserID,

})
}

const validateForm = () => {
let temp = {};
temp.wName = values.wName != "" ? "" : "لو سمحت املا البيانات";
temp.wBirth = values.wBirth != "" ? "" : "لو سمحت املا البيانات";
temp.wAge = values.wAge != "" ? "" : "لو سمحت املا البيانات.";
temp.wNationalID = values.wNationalID != "" ? "" : "لو سمحت املا البيانات.";
temp.wJob = values.wJob != "" ? "" : "لو سمحت املا البيانات";
setErrors({ ...temp });
return Object.values(temp).every(x => x === "");
}

const resetFormControls = () => {
setValues(getFreshModelObject);
}

  // const [loading, setLoading] = useState(false)
  // const hist =[]
  function handleSubmit(e) {
    if (validateForm()) {
      e.preventDefault()
      setLoading(true)

      createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES22).createPrison( customers.EmployeeFormID, "0" ,values)
      .then(res => {
          setLoading(false)
          notify()
          setupdate('dd')
          resetFormControls();
          console.log(res);
          SetCustomers(res.data.data)

      })
      .then(res => {
        handlehistory( action.ADD , 'بيانات   زوجات الاخوال ' ,  "  اضافه  بيانات زوجات الاخوال    ")
      })
        .catch(function (response) {
          //handle error
          //  notifyErr()
         setLoading(false)
         notify()
         setupdate(true)
         resetFormControls()

          console.log(response);
        });  
 
    } 
     console.log(values);
   }
   function handleNext(e){
    e.preventDefault()
    history.push(`/UncleKhSons/${id}/${type}`)
   }

    return (
      <>
        <Form onSubmit={handleSubmit} >
        <Grid container spacing={1}>
             <Header>
                 زوجات الاخوال

              </Header>
              <Grid item item  xs={12} sm={6} md={4} lg={4} >
                <Input
                autoFocus
                   name="Name22"
                   label="  الاسم بالكامل  "
                   value={values.Name22}
                  //  error={errors.wName}
                   onChange={handleInputChange}
                   type= "text"
                />
  
              </Grid>
        
              {/* date of birth */}
              <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input className="dateInput"
                     name="BDay22"
                     label="تاريخ الميلاد"
                     value={values.BDay22}
                    //  error={errors.BDay22}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>
 
             {/* <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="Age22"
                    label="السن "
                    value={values.Age22}
                    // error={errors.Address}
                    type= "text"

                    onChange={handleInputChange}
            />
        
             </Grid> */}
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Nationality22"
                     label=" الجنسيه"
                     value={values.Nationality22}
                    //  error={errors.Nationality22}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Job"
                     label=" الوظيفه"
                     value={values.Job}
                     error={errors.Job}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
                    
             {/* محل الاقامه */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Address"
                     label=" محل الاقامه"
                     value={values.Address}
                     error={errors.Address}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
      </Grid>  
      <Btn
            size="large"
            disabled={loading}

            >
               إضافه <ExpandMoreIcon/> 
               {loading ? (
                <Spinner/>
           ): ('')}
         </Btn>
       
        </Form>
        <UncleKhWifeTable
          customers={customers}
          SetCustomers = {SetCustomers}
        />

<div style={{display:"none"}}>  
              <ComponentToPrint           
              Table={UncleKhWifeTable}
              customers={customers}
              SetCustomers = {SetCustomers}
              title={'  بيانات   زوجات الاخوال'}
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
           
           
               متابعه 
            </Btn>
  
         </div>
        </>
             
    )
}

export default UncleWifeForm
