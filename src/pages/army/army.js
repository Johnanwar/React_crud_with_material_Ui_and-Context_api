import React ,{ useState , useEffect , useContext,useRef } from 'react'
import { Grid ,FormControlLabel ,RadioGroup ,Radio } from '@material-ui/core';
import {  useHistory } from "react-router-dom"
import Form from "../../shared/Form";
  import { Input,Btn,Spinner } from "../../controls";
import {Alert,notify,notifyErr} from "../../components/alerts/alert"
import { createAPIEndpoint, ENDPIONTS } from "../../api";
import ArmyTable from "./armyTable"
import PrintButton  from '../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../print/react-to-print'
import {HistoryContext} from '../../contexts/historyContext'

function Army({match}) {
  const { handlehistory ,action } = useContext(HistoryContext)
  const UserID = localStorage.getItem('UserID');
   ////printing 
   const componentRef = useRef();
   const handlePrint = useReactToPrint({
     content: () => componentRef.current,
   });

    const getFreshModelObject ={
        MilitaryStatus:'',
        // rotba
        RankName:"",
        MilitaryNumber:"",
        armNum:"",
        UnitNumber:"",
        MilitaryPost:"",
        Weapon:"",
        MilitaryDate:"",
     
    }
    const [values, setValues] = useState(getFreshModelObject);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

      const history = useHistory()
    
    
    const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
        ...values,
        [name]: value,
        UserID:UserID,
    })
    }
    // get data from api
useEffect(() => {
  createAPIEndpoint(ENDPIONTS.EMPLOYEES4).fetchByIdAndYear(match.params.id,match.params.type)
      .then(res => {
          // console.log(res.data.data)
          if(res.data.data != null){
            console.log(res.data.data)
            setValues(res.data.data)
            console.log(values.BDate)
            console.log((values.BDate).slice(0,10))
          }
      })
      .catch(err => console.log(err));
      // fetch departments


}, [])

    
    const validateForm = () => {
    let temp = {};
    // temp.wName = values.wName != "" ? "" : "???? ???????? ???????? ????????????????";

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
          createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES4).create(values)
          .then(res => {
              console.log(res)
              // setLoading(false)
              // history.push(`/GetPrison/${match.params.id}/${match.params.type}`)
              // notify()
          })
          .then(res => {
            handlehistory( action.ADD  , '???????????? ???????????? ?????????????????? ' ,  "??????????  ???????????? ???????????? ???????????? ??????????????????")
          })
          .then(res => {
            notify();
            setLoading(false)
            history.push(`/GetPrison/${match.params.id}/${match.params.type}`)
          })
            .catch(function (response) {
               notifyErr()
               setLoading(false)
              console.log(response);
            });
          console.log(values);
         
     
        }   
       }

    return (
        <>
      
       
                    <Form onSubmit={handleSubmit} >
                    <Grid container spacing={1}>
                         {/*    ???????????? ???? ??????????????    */}
                            <Grid item xs={12} sm={12} md={12} lg={12}>                
                            <h4 
                                align ="right"
                            // component="legend"
                            color="primary"
                            > 
                            ???????????? ???? ?????????????? 
                            </h4>

                            <RadioGroup className="flex-row" 
                            flexDirection="row"
                            aria-label=" ???????????? ???? ?????????????? " 
                            name="MilitaryStatus" value={values.MilitaryStatus.toString()} 
                            onChange={handleInputChange}>
                        
                        <FormControlLabel
                                value="0"
                                control={<Radio color="primary" />}
                                label="???????? ??????????"
                                // checked={values.MilitaryStatus  === 1} 
                            />
                            <FormControlLabel
                                value="1"
                                control={<Radio color="primary" />}
                                label="???????? ????????"
                                // checked={values.MilitaryStatus  === 2} 
                            />
                              <FormControlLabel
                                value="2"
                                control={<Radio color="primary" />}
                                // checked={values.MilitaryStatus  === 3} 
                                label=" ????????"
                            />
                              <FormControlLabel
                                value="3"
                                control={<Radio color="primary" />}
                                // checked={values.MilitaryStatus  === 4} 
                                label="??????????"
                            />
                            <FormControlLabel
                                value="4"
                                control={<Radio color="primary" />}
                                label="?????? ???????????? ????????????????"
                                // checked={values.MilitaryStatus  === 5} 
                            />
                            
                            </RadioGroup>
                        </Grid>

                        { values.MilitaryStatus == "2" || values.MilitaryStatus == "4"  || values.MilitaryStatus == "3" ? (<>
                          <Grid item  xs={12} sm={6} md={4} lg={4}>
                            <Input
                                    name="RankName"
                                    label=" ????????????"
                                    value={values.RankName}
                                    type= "text"
                                    onChange={handleInputChange}
                            />      
                            </Grid>
                          <Grid item  xs={12} sm={6} md={4} lg={4}>
                            <Input
                                    name="MilitaryNumber"
                                    label="?????????? ??????????????"
                                    value={values.MilitaryNumber}
                                    type= "text"
                                    onChange={handleInputChange}
                            />      
                            </Grid>
                            <Grid item  xs={12} sm={6} md={4} lg={4}>
                            <Input
                                    name="UnitNumber"
                                    label="?????? ????????????"
                                    value={values.UnitNumber}
                                    type= "text"
                                    onChange={handleInputChange}
                            />      
                            </Grid>
                            <Grid item  xs={12} sm={6} md={4} lg={4}>
                            <Input
                                    name="MilitaryPost"
                                    label=" ?????????? ???????? ????????"
                                    value={values.MilitaryPost}
                                    type= "text"
                                    onChange={handleInputChange}
                            />      
                            </Grid>
                            <Grid item  xs={12} sm={6} md={4} lg={4}>
                            <Input
                                    name="Weapon"
                                    label="????????????"
                                    value={values.Weapon}
                                    type= "text"
                                    onChange={handleInputChange}
                            />      
                            </Grid>
                            <Grid item  xs={12} sm={6} md={4} lg={4}>
                            <Input
                                    className="dateInput"
                                    name="MilitaryDate"
                                    label="?????????? ?????????????? ?????? ????????????????"
                                    value={values.MilitaryDate!=null ?
                                   ((values.MilitaryDate).slice(0,10)):('')}
                                    // value={values.MilitaryDate}
                                    type= "date"
                                    onChange={handleInputChange}
                            />      
                            </Grid>


                            </>) : (<></>) }

                    </Grid>
                    
                    <Btn
              size="large"
              color="primary"
              disabled={loading}
              >
                        {loading ? (
                <Spinner/>
           ): ('')}
              ?????????? ?????????????? 
            </Btn>   
                    </Form> 


                 

<div style={{display:"none"}}>
<ComponentToPrint
              
              Table={ArmyTable}
              customers={values}
              // SetCustomers = {SetCustomers}
              title={' ????????????  ??????????'}
              ref={componentRef} 
              code={match.params.id}
              />

    </div>
          

<PrintButton
  onClick={handlePrint}
/>
 
      </>
    )
}

export default Army
