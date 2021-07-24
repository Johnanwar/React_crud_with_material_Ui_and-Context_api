import React, { useState , useEffect ,useContext , useRef} from "react"
import {Grid } from '@material-ui/core';
import Form from "../../shared/Form";
import {  useHistory } from "react-router-dom"
import { Input,Btn,Spinner ,Select} from "../../controls";
import {Alert,notify,notifyErr} from "../../components/alerts/alert"
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import PresidentTable from "./presidentTable"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {DepartmentContext} from '../../contexts/departmentContext'
import Header from "../../components/header/header"
import PrintButton  from '../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../print/react-to-print';
import {HistoryContext} from '../../contexts/historyContext'


function PresidentForm({id , type}) {
  const { managementValues } = useContext(DepartmentContext)
  const { handlehistory ,action ,UserID} = useContext(HistoryContext)

      ////printing 
      const componentRef = useRef();
      const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });

    //get array from end point
    const cst ={
      Employee30ID:"",
      EmployeeFormID:"",
      listData: [
      ]
    } 
    const [customers , SetCustomers] =useState(cst)
    const [loading, setLoading] = useState(false);
    // const [update, setupdate] = useState('g');
    const [remove, setRemove] = useState(true);

    // const [managementValues, setManagementValues] = useState([])


          // fetch departments

    useEffect(() => {
      createAPIEndpoint(ENDPIONTS.EMPLOYEES30).fetchByIdAndYear(id,type)
          .then(res => {
              SetCustomers(res.data.data)
              console.log(res.data.data)
  
          })
          .catch(err => console.log(err))
        }, [])
      

  const getFreshModelObject ={
    EmployeeFormID:`${customers.EmployeeFormID}`,
    EmployeeNationalityID:0,
    Employee30ID: "",
    Name30: "",
    Type30 : "",
    BDay30 : "",
    Age30: "",
    Nationality30: "مصري",
    Job30 : "",
    Address30 : "",
    DepID:null,
    RelativeDegree: "",
    Notes: "",

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

      createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES30).createPrison( customers.EmployeeFormID, "0" ,values)
      .then(res => {
          setLoading(false)
          notify()
          SetCustomers(res.data.data)
          resetFormControls()
      })
      .then(res => {
        handlehistory( action.ADD , 'بيانات   اقارب يعملون برئاسه الجمهوريه ' ,  "  اضافه  بيانات اقارب يعملون برئاسه الجمهوريه    ")
      })
        .catch(function (response) {
          //handle error
           notifyErr()
         setLoading(false)
        //  notify()
        //  setupdate(true)
          console.log(response);
        });  
 
    } 
     console.log(values);
   }
   function handleNext(e){
    e.preventDefault()
    history.push(`/global/${id}/${type}`)
   }





    return (
      <>
        <Form onSubmit={handleSubmit} >
        <Grid container spacing={1}>
            
              {/* name */}
           <Header>  اقارب يعملون برئاسه الجمهوريه</Header>
               
        
              {/* الأسم بالكامل */}
              <Grid item  xs={12} sm={6} md={6} lg={6}>  
              <Input className="Name30"
              autoFocus
                     name="Name30"
                     label="الأسم بالكامل"
                     value={values.Name30}
                    //  error={errors.Nat_Name}
                     type= "text"
                   onChange={handleInputChange}
                />       
             </Grid>
        {/*  الاداره التابع لها */}

             <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Select
                  label=" الإداره  التابع لها"
                  name="DepID"
               
                      value={
                      values.DepID != null && values.DepID != '0'  && managementValues.length > 0  ?
                      (managementValues.find(x => x.DepartmentID == values.DepID).DepartmentID)
                      :("")
                    }
                  onChange={handleInputChange}
                  options={managementValues}
                  // error={errors.management}

                  />
                </Grid>

    
             {/*درجه القرابه */}
             <Grid item  xs={12} sm={6} md={6} lg={6}>
                <Input
                     name="RelativeDegree"
                     label="درجه القرابه"
                     value={values.RelativeDegree}
                    //  error={errors.Type30}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
                      {/* departement */}
    
             
     
                  {/*  جهه العمل */}
                  <Grid item  xs={12} sm={6} md={6} lg={6}>
                <Input
                     name="Notes"
                     label=" ملاحظات"
                     value={values.Notes}
                    //  error={errors.Job30}
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
        <PresidentTable
          customers={customers}
          SetCustomers = {SetCustomers}
        />
        
        <div style={{display:"none"}}>
        <ComponentToPrint        
              Table={PresidentTable}
              customers={customers}
              SetCustomers = {SetCustomers}
              title={'اقارب يعملون برئاسه الجمهوريه '}
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

export default PresidentForm
