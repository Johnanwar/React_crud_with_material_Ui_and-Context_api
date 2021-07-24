import React, {useState } from "react"
import { Container,Grid,makeStyles,Modal,Backdrop,Fade} from '@material-ui/core';
 import Form from "../../shared/Form";
 import { Input, Btn ,Spinner } from "../../controls";
 import Header from "../../components/header/header"
 import {Alert} from "../../components/alerts/alert";

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



function NationalityPopup( { open , handleClose ,loading, editobj , handleInputChange , handleSubmit }) {
const [errors, setErrors] = useState({});
    //  .................modal...............
    const classes = useStyles();
    return (

        <Container>
           <Alert/>
    

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
              تعديل البيانات  

              </Header>
              {/*  الأسم بالكامل */}
              {/* <Grid item xs={12} sm={6} md={6} lg={6}>
                <Input
                   name="Nat_Type"
                   label="  نوع الجنسيه	 "
                   value={editobj.Nat_Type}
                   onChange={handleInputChange}
                   type= "text"
                />
              </Grid> */}
        
              {/* الوظيفه*/}
              <Grid item  xs={12} sm={6} md={6} lg={6}>  
              <Input 
                  

                     label="الأسم بالكامل"

                     name="Nat_Name"
                     value={editobj.Nat_Name}
                    //  error={errors.Nat_Type}
                     type= "text"
                   onChange={handleInputChange}
                />       
             </Grid>

    
             {/*درجه القرابه */}
             <Grid item  xs={12} sm={6} md={6} lg={6}>
                <Input
                     name="Nat_Degree"
                     label="انت او احد اقاربك مع ذكر درجه القرابه "
                     value={editobj.Nat_Degree}
                    //  error={errors.Nat_Degree}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/*  الجنسيه */}
               <Grid item  xs={12} sm={6} md={6} lg={6}>
                <Input
                 
                     label="  الجنسيه"
                     name="Nat_Type"
                     value={editobj.Nat_Type}
                    //  error={errors.Nat_Name}
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

export default NationalityPopup
