import React, { useState , useEffect ,useRef , useContext } from "react"
import {Grid ,FormControlLabel ,RadioGroup ,Radio } from '@material-ui/core';
import Form from "../../shared/Form";
import {  useHistory } from "react-router-dom"
import { Input,Btn,Spinner } from "../../controls";
import {Alert,notify,notifyErr} from "../../components/alerts/alert"
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import SocialissueTable from "./socialissueTable"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Header from "../../components/header/header"
import PrintButton  from '../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../print/react-to-print'
import {HistoryContext} from '../../contexts/historyContext'

function SocialissueForm({id , type}) {
  const { handlehistory ,action ,UserID} = useContext(HistoryContext)
  // const UserID = localStorage.getItem('UserID');
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
    const [crime, setCrime] = useState('no');
    const [remove, setRemove] = useState(true);

    
    useEffect(() => {
      createAPIEndpoint(ENDPIONTS.EMPLOYEES5Issue).fetchByIdAndYear(id,type)
          .then(res => {
              SetCustomers(res.data.data)
              console.log(res.data.data)
              if(res.data.data.listData.length > 1 || res.data.data.listData.length == 1 ){
                setCrime("yes")}
  
          })
          .catch(err => console.log(err))
    }, [])
      

  const getFreshModelObject ={
    EmployeeFormID:`${customers.EmployeeFormID}`,
    EmployeeSocialID:0,
    Issue: "",
    Notes: "",
    IssueDate: '',
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
temp.Nat_Name = values.Nat_Name != "" ? "" : "???? ???????? ???????? ????????????????";
temp.Nat_Degree = values.Nat_Degree != "" ? "" : "???? ???????? ???????? ???? ???????? ???????? ????????????????";
temp.wAge = values.wAge != "" ? "" : "???? ???????? ???????? ????????????????";

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

      createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES5Issue).createPrison( customers.EmployeeFormID, "0" ,values)
      .then(res => {
          // setLoading(false)
          // notify()
          SetCustomers(res.data.data)
          resetFormControls()  
      })
      .then(res => {
        handlehistory( action.ADD , '????????????   ?????????????? ' ,  "  ??????????  ???????????? ??????????????    ")
      })
      .then(res => {
        notify();
        setLoading(false)
       })
        .catch(function (response) {
          //handle error
           notifyErr()
         setLoading(false)
        //  notify()
          console.log(response);
        });  
 
    } 
     console.log(values);
   }
   function handleNext(e){
    e.preventDefault()
    history.push(`/Nationality/${id}/${type}`)
   }





    return (
      <>
        <Form onSubmit={handleSubmit} >
        <Grid container spacing={1}>
            
              {/* name */}
           <Header>  ???? ???? ?????????????? ???? ???????????? ???? ???? ?????? ???? ?????????? ?????????????? </Header>
               
           <Grid item xs={12} sm={12} md={12} lg={12}>                
                  <h4 
                    align ="right"
                  // component="legend"
                  color="primary"
                  > 
                   ???? ???? ?????????????? ???? ???????????? ???? ???? ?????? ???? ?????????? ?????????????? ??
                  </h4>
                  <RadioGroup className="flex-row" 
                  flexDirection="row"
                  aria-label="???? ???????? ??????????" 
                  name="crime" value={crime} 
                  onChange={(e)=> setCrime(e.target.value)}>

              
                  <FormControlLabel
                    value="no"
                    control={<Radio color="primary" />}
                    label="????"
                  />
                  <FormControlLabel
                    value="yes"
                    control={<Radio color="primary" />}
                    label="??????"
                  />
                
                  </RadioGroup>
                </Grid>

                {crime == 'yes'? (
                  <>
              {/* ?????????? ?????????????? */}
              <Grid item item  xs={12} sm={6} md={6} lg={6} >
                   <Input
                   autoFocus
                     name="Issue"
                     label="  ?????? ???????????? "
                     value={values.Issue}
                     error={errors.Issue}
                    onChange={handleInputChange}
                    type= "text"
                  />
                  </Grid>
                   {/* ??????????????*/}                 
                  <Grid item item  xs={12} sm={6} md={6} lg={6} >
                   <Input className="dateInput"
                     name="IssueDate"
                     label=" ?????????????? "
                     value={values.IssueDate}
                    //  error={errors.wName}
                    onChange={handleInputChange}
                    type= "date"
                  />
                  </Grid>
                   {/*  ?????? ???????????? */}
                <Grid item item  xs={12} sm={12} md={12} lg={12} >
                   <Input
                     name="Notes"
                     label=" ?????? ???????????? "
                     value={values.Notes}
                    //  error={errors.wName}
                    onChange={handleInputChange}
                    type= "text"
                    multiline
                    rows={2}
                  />
                   {/* ?????????? ?????????????? ?????????????? */}
                  </Grid>
      
            <div
  style={{margin:"20px 0", textAlign:'center', width:'100%'}}
  >
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
         </>
        ): ("")}


         </Grid>  
    
       
        </Form>
        {crime == 'yes'? (
        <SocialissueTable
          customers={customers}
          SetCustomers = {SetCustomers}
          setCrime={setCrime}
        />
        
        ): ('')}

        <div style={{display:"none"}}>
    <ComponentToPrint
              
              Table={SocialissueTable}
              customers={customers}
              SetCustomers = {SetCustomers}
              title={'???? ???? ?????????????? ???? ???????????? ???? ???? ?????? ???? ?????????? ??????????????'}
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

export default SocialissueForm
