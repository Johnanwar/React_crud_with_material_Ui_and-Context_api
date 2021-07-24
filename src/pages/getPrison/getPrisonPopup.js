import React, {useState } from "react"
import { Container,Grid,makeStyles,Modal,Backdrop,Fade,Button} from '@material-ui/core';
 import Form from "../../shared/Form";
 import { Input, Spinner, Btn } from "../../controls";
 import Header from "../../components/header/header"


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
    maxWidth:"80%",
  },
}));



function GetPrisonPopup( { open , handleClose , loading , editobj , handleInputChange , handleSubmit }) {
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
              تعديل البيانات  

              </Header>
              {/*  الأسم بالكامل */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Input
                   name="Rel_Name"
                   label=" الأسم بالكامل	 "
                   value={editobj.Rel_Name}
                   onChange={handleInputChange}
                   type= "text"
                />
              </Grid>
        
              {/* الوظيفه*/}
              <Grid item xs={12} sm={6} md={4} lg={4}>  
               <Input
                     name="Rel_Job"
                     label="الوظيفه"
                     value={editobj.Rel_Job}
                     type= "text"
                   onChange={handleInputChange}
                />       
              </Grid>

             {/* درجه القرابه	   */}
             <Grid item xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="Rel_Degree"
                    label="درجه القرابه	"
                    value={editobj.Rel_Degree}
                    type= "text"
                    onChange={handleInputChange}
            />
        
             </Grid> 
            
             {/* محل الاقامه */}
             <Grid item xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Rel_Add"
                     label=" محل الاقامه	 "
                     value={editobj.Rel_Add}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/* سبب الاتهام */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Rel_Reason"
                     label=" سبب الاتهام   "
                     value={editobj.Rel_Reason}
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

export default GetPrisonPopup
