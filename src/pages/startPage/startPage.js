import React, { useState ,useContext } from "react"
import { useHistory } from "react-router-dom"
import { Container, Grid, } from '@material-ui/core';
import Form from "../../shared/Form";
import { Input,  Spinner ,Btn } from "../../controls";
import Nav from "../../components/nav/nav"
import Header from "../../components/header/header"
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import {ParameterContext} from '../../contexts/parameterContext'


function StartPage() {
  const { setParamId ,setParamType  } = useContext(ParameterContext)



    const history = useHistory()
    const getFreshModelObject = {
        EmployeeCode: "",
        FormYear: "2021",
    }
    const [values, setValues] = useState(getFreshModelObject);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("لا يوجد ");
    const [lastDiv, ssetLastDiv] = useState(false);
    const UserID = localStorage.getItem('UserID');
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value,
            UserID:UserID
        })
        localStorage.setItem('myData', JSON.stringify(values));

    }

    const validateForm = () => {
        let temp = {};
        // temp.management = values.management != "" ? "" : "لو سمحت املا البيانات";
        temp.EmployeeCode = values.EmployeeCode != "" ? "" : "من فضلك إدخل البيانات";
        // temp.year = values.year != "" ? "" : "لو سمحت املا البيانات.";
        // temp.EmployeeName = values.EmployeeName != "" ? "" : "لو سمحت املا البيانات.";
        // temp.nationalID = values.nationalID != "" ? "" : "لو سمحت املا البيانات";
        setErrors({...temp });
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
          createAPIEndpoint(ENDPIONTS.EMPLOYEES).fetchByIdAndYear(values.EmployeeCode,values.FormYear )
          .then(res => {
              console.log(res.data.data)
              if(res.data.data != null){
                setValues(res.data.data)
                ssetLastDiv(true)
                setName(res.data.data.E_Name)
                setLoading(false)
                localStorage.setItem('EmployeeCode', res.data.data.EmployeeCode);
                localStorage.setItem('FormYear', res.data.data.FormYear);
              }
          })
          .catch(err => console.log(err))
            // history.push(`/JobData/${match.params.id}`)
            console.log(values);
            setLoading(false)

        }
    }

    function handleNext(e){
      e.preventDefault()
      setParamId(values.EmployeeCode)
      setParamType(values.FormYear)
      history.push(`/PersonalData/${values.EmployeeCode}/${values.FormYear}`)
     }
    return ( <>

<Nav/>
    <Container  className="clienDetail">
          <Form onSubmit={handleSubmit} >
          <Grid container spacing={1}>
          <Header>
                  نموذج بيانات مرشح 

                </Header>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Input
                     name="EmployeeCode"
                     label=" الكود الخاص "
                     value={values.EmployeeCode}
                     error={errors.EmployeeCode}
                     onChange={handleInputChange}
                     type= "text"
                     autoFocus
                  />
    
                </Grid>
          
                <Grid item xs={12} sm={6} md={6} lg={6}>
                <Input
                       name="FormYear"
                       label="العام"
                       value={values.FormYear}
                       error={errors.FormYear}
                       type= "number"

                     onChange={handleInputChange}
                  />
             
               </Grid>
                    

       

        </Grid>  
           <Btn
        
              size="large"
              color="primary"
              disabled={loading}
              // onClick={handleSubmit}
              >
              {loading ? (
                <Spinner/>
           ): ('')}
                 إضافه ومتابعه 
           </Btn>
           {/* <p>   {loading ? (
            <CircularProgress />
           ): ('')}</p> */}
         
          </Form>
<hr/>
        {lastDiv ? (
          <div style={{textAlign:"center", marginTop:"20px"}}>
          <h1 style={{backgroundColor:"#eee" , margin :"20px 0"}}>   الاسم :- {name} </h1> 
          <Btn
            size="large"
            // color="primary"
            onClick={handleNext}
            >
                متابعه
         </Btn>
         </div>
        ):("")}
               
          
        </Container>
     
         </>
    )
}

export default StartPage