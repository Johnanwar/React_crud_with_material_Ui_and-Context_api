import React, { useState , useEffect , useRef ,useContext } from "react"
import { Grid,makeStyles} from '@material-ui/core';
import Form from "../../../shared/Form";
import { Input,Select, Btn,Spinner } from "../../../controls";
import {Alert,notify,notifyErr} from "../../../components/alerts/alert"
import Header from "../../../components/header/header"
import { useHistory } from "react-router-dom"
import BrothersWifesTable from "./BrothersWifesTable"
import { createAPIEndpoint, ENDPIONTS } from "../../../api";
import PrintButton  from '../../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../../print/react-to-print';
import {HistoryContext} from '../../../contexts/historyContext'

function BrothersWifesForm({id , type}) {
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
    const [uncle, setUncle] = useState([])
    const [remove, setRemove] = useState(true);

  
    
    useEffect(() => {
      createAPIEndpoint(ENDPIONTS.EMPLOYEES16).fetchByIdAndYear(id,type)
          .then(res => {
              SetCustomers(res.data.data)
              console.log(res.data.data)
  
          })
          .catch(err => console.log(err))

          
      createAPIEndpoint(ENDPIONTS.EMPLOYEES10).fetchByIdAndYear(id,type)
      .then(res => {
    
          var parentArray = [] 
          res.data.data.listData.forEach((item ,idx) => {
            parentArray.push(
              {DepartmentID: item.FatherName , DepartmentName:item.FatherName},
            )
            console.log(parentArray)
            setUncle(parentArray)
         })
    
      })
      .catch(err => console.log(err))
    }, [])
      

    const getFreshModelObject ={
      EmployeeFormID:`${customers.EmployeeFormID}`,
      EmployeePart_BroID:0,
      // Part_BroName: "",
      Part_BroBDay:"",
      Part_BroAge:"",
      Part_BroAddress:"",
      // KidGender: "",
      Part_BroNationality: 'مصري',
      Part_BroJob:"",
      uncle:"",
      name:"",
  }
const [values, setValues] = useState(getFreshModelObject);
const [errors, setErrors] = useState({});

  const history = useHistory()


const handleInputChange = e => {
const { name, value } = e.target;

var today = new Date();
var birthDate = new Date(values.Part_BroBDay);
var age_now = today.getFullYear() - birthDate.getFullYear();
var m = today.getMonth() - birthDate.getMonth();
if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
{
    age_now--; 
}
setValues({
    ...values,
    [name]: value,
    Part_BroName :`${values.name}  ${values.uncle}  `,
    Part_BroAge:age_now,
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
  
        createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES16).createPrison( customers.EmployeeFormID, "0" ,values)
        .then(res => {
            setLoading(false)
            notify()
            SetCustomers(res.data.data)
            resetFormControls();
            console.log(res);
            SetCustomers(res.data.data)
        })
        .then(res => {
          handlehistory( action.ADD , 'بيانات    اشقاء وشقيقات الزوجه ' ,  "  اضافه  بيانات  اشقاء وشقيقات الزوجه    ")
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
    history.push(`/AddWifeSisterHusband/${id}/${type}`)
   }

    return (
      <>
        <Form onSubmit={handleSubmit} >
        <Grid container spacing={1}>
             <Header>
             بيانات    اشقاء وشقيقات الزوجه
              </Header>
              {/* name */}
              <Grid item item  xs={12} sm={6} md={4} lg={4} >
                <Input
                autoFocus
                   name="name"
                   label="  الاسم بالكامل  "
                   value={values.name}
                  //  error={errors.wName}
                   onChange={handleInputChange}
                   type= "text"
                />
  
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Select
                  label="اختار اب"
                  name="uncle"
                  // value={
                  //     values.Gender!=null ?(
                  //       genders[values.Gender].DepartmentID
                  //     ):('')
                  //   }
                    // value={
                    //   values.Gender != null  ?
                    //   (genders.find(x => x.DepartmentID == values.Gender).DepartmentID)
                    //   :("")
                    // }
                  // value={genders[values.Gender].DepartmentID}
                  onChange={handleInputChange}
                  value={values.uncle}
                  options={uncle}
                  error={errors.uncle}

                  />
                </Grid>
        
              {/* date of birth */}
              <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input className="dateInput"
                     name="Part_BroBDay"
                     label="تاريخ الميلاد"
                     value={values.Part_BroBDay}
                    //  error={errors.Part_BroBDay}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>
     

             {/* age   */}
             {/* <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="Part_BroAge"
                    label="السن"
                    value={values.Part_BroAge}
                    error={errors.Part_BroAge}
                    type= "number"

                    onChange={handleInputChange}
            />
        
             </Grid>  */}
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Part_BroNationality"
                     label=" الجنسيه"
                     value={values.Part_BroNationality}
                     error={errors.wNationalID}
                     onChange={handleInputChange}
                     type= "فصثءف"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Part_BroJob"
                     label=" الوظيفه"
                     value={values.Part_BroJob}
                    //  error={errors.Part_BroJob}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>

            <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input 
                     name="Part_BroAddress"
                     label=" محل الاقامه"
                     value={values.Part_BroAddress}
                    //  error={errors.Part_BroBDay}
                     type= "text"
                   onChange={handleInputChange}
                />       
             </Grid>
      </Grid>  
 
         <Btn
              disabled={loading}
              >
                        {loading ? (
                <Spinner/>
           ): ('')}
              إضافه  
            </Btn>
       
        </Form>
        <BrothersWifesTable
           customers={customers}
           SetCustomers = {SetCustomers}
        />
 
<div style={{display:"none"}}>
    <ComponentToPrint
              
              Table={BrothersWifesTable}
              customers={customers}
              SetCustomers = {SetCustomers}
              title={'  بيانات      اشقاء وشقيقات الزوجه'}
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

export default BrothersWifesForm
