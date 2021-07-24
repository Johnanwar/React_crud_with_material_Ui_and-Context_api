import React, { useState } from "react"
import { Container,Grid,makeStyles,Modal,Backdrop,Fade} from '@material-ui/core';
 import Form from "../../../shared/Form";
 import { Input, Btn ,Spinner, Select } from "../../../controls";
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



function SisterPopup( { open , handleClose , loading ,editobj , handleInputChange , handleSubmit }) {
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
                   name="SisterName"
                   label="  الاسم بالكامل  "
                   value={editobj.SisterName}
                  //  error={errors.wName}
                   onChange={handleInputChange}
                   type= "text"
                />
  
              </Grid>

              <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="SisterType"
                     label=" شقيقه او غير شقيقه"
                     value={editobj.SisterType}
                    //  error={errors.BrotherNationality}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
        
              {/* date of birth */}
              <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input className="dateInput"
                     name="SisterBDay"
                     label="تاريخ الميلاد"
                    //  value={editobj.SisterBDay}
                     value={editobj.SisterBDay!=null ?
                       ((editobj.SisterBDay).slice(0,10)):('')}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>

        

             {/* age   */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="SisterAge"
                    label="السن"
                    value={editobj.SisterAge}
                    // error={errors.wAge}
                    type= "number"

                    onChange={handleInputChange}
            />
        
             </Grid> 
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="SisterNationality"
                     label=" الجنسيه"
                     value={editobj.SisterNationality}
                    //  error={errors.wNationalID}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="SisterJob"
                     label=" الوظيفه"
                     value={editobj.SisterJob}
                    //  error={errors.SisterJob}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
            <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input 
                     name="SisterAddress"
                     label=" محل الاقامه"
                     value={editobj.SisterAddress}
                    //  error={errors.SisterBDay}
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

export default SisterPopup
