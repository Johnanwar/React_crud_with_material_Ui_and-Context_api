import React, { useState } from "react"
import { Container,Grid,makeStyles,Modal,Backdrop,Fade} from '@material-ui/core';
// import {Multiselect} from "multiselect-react-dropdown"
 import Form from "../../../shared/Form";
 import { Input, Select, Btn } from "../../../controls";
 import AddIcon from '@material-ui/icons/Add';
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



function WifeParentPopup( { open , handleClose , editobj , handleInputChange , handleSubmit }) {
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
              تعديل بيانات والده الزوجه 

              </Header>
              {/* name */}
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Input
                   name="wName"
                   label="  الاسم بالكامل  "
                   value={editobj.wName}
                   onChange={handleInputChange}
                   type= "text"
                />
              </Grid>
        
              {/* date of birth */}
              <Grid item xs={12} sm={6} md={4} lg={4}>  
               <Input
                     name="wBirth"
                     label="تاريخ الميلاد"
                    //  value={editobj.wBirth}
                     value={editobj.wBirth!=null ?
                       ((editobj.wBirth).slice(0,10)):('')}
                     type= "date"
                   onChange={handleInputChange}
                />       
              </Grid>

             {/* age   */}
             <Grid item xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="wAge"
                    label="السن"
                    value={editobj.wAge}
                    type= "number"
                    onChange={handleInputChange}
            />
        
             </Grid> 
            
             {/* national ID */}
             <Grid item xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="wNationalID"
                     label="الرقم القومي"
                     value={editobj.wNationalID}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="wJob"
                     label=" الوظيفه"
                     value={editobj.wJob}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
    
      </Grid>  
         <Btn
            size="large"
            color="primary"
            // onClick={handleSubmit}
            >
               تعديل
         </Btn>
       
        </Form>

          </div>
        </Fade>
      </Modal>


          
        </Container>
    
      )
}

export default WifeParentPopup
