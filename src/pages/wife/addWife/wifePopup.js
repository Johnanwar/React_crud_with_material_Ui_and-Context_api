import React, { useState } from "react"
import { Container,Grid,makeStyles,Modal,Backdrop,Fade} from '@material-ui/core';
 import Form from "../../../shared/Form";
 import { Input, Btn ,Spinner } from "../../../controls";
 import Header from "../../../components/header/header"
 import {Alert} from "../../../components/alerts/alert";


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



function WifePopup( { open , handleClose , editobj , loading , handleInputChange , handleSubmit }) {
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
              تعديل بيانات  الزوج / الزوجه 

              </Header>
              {/* name */}
              <Grid item item  xs={12} sm={6} md={4} lg={4} >
                <Input
                   name="PartnerName"
                   label="  الاسم بالكامل  "
                   value={editobj.PartnerName}
                  //  error={errors.wName}
                   onChange={handleInputChange}
                   type= "text"
                />

              </Grid>
        
              {/* date of birth */}
              <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input className="dateInput"
                     name="PartnerBDay"
                     label="تاريخ الميلاد"
                    //  value={editobj.PartnerBDay}
                     value={editobj.PartnerBDay!=null ?
                       ((editobj.PartnerBDay).slice(0,10)):('')}

                    //  error={errors.wBirth}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>

             {/* age   */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="PartnerAge"
                    label="السن"
                    value={editobj.PartnerAge}
                    // error={errors.PartnerAge}
                    type= "text"
                    onChange={handleInputChange}
            />
        
             </Grid> 
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="PartnerNationality"
                     label=" الجنسيه"
                     value={editobj.PartnerNationality}
                    //  error={errors.PartnerNationality}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
                    {/* national ID */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="PartnerAddress"
                     label=" العنوان"
                     value={editobj.PartnerAddress}
                    //  error={errors.PartnerAddress}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="PartnerJob"
                     label=" الوظيفه"
                     value={editobj.PartnerJob}
                    //  error={errors.PartnerJob}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>

            {/* ********************paaremt8********************88 */}
            <Header>
              إدخل بيانات والد الزوج /  الزوجه 

              </Header>
              {/* name */}
              <Grid item item  xs={12} sm={6} md={4} lg={4} >
                <Input
                   name="FatherName"
                   label="  الاسم بالكامل  "
                   value={editobj.FatherName}
                  //  error={errors.wName}
                   onChange={handleInputChange}
                   type= "text"
                />
     
              </Grid>
        
              {/* date of birth */}
              <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input className="dateInput"
                     name="FatherBDay"
                     label="تاريخ الميلاد"
                    //  value={editobj.FatherBDay}
                     value={editobj.FatherBDay!=null ?
                       ((editobj.FatherBDay).slice(0,10)):('')}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>

             {/* age   */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="FatherAge"
                    label="السن"
                    value={editobj.FatherAge}
                    // error={errors.PartnerAge}
                    type= "text"
                    onChange={handleInputChange}
            />
        
             </Grid> 
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="FatherNationality"
                     label=" الجنسيه"
                     value={editobj.FatherNationality}
                    //  error={errors.FatherNationality}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
                    {/* national ID */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="FatherAddress"
                     label=" العنوان"
                     value={editobj.FatherAddress}
                    //  error={errors.FatherAddress}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="FatherJob"
                     label=" الوظيفه"
                     value={editobj.FatherJob}
                    //  error={errors.FatherJob}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
            {/* ***********************************mother******************* */}
            <Header>
              إدخل بيانات والده الزوج /  الزوجه 

              </Header>
              

  
              
              {/* name */}
              <Grid item item  xs={12} sm={6} md={4} lg={4} >
                <Input
                   name="MotherName"
                   label="  الاسم بالكامل  "
                   value={editobj.MotherName}
                  //  error={errors.wName}
                   onChange={handleInputChange}
                   type= "text"
                />

              </Grid>
        
              {/* date of birth */}
              <Grid item  xs={12} sm={6} md={4} lg={4}>  
              <Input className="dateInput"
                     name="MotherBDay"
                     label="تاريخ الميلاد"
                    //  value={editobj.MotherBDay}
                     value={editobj.MotherBDay!=null ?
                       ((editobj.MotherBDay).slice(0,10)):('')}
                     type= "date"
                   onChange={handleInputChange}
                />       
             </Grid>

             {/* age   */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
               <Input
                    name="MotherAge"
                    label="السن"
                    value={editobj.MotherAge}
                    // error={errors.MotherAge}
                    type= "text"
                    onChange={handleInputChange}
            />
        
             </Grid> 
            
             {/* national ID */}
             <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="MotherNationality"
                     label=" الجنسيه"
                     value={editobj.MotherNationality}
                    //  error={errors.MotherNationality}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
                    {/* national ID */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="MotherAddress"
                     label=" العنوان"
                     value={editobj.MotherAddress}
                    //  error={errors.MotherAddress}
                     onChange={handleInputChange}
                     type= "text"
                 />
            </Grid>
             
             {/* Job */}
            <Grid item  xs={12} sm={6} md={4} lg={4}>
                <Input
                     name="MotherJob"
                     label=" الوظيفه"
                     value={editobj.MotherJob}
                    //  error={errors.MotherJob}
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

export default WifePopup
