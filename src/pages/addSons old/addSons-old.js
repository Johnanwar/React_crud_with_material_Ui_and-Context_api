   import React , {useState} from 'react'
   import SonsList from "./sonsList"
   import { Container,Grid,makeStyles} from '@material-ui/core';
   import Nav from "../../components/nav/nav"
   import Form from "../../shared/Form";
   import { Btn } from "../../controls";
   import AddBoxIcon from '@material-ui/icons/AddBox';
   
   function AddSons() {
  ///////////    initial object 
    const sonObj =  {sonslist: [{ index: Math.random(), 
        index: Math.random(),
        sName: "",
        sGender: "",
        sDateOfBirth: "", 
        sAge: "" ,
        sNationality:"",
        sJob:""
    }]}
    ///////////    initial obstateject   
    const [initForm, setInitForm] = useState(sonObj)



 ///////////// add form 
   const addNewRow = () => {
    setInitForm(
        (prevState) => ({
            sonslist: [...prevState.sonslist, 
                { index: Math.random(), 
                    index: Math.random(),
                    sName: "",
                    sGender: "",
                    sDateOfBirth: "", 
                    sAge: "" ,
                    sNationality:"",
                    sJob:""
                }
            ],
        }))
    }
 /////////////// on change inputs
   const handleChange = (e) => {
        if (["sName", "sGender", "sDateOfBirth", "sAge" ,"sNationality" , "sJob"].includes(e.target.name)) {
            let sonslist = [...initForm.sonslist]
            sonslist[e.target.id][e.target.name] = e.target.value;
        } else { 
            setInitForm({ [e.target.name]: e.target.value })
        }
    }
     /////////////// submit form
     const handleSubmit = (e) => {
        e.preventDefault();
        console.log(initForm)
     }
    return (
    <>
     <Nav/>
      <Container  className="clienDetail">
            <Form onSubmit={handleSubmit}  onChange={handleChange} >
            <Grid container spacing={1}>
                  
          
            <SonsList add={addNewRow} sonslist={initForm} />

            <Btn onClick={addNewRow}>  
            <AddBoxIcon 
            style={{margin:"0 0 0 15px" , color:"#3a3a39"}}
           
             />
            إضافه ابن اخر
            </Btn>
 
             <Btn 
             style={{margin:'15px auto'}}
              onClick={handleSubmit}
              color ="primary"
              >
               إضافه
             </Btn>
    
         </Grid>
         </Form>
               
     
      </Container>
     </>
    )
   }
   
   export default AddSons
   