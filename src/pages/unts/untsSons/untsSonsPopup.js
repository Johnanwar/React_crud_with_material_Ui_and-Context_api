import React, { useState } from "react"
import { Container,Grid,makeStyles,Modal,Backdrop,Fade} from '@material-ui/core';
 import Form from "../../../shared/Form";
 import { Input, Btn ,Spinner} from "../../../controls";
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



function UntsSonsPopup( { open , handleClose ,loading, editobj , handleInputChange , handleSubmit }) {
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
              تعديل بيانات اولاد العمات 

              </Header>
              {/* name */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Input
                   name="Name26"
                   label="  الاسم بالكامل  "
                   value={editobj.Name26}
                   onChange={handleInputChange}
                   type= "text"
                />
              </Grid>
        
              {/* date of birth */}
              <Grid item xs={12} sm={6} md={4} lg={4}>  
               <Input
                     name="BDay26"
                     label="تاريخ الميلاد"
                    //  value={editobj.BDay26}
                     value={editobj.BDay26!=null ?
                       ((editobj.BDay26).slice(0,10)):('')}
                     type= "date"
                   onChange={handleInputChange}
                />       
              </Grid>

             {/* age   */}
             <Grid item xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="Age26"
                    label="السن "
                    value={editobj.Age26}
                    type= "number"
                    onChange={handleInputChange}
            />
        
             </Grid>  
            
              {/* national ID */}
             <Grid item xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Nationality26"
                     label="الجنسيه"
                     value={editobj.Nationality26}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Job"
                     label=" الوظيفه"
                     value={editobj.Job}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
            {/* محل الاقامه */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Address"
                     label=" محل الاقامه"
                     value={editobj.Address}
                     onChange={handleInputChange}
                     type= "text"
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

export default UntsSonsPopup
