import React, {useState } from "react"
import { Container,Grid,makeStyles,Modal,Backdrop,Fade} from '@material-ui/core';
 import Form from "../../shared/Form";
 import { Input, Btn ,Spinner } from "../../controls";
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



function SocialissuePopup( { open , handleClose , editobj ,loading , handleInputChange , handleSubmit }) {
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
    
        
                   {/* الأسم بالكامل */}
                   <Grid item item  xs={12} sm={6} md={6} lg={6} >
                   <Input
                     name="Issue"
                     label="  رقم القضيه "
                     value={editobj.Issue}
                     error={errors.Issue}
                    onChange={handleInputChange}
                    type= "text"
                  />
                  </Grid>
                   {/* الماركه*/}                 
                  <Grid item item  xs={12} sm={6} md={6} lg={6} >
                   <Input className="dateInput"
                     name="IssueDate"
                     label=" التاريخ "
                    //  value={(editobj.IssueDate).slice(0, 10)}
                     value={editobj.IssueDate!=null ?
                       ((editobj.IssueDate).slice(0,10)):('')}
                    //  error={errors.wName}
                    onChange={handleInputChange}
                    type= "date"
                  />
                  </Grid>
                   {/*  وصف القضيه */}
                <Grid item item  xs={12} sm={12} md={12} lg={12} >
                   <Input
                     name="Notes"
                     label=" وصف القضيه "
                     value={editobj.Notes}
                    //  error={errors.wName}
                    onChange={handleInputChange}
                    type= "text"
                    multiline
                    rows={2}
                  />
                   {/* محلات الاقامة السابفة */}
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

export default SocialissuePopup
