import React, { useState } from "react"
import {  useHistory } from "react-router-dom"
import logo from '../../assets/images/logo.jpg';
import {makeStyles} from '@material-ui/core';
import { Input,Btn,Spinner } from "../../controls";
import {Alert,notify} from "../../components/alerts/alert"
import { createAPIEndpoint, ENDPIONTS } from "../../api";
// import {Alert} from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '100px',
    maxWidth:'400px',
    margin:'auto',
    textAlign:'center',
   '& .Card-Body':{
    paddingTop: '100px',
    width:"100%",

   },
    '& .MuiFormControl-root': {
      display:'block',
    },
    '& .MuiInputBase-root':{
      margin:"14px 0"

    },
  },
}));

export default function Login() {
    
  const getFreshModelObject ={
    LoginID: "",
    Password: "",
    }

  const [values, setValues] = useState(getFreshModelObject);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false)
  const [errMessage, setErrmessage] = useState('')

  const history = useHistory()


  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
        ...values,
        [name]: value
    })
    }
    
    const validateForm = () => {
    let temp = {};
    temp.LoginID = values.LoginID != "" ? "" : "  من فضلك إدخل البيانات ";
    temp.Password = values.Password != "" ? "" : " من فضلك إدخل البيانات ";
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
      // createAPIEndpoint(ENDPIONTS.LOGIN).fetchByIdAndYear( values.code, values.password )
      createAPIEndpoint(ENDPIONTS.LOGIN).create(values)

      .then(res => {
          // console.log(res.data.success)
          console.log(res.data)
          // console.log(res.data.data.UserToken)
          if(res.data.success === true){
            // notify()
            console.log(res.data)
            localStorage.setItem('isLogin', true);
            localStorage.setItem('FirsName', res.data.data.UserName);
            localStorage.setItem('AccessToken', res.data.data.UserToken);
            localStorage.setItem('UserID', res.data.data.UserID);
            history.push(`/`)
            setErrmessage("")
  
            }else{
              setErrmessage("تحقق من الكود او  كلمه المرور")
            }
          setLoading(false)
          // notify()

      })
        .catch(function (response) {
          //handle error
          //  notifyErr()
          console.log(response)
         setLoading(false)
        //  history.push(`/GetPrison/${match.params.id}/${match.params.type}`)

          console.log(response);
        });
      console.log(values);
     
 
    }   
   }

  const classes = useStyles();


  return (

    <section  className="login-page">
      <div className={classes.root} >
        <div className= 'Card-Body'>
        <Alert/>
         <div>
         {/* <h2 className="text-center mb-4">Log In</h2> */}
          <img className='img-fluid login-logo' src={logo}/>
         </div>

          {/* {error && <Alert severity="error">T{error}</Alert>} */}
          <p
          style={{color:'red'}}> {errMessage}</p>
          <form   onSubmit={handleSubmit}>
 
          <Input
          style={{width:"100%"}}
                   name="LoginID"
                   label="   الكود  "
                   value={values.LoginID}
                   error={errors.LoginID}
                   onChange={handleInputChange}
                   type= "text"
                />


               <Input
               style={{width:"100%"}}
                   name="Password"
                   label="   كلمه المرور   "
                   value={values.Password}
                   error={errors.Password}
                   onChange={handleInputChange}
                   type= "password"
                />



<Btn
              size="large"
              color="primary"
              disabled={loading}
              >
                        {loading ? (
                <Spinner/>
           ): ('')}
              إضافه ومتابعه 
            </Btn> 
          </form>
       
     
        </div>
      </div>
    </section>

  )
}
    