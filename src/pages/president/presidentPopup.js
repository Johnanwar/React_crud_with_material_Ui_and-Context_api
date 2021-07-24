import React, {useState ,useContext} from "react"
import { Link } from "react-router-dom"
import { Container,Grid,makeStyles,Modal,Backdrop,Fade} from '@material-ui/core';
 import Form from "../../shared/Form";
 import { Input, Btn ,Select ,Spinner} from "../../controls";
 import AddIcon from '@material-ui/icons/Add';
 import 'react-toastify/dist/ReactToastify.css';
 import Header from "../../components/header/header"
 import {DepartmentContext} from '../../contexts/departmentContext'


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



function PresidentPopup( { open , handleClose ,loading, editobj , handleInputChange , handleSubmit }) {
const [errors, setErrors] = useState({});
const { managementValues } = useContext(DepartmentContext)

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
    
        
                   {/* الأسم بالكامل */}
                   <Grid item  xs={12} sm={6} md={6} lg={6}>  
              <Input className="Name30"
                     name="Name30"
                     label="الأسم بالكامل"
                     value={editobj.Name30}
                    //  error={errors.Nat_Name}
                     type= "text"
                   onChange={handleInputChange}
                />       
             </Grid>
        {/*  الاداره التابع لها */}
        <Grid item xs={12} sm={6} md={6} lg={6}>
                  <Select
                  label=" الإداره  التابع لها"
                  name="DepID"
               
                      value={
                        editobj.DepID != null && editobj.DepID != '0'  && managementValues.length > 0  ?
                      (managementValues.find(x => x.DepartmentID == editobj.DepID).DepartmentID)
                      :("")
                    }
                  onChange={handleInputChange}
                  options={managementValues}
                  // error={errors.management}

                  />
                </Grid>
    
             {/*درجه القرابه */}
             <Grid item  xs={12} sm={6} md={6} lg={6}>
                <Input
                     name="RelativeDegree"
                     label="درجه القرابه"
                     value={editobj.RelativeDegree}
                    //  error={errors.Type30}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
     
                  {/*  جهه العمل */}
                  <Grid item  xs={12} sm={6} md={6} lg={6}>
                <Input
                     name="Notes"
                     label=" ملاحظات"
                     value={editobj.Notes}
                    //  error={errors.Job30}
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

export default PresidentPopup
