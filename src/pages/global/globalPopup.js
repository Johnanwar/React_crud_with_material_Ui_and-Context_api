import React, {useState } from "react"
import { Link } from "react-router-dom"
import { Container,Grid,makeStyles,Modal,Backdrop,Fade} from '@material-ui/core';
 import Form from "../../shared/Form";
 import { Input, Btn ,Spinner} from "../../controls";
 import AddIcon from '@material-ui/icons/Add';
 import 'react-toastify/dist/ReactToastify.css';
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
    // padding: theme.spacing(2, 4, 3),
    maxWidth:"80%",
  },
}));



function GlobalPopup( { open , handleClose , editobj , handleInputChange ,loading , handleSubmit }) {
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
              تعديل البيانات  

              </Header>

              {/*  الأسم بالكامل */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Input
                   name="Name31"
                   label="   الأسم بالكامل	 "
                   value={editobj.Name31}
                   onChange={handleInputChange}
                   type= "text"
                />
              </Grid>
        
              {/* الوظيفه*/}
              <Grid item xs={12} sm={6} md={4} lg={4}>  
               <Input
                     name="Type31"
                     label="درجه القرابه"
                     value={editobj.Type31}
                     type= "text"
                   onChange={handleInputChange}
                />       
              </Grid>

       {/*درجه القرابه */}
       <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Nationality31"
                     label=" الجنسيه"
                     value={editobj.Nationality31}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/*  الوظيفه */}
               <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Job31"
                     label="الوظيفه"
                     value={editobj.Job31}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
                  {/*  جهه العمل */}
                  <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Address31"
                     label="  محل الاقامه"
                     value={editobj.Address31}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
                  {/*  الجنسيه */}
                  {/* <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="Nat_Type"
                     label="  محل الاقامه"
                     value={editobj.Nat_Type}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             */}

    
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

export default GlobalPopup
