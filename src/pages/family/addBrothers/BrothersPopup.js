import React, { useState } from "react"
import { Container,Grid,makeStyles,Modal,Backdrop,Fade} from '@material-ui/core';
 import Form from "../../../shared/Form";
 import { Input, Spinner, Btn } from "../../../controls";
 import 'react-toastify/dist/ReactToastify.css';
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



function BrothersPopup( { open , loading ,handleClose , editobj , handleInputChange , handleSubmit }) {
const [errors, setErrors] = useState({});
    //  .................modal...............
    const classes = useStyles();
    return (

        <Container>
    

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
              تعديل بيانات  الاخوه 

              </Header>
              {/* name */}
              <Grid item item  xs={12} sm={6} md={4} lg={4} >
                <Input
                   name="BrotherName"
                   label="  الاسم بالكامل  "
                   value={editobj.BrotherName}
                  //  error={errors.wName}
                   onChange={handleInputChange}
                   type= "text"
                />
  
              </Grid>
           

              <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="BrotherType"
                     label=" شقيق او غير شقيق"
                     value={editobj.BrotherType}
                    //  error={errors.BrotherNationality}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
        
        
              {/* date of birth */}
              <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input className="dateInput"
                     name="BrotherBDay"
                     label="تاريخ الميلاد"
                    //  value={editobj.BrotherBDay}
                     value={editobj.BrotherBDay!=null ?
                       ((editobj.BrotherBDay).slice(0,10)):('')}
                    //  error={errors.BrotherBDay}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>
      

             {/* age   */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="BrotherAge"
                    label="السن"
                    value={editobj.BrotherAge}
                    // error={errors.wAge}
                    type= "number"

                    onChange={handleInputChange}
            />
        
             </Grid> 
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="BrotherNationality"
                     label=" الجنسيه"
                     value={editobj.BrotherNationality}
                    //  error={errors.wNationalID}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="BrotherJob"
                     label=" الوظيفه"
                     value={editobj.BrotherJob}
                    //  error={errors.BrotherJob}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>

            <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input 
                     name="BrotherAddress"
                     label=" محل الاقامه"
                     value={editobj.BrotherAddress}
                    //  error={errors.BrotherBDay}
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

export default BrothersPopup
