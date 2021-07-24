import React, { useState } from "react"
import { Container,Grid,makeStyles,Modal,Backdrop,Fade} from '@material-ui/core';
// import {Multiselect} from "multiselect-react-dropdown"
 import Form from "../../../shared/Form";
 import { Input, Btn , Spinner} from "../../../controls";
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



function SisterHusbPopup( { open , handleClose ,loading, editobj , handleInputChange , handleSubmit }) {
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
              تعديل بيانات  الاخوات 

              </Header>
              {/* name */}
              <Grid item item  xs={12} sm={6} md={4} lg={4} >
                <Input
                   name="SisterHName"
                   label="  الاسم بالكامل  "
                   value={editobj.SisterHName}
                  //  error={errors.wName}
                   onChange={handleInputChange}
                   type= "text"
                />
  
              </Grid>
        
              {/* date of birth */}
              <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input className="dateInput"
                     name="SisterHBDay"
                     label="تاريخ الميلاد"
                    //  value={editobj.SisterHBDay}
                     value={editobj.SisterHBDay!=null ?
                       ((editobj.SisterHBDay).slice(0,10)):('')}
                    //  error={errors.SisterHBDay}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>
    

             {/* age   */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="SisterHAge"
                    label="السن"
                    value={editobj.SisterHAge}
                    // error={errors.wAge}
                    type= "number"

                    onChange={handleInputChange}
            />
        
             </Grid> 
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="SisterHNationality"
                     label=" الجنسيه"
                     value={editobj.SisterHNationality}
                    //  error={errors.wNationalID}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="SisterHJob"
                     label=" الوظيفه"
                     value={editobj.SisterHJob}
                    //  error={errors.SisterHJob}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
            <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input 
                     name="SisterHAddress"
                     label=" محل الاقامه"
                     value={editobj.SisterHAddress}
                    //  error={errors.SisterHBDay}
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

export default SisterHusbPopup
