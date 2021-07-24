import React, { useState } from "react"
import { Container,Grid,makeStyles,Modal,Backdrop,Fade} from '@material-ui/core';
 import Form from "../../../shared/Form";
 import { Input, Spinner, Btn } from "../../../controls";
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



function BrothersWifesPopup( { open , handleClose , loading , editobj , handleInputChange , handleSubmit }) {
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
              تعديل بيانات    ازواج الاخوات 


              </Header>
              {/* name */}
              <Grid item item  xs={12} sm={6} md={4} lg={4} >
                <Input
                   name="Part_BroName"
                   label="  الاسم بالكامل  "
                   value={editobj.Part_BroName}
                  //  error={errors.wName}
                   onChange={handleInputChange}
                   type= "text"
                />
  
              </Grid>
        
              {/* date of birth */}
              <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input className="dateInput"
                     name="Part_BroBDay"
                     label="تاريخ الميلاد"
                    //  value={editobj.Part_BroBDay}
                     value={editobj.Part_BroBDay!=null ?
                       ((editobj.Part_BroBDay).slice(0,10)):('')}
                    //  error={errors.Part_BroBDay}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>
    

             {/* age   */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="Part_BroAge"
                    label="السن"
                    value={editobj.Part_BroAge}
                    // error={errors.Part_BroAge}
                    type= "number"

                    onChange={handleInputChange}
            />
        
             </Grid> 
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Part_BroNationality"
                     label=" الجنسيه"
                     value={editobj.Part_BroNationality}
                    //  error={errors.wNationalID}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Part_BroJob"
                     label=" الوظيفه"
                     value={editobj.Part_BroJob}
                    //  error={errors.Part_BroJob}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>

            <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input 
                     name="Part_BroAddress"
                     label=" محل الاقامه"
                     value={editobj.Part_BroAddress}
                    //  error={errors.Part_BroBDay}
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

export default BrothersWifesPopup
