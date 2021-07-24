import React, { useState } from "react"
import { Container,Grid,makeStyles,Modal,Backdrop,Fade} from '@material-ui/core';
 import Form from "../../../shared/Form";
 import { Input, Btn ,Spinner } from "../../../controls";
 import Header from "../../../components/header/header"


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
    maxWidth:"80%",
  },
}));



function SonsPopup( { open , handleClose , loading , editobj , handleInputChange , handleSubmit }) {
const [errors, setErrors] = useState({});
    //  .................modal...............
    const classes = useStyles();
    return (

        <Container>
            {/* <Alert/> */}
    

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
        <Fade in={open}>
          <div className={classes.paper}>
                          
             
          <Form onSubmit={handleSubmit} >
        <Grid container spacing={1}>
           <Header>
              تعديل بيانات  الابناء 

              </Header>
              {/* name */}
              <Grid item item  xs={12} sm={6} md={4} lg={4} >
                <Input
                   name="KidName"
                   label="  الاسم بالكامل  "
                   value={editobj.KidName}
                   onChange={handleInputChange}
                   type= "text"
                />
  
              </Grid>
        
              {/* date of birth */}
              <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input className="dateInput"
                     name="KidBDay"
                     label="تاريخ الميلاد"
                    //  value={editobj.KidBDay}
                     value={editobj.KidBDay!=null ?
                       ((editobj.KidBDay).slice(0,10)):('')}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>
   

             {/* age   */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="KidAge"
                    label="السن"
                    value={editobj.KidAge}
                 
                    type= "number"

                    onChange={handleInputChange}
            />
        
             </Grid> 
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="KidNationality"
                     label=" الجنسيه"
                     value={editobj.KidNationality}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="KidJob"
                     label=" الوظيفه"
                     value={editobj.KidJob}
                    //  error={errors.KidJob}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>

            <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input 
                     name="KidAddress"
                     label=" محل الاقامه"
                     value={editobj.KidAddress}
                    //  error={errors.KidBDay}
                     type= "text"
                   onChange={handleInputChange}
                />       
             </Grid>
    
      </Grid>  
      <Btn
                     color="primary"
              size="large"
              disabled={loading}
              >
                        {loading ? (
                <Spinner/>
           ): ('')}
           تعديل
            </Btn>
       
        </Form>

          </div>
        </Fade>
      </Modal>


          
        </Container>
    
      )
}

export default SonsPopup
