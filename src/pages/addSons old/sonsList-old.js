import React from "react"
import { Container,Grid,makeStyles,Modal,Backdrop,Fade,Button , Typography} from '@material-ui/core';
import { Input, Select, Btn } from "../../controls";
import Header from "../../components/header/header"


const SonsList = (props) => {
    // console.log(props)
    const genderValues = [
      {id:"male" , title:' ذكر'},
      {id:"female" , title:' إنثى'},
    ]
  
  return (
    <>
     
    { props.sonslist ?(
        props.sonslist.sonslist.map((val, idx) => {
            let sName = `sName-${idx}`, sGender = `sGender-${idx}`, sDateOfBirth = `sDateOfBirth-${idx}`,
            sAge = `sAge-${idx}`,  sNationality = `sNationality-${idx}` ,  sJob = `sJob-${idx}`
            return (
              <Grid container spacing={1}  key ={val.index}>
                <Header>
                إدخل بيانات الطفل 

                </Header>
    
          
                {/* naaaaaaame */}
              <Grid item xs={4}>
                       <Input
                        name= 'sName'
                        label=" الاسم "
                        id={idx}
                        type= "text"
                        // onChange={props.onChange}
                     />
               </Grid >
                {/* gender */}
                <Grid item xs={4}>
                            <Select
                            label="النوع"
                            name="sGender"
                            options={genderValues}
                            id={idx}

                            />
                    </Grid>
                {/* date of birth */}
               <Grid item xs={4} >
                       <Input
                        name= 'sDateOfBirth'
                        id={idx}
                        label=" تاريخ الميلاد "
                        type= "date"
                     />
               </Grid >
                {/* age*/}
              <Grid item xs={4}>
                       <Input
                        name= 'sAge'
                        id={idx}
                        label=" السن "
                        type= "number"
                     />
               </Grid >
                {/* sNationality */}
              <Grid item xs={4}>
                       <Input
                        name= 'sNationality'
                        id={idx}
                        label=" الجنسيه "              
                        type= "text"
                     />
               </Grid >
                {/* date of birth */}
              <Grid item xs={4}>
                       <Input
                        name= 'sJob'
                        label=" الوظيفه "
                        id={idx}
                        type= "text"
                     />
               </Grid >


           </Grid>        
            )
          })
     ) : <p>لا يوجد بيانات</p> }
</>
  )
}
export default SonsList