import React, { useState , useEffect , useRef ,useContext } from "react"
import {Grid  } from '@material-ui/core';
import Form from "../../shared/Form";
import {  useHistory } from "react-router-dom"
import { Input,Btn,Select, Spinner } from "../../controls";
import {Alert,notify,notifyErr} from "../../components/alerts/alert"
// import GlobalTable from "./globalTable"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import Header from "../../components/header/header"
import PrintButton  from '../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../print/react-to-print';
import {DepartmentContext} from '../../contexts/departmentContext'
import EtntryReportTable from './EtntryReportTable'

function EtntryReportForm({id ,type}) {
        ////printing 
        const componentRef = useRef();
        const handlePrint = useReactToPrint({
          content: () => componentRef.current,
        });
    
        //get array from end point
        const cst ={
          EmployeeFormID:"",
          data: [
          ]
        } 
        const { managementValues } = useContext(DepartmentContext)
         const [loading, setLoading] = useState(false);
         const [remove, setRemove] = useState(true);
         const [customers , SetCustomers] =useState(cst)

        
     
    
      const getFreshModelObject ={
        DepartmentID:0,
        EmployeeName: '',
        FormYearFrom: "",
        FormYearTo: '', 
    }
    const [values, setValues] = useState(getFreshModelObject);
     const [errors, setErrors] = useState({});
      const history = useHistory()
    
    
    const handleInputChange = e => {
    const { name, value } = e.target
       setValues({
        ...values,
        [name]: value
    })
  
    // else if(){}

    
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
    
 
       function handleSubmit(e) {
        e.preventDefault()
        if (validateForm()) {
          if(values.FormYearFrom.length<1){
            setValues({
              ...values,
              FormYearFrom:"0",
          })
          }
          else if( values.FormYearTo.length< 1){
            setValues({
              ...values,
              FormYearTo:"0",
          })
          }
          setLoading(true)
          // console.log(values);
    
          createAPIEndpoint(ENDPIONTS.ENTRYREPORT).create(values)
          .then(res => {
              setLoading(false)
              //  notify()
               SetCustomers(res.data)
              //  console.log(values)
              // resetFormControls();
              console.log(res);
          })
            .catch(function (response) {
              //handle error
              //  notifyErr()
              setLoading(false)    
              console.log(response);
            });  
     
        } 
        //  console.log(values);
       }
 
   
       
    return (
        <>
            

            <Form onSubmit={handleSubmit} >
                 <Grid container spacing={1}>
            
            <Header> بيانات  الموظفين خلال فتره  </Header>
               
        
              {/* الأسم بالكامل */}
         

             <Grid item xs={12} sm={6} md={3} lg={3}>
                  <Select
                  label=" الإداره  التابع لها"
                  name="DepartmentID"
               
                      value={
                      values.DepartmentID != null && values.DepartmentID != '0'  && managementValues.length > 0  ?
                      (managementValues.find(x => x.DepartmentID == values.DepartmentID).DepartmentID)
                      :("")
                    }
                  onChange={handleInputChange}
                  options={managementValues}
                  // error={errors.management}
                  />
                </Grid>
                <Grid item  xs={12} sm={6} md={3} lg={3}>  
                    <Input className="Name31"
                    autoFocus
                            name="FormYearFrom"
                            label="  من سنه"
                            value={values.FormYearFrom}
                            error={errors.Nat_Name}
                            type= "number"
                        onChange={handleInputChange}
                        />       
             </Grid>

                <Grid item  xs={12} sm={6} md={3} lg={3}>  
              <Input className="Name31"
              autoFocus
                     name="FormYearTo"
                     label="  إلى سنه"
                     value={values.FormYearTo}
                     error={errors.Nat_Name}
                     type= "number"
                   onChange={handleInputChange}
                />       
             </Grid>

             <Grid item  xs={12} sm={6} md={3} lg={3}>  
              <Input className="Name31"
              autoFocus
                     name="EmployeeName"
                     label="الأسم  "
                    //  label="الأسم بالكامل"
                     value={values.EmployeeName}
                     error={errors.EmployeeName}
                     type= "text"
                   onChange={handleInputChange}
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
           بحث <ExpandMoreIcon/>   
            </Btn>
         </div>

         </Grid>  
    
       
        </Form>


        <EtntryReportTable
           values={values}
          customers={customers}

        />
        <div style={{display:"none"}}>
    <ComponentToPrint
              
              Table={EtntryReportTable}
              customers={customers}
              SetCustomers = {SetCustomers}
              title={"بيانات الموظفين خلال فتره"}
              ref={componentRef} 
              remove={remove}
              code={null}
           values={values}
           Dep={
            values.DepartmentID != null && values.DepartmentID != '0'  && managementValues.length > 0  ?
                      (managementValues.find(x => x.DepartmentID == values.DepartmentID).DepartmentName)
                      :("")
           }

              />
    </div>
              
    {customers.data.length > 1 || customers.data.length == 1 ?  (
      <div>
        <PrintButton onClick={handlePrint}/>
      </div>
       ) : ( '') }



        </>
    )
}

export default EtntryReportForm
