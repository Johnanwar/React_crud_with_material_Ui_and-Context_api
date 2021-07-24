import React, { useState ,useEffect, useContext ,useRef} from "react"
import UploadImg from "../../controls/uploadImg";
 import Header from "../../components/header/header"
 import { createAPIEndpoint, ENDPIONTS } from "../../api";
import { Grid} from '@material-ui/core';
import Form from "../../shared/Form";
import {Btn,Spinner } from "../../controls";
import {Alert,notify,notifyErr} from "../../components/alerts/alert"
import {  useHistory } from "react-router-dom"
import {HistoryContext} from '../../contexts/historyContext'

import DocumentImages from './documentImages'
import PrintButton  from '../../shared/printButton'
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../print/react-to-print'

function Document({match}) {
  const { handlehistory ,action ,UserID} = useContext(HistoryContext)

    ////printing 
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });

    const getFreshModelObject ={
      personal:null,
      personal2:null, 
      listData:[],   
      }
    const [values, setValues] = useState(getFreshModelObject);
    const [loading, setLoading] = useState(false);

    const [DocType, setDocType] = useState(2); 
    const [DocImage, setDocImage] = useState(null); 
    const [url, setUrl] = useState(null); 
    const history = useHistory()


    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.EMPLOYEES9).fetchByIdAndYear(match.params.id,match.params.type)
            .then(res => {
                if(res.data.data != null){
                  console.log(res.data.data)
                  setValues(res.data.data)
                  const imgUrl =  res.data.data.listData.find(x => x.DocType == DocType).ImageName
                  setUrl(imgUrl)
                }
            })
            .catch(err => console.log(err));
      
      }, [])

 function handleSubmit(e) {
        e.preventDefault()
        console.log(DocType);
        console.log(DocImage);
          var bodyFormData = new FormData();
          bodyFormData.append('DocImage', DocImage);
          bodyFormData.append('DocType', DocType);
          bodyFormData.append('EmployeeFormID', values.EmployeeFormID);
          bodyFormData.append('UserID', UserID); 
  
          setLoading(true)
          // createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES9).create(bodyFormData)
          createAPIEndpoint(ENDPIONTS.POSTEMPLOYEES9).createPrison( values.EmployeeFormID, "0" ,bodyFormData)

          .then(res => {
              console.log(res)
              setLoading(false)
              setValues(res.data.data)
              const imgUrl =  res.data.data.listData.find(x => x.DocType == DocType).ImageName
              setUrl(imgUrl)
              // history.push(`/CarLicence/${match.params.id}/${match.params.type}`)
              // notify()
  
          })
          .then(res => {
            handlehistory( action.ADD , 'تحميل صورة    رخصة قيادة السيارة     ' ,  "  تحميل صورة    رخصة قيادة السيارة         ")
            history.push(`/CarLicence/${match.params.id}/${match.params.type}`)
            notify()
          })
            .catch(function (response) {
              //handle error
              notifyErr()
             setLoading(false)
  
              console.log(response);
            });

       }


    return (
        <>
 
        <Alert/>
  
  
              <Form onSubmit={handleSubmit}>
               <Grid container spacing={1}>          
               <Header>
                 تحميل صورة الرقم القومي    
                </Header>
                <Grid item xs={12} sm={4} md={12} lg={12}>    

                   {    url ? (
                  <img
                  style={{width:"60%" , margin:"auto" , maxHeight:"200px"}}
                   className='img-fluid mb-3 login-logo' src={url}/>
                ) : ("")}


                <UploadImg
                  label='صورة الرقم القومي'
                  setDocImage={setDocImage}
                />

 
      
      

               </Grid> 

     



              </Grid>

              <Btn
            size="large"
            disabled={loading}

            >
               إضافه 
               {loading ? (
                <Spinner/>
           ): ('')}
         </Btn>
            </Form>

            {/* <DocumentImages
                customers={values}
            /> */}

<div style={{display:"none"}}>
    <ComponentToPrint
              
              Table={DocumentImages}
              customers={url}
              // SetCustomers = {SetCustomers}
              title={'   صورة الرقم القومي'}
              ref={componentRef} 
              // remove={remove}
              code={match.params.id}
              />
    </div>

    <PrintButton
  onClick={handlePrint}
/>

  
      </>
    )
}

export default Document
