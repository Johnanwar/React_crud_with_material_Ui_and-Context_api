import React , {useContext} from 'react'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import ContactPhoneOutlinedIcon from '@material-ui/icons/ContactPhoneOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Link  from "../../controls/Link";
import { useParams } from "react-router-dom"
import {ParameterContext} from '../../contexts/parameterContext'

import { makeStyles , Container} from "@material-ui/core";
const useStyles = makeStyles(theme => ({
   root: {
      boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
      minHeight:'88vh',
      backgroundColor:"#fff",
      height: '100%',
      marginTop: '-39px',
      paddingTop: '5px',
      position: 'fixed',
      width: '24%',
      top: '144px',
      overflowY: 'auto',
      paddingBottom:"99px",
      "& svg":{
          margin:'0 10px',
      }
   }
}))

function RightNav({match ,num, type}) {
   const classes = useStyles();
   const params = useParams();
   const { paramId ,paramType  } = useContext(ParameterContext)
  console.log(paramId)
     return (
       
        <Container className={classes.root}>
        {/* <ScrollableFeed> */}
            {/* <a href={ `#/JobData?projId=${project.id}` }>{project.name}</a> */}
            <Link to={`/PersonalData/${paramId}/${paramType}`}>
            <PersonOutlineOutlinedIcon />  البيانات الشخصيه
         </Link>
         <Link to={`/JobData/${paramId}/${paramType}`}>
            <ContactPhoneOutlinedIcon /> بيانات الوظيفه
         </Link>       
         <Link to={`/SecondJobData/${paramId}/${paramType}`}>
           <AssignmentIndOutlinedIcon /> بيانات الترشيح
         </Link>
         <Link to={`/Army/${paramId}/${paramType}`}>
            <AccountBoxOutlinedIcon />  بيانات المجندين
         </Link>
         
          <Link to={`/GetPrison/${paramId}/${paramType}`}>
           <AccountBoxOutlinedIcon /> بيانات النشاط السياسي
         </Link>
         <Link to={`/SocialActivity/${paramId}/${paramType}`}>
           <AccountBoxOutlinedIcon /> بيانات النشاط الاجتماعي
         </Link>
         <Link to={`/Socialissue/${paramId}/${paramType}`}>
           <AccountBoxOutlinedIcon />   القضايا
         </Link>
         <Link to={`/Nationality/${paramId}/${paramType}`}>
           <PublicOutlinedIcon />   الجنسيه
         </Link>
         <Link to={`/religion/${paramId}/${paramType}`}>
           <PersonAddOutlinedIcon />  الديانه 
         </Link>
   

         <Link to={`/AddWife/${paramId}/${paramType}`}>
           <PeopleAltOutlinedIcon /> بيانات الزوج /  الزوجه
         </Link>
         <Link to={`/addSons/${paramId}/${paramType}`}>
           <PeopleAltOutlinedIcon /> بيانات    الابناء
         </Link>
         <Link to={`/Parents/${paramId}/${paramType}`}>
           <PersonAddOutlinedIcon />  بيانات الأب
         </Link>
         <Link to={`/Mother/${paramId}/${paramType}`}>
           <PersonAddOutlinedIcon />  بيانات الام
         </Link>
        
         <Link to={`/AddBrothers/${paramId}/${paramType}`}>
           <PeopleAltOutlinedIcon /> بيانات   الاخوه
         </Link>
         <Link to={`/AddSister/${paramId}/${paramType}`}>
           <PeopleAltOutlinedIcon /> بيانات  الاخوات
         </Link>
         {/* // lesss */}
         <Link to={`/SisterHusb/${paramId}/${paramType}`}>
           <PeopleAltOutlinedIcon /> بيانات   ازواج الاخوات
         </Link>
         
         <Link to={`/AddBrothersWifes/${paramId}/${paramType}`}>
           <PeopleAltOutlinedIcon /> بيانات    اشقاء وشقيقات الزوجه
         </Link>


         <Link to={`/AddWifeSisterHusband/${paramId}/${paramType}`}>
           <PeopleAltOutlinedIcon /> أزواج شقيقات الزوجه او الخطيبه بالكامل
         </Link>
         
         <Link to={`/AddUncle/${paramId}/${paramType}`}>
           <PeopleAltOutlinedIcon />    الاعمام  
         </Link>
         <Link to={`/UncleWife/${paramId}/${paramType}`}>
           <PeopleAltOutlinedIcon />    زوجات الاعمام  
         </Link>
         <Link to={`/UncleSons/${paramId}/${paramType}`}>
           <PeopleAltOutlinedIcon />   أولاد الاعمام  
         </Link>
         <Link to={`/AddKhUncle/${paramId}/${paramType}`}>
           <PeopleAltOutlinedIcon />    الاخوال  
         </Link>
         <Link to={`/UncleKhWife/${paramId}/${paramType}`}>
           <PeopleAltOutlinedIcon />    زوجات الاخوال  
         </Link>
         <Link to={`/UncleKhSons/${paramId}/${paramType}`}>
           <PeopleAltOutlinedIcon />   أولاد الاخوال  
         </Link>
         <Link to={`/AddUnts/${paramId}/${paramType}`}>
           <PeopleAltOutlinedIcon />    العمات  
         </Link>
         <Link to={`/UntsHusband/${paramId}/${paramType}`}>
           <PeopleAltOutlinedIcon />    ازواج العمات
         </Link>
         <Link to={`/UntsSons/${paramId}/${paramType}`}>
           <PeopleAltOutlinedIcon />   أولاد العمات
         </Link>
         <Link to={`/KhaddUnts/${paramId}/${paramType}`}>
           <PeopleAltOutlinedIcon />    الخالات  
         </Link>
         <Link to={`/KhUntsHusband/${paramId}/${paramType}`}>
           <PeopleAltOutlinedIcon />    ازواج الخالات
         </Link>
         <Link to={`/KhUntsSons/${paramId}/${paramType}`}>
           <PeopleAltOutlinedIcon />   أولاد الخالات
         </Link>
         <Link to={`/President/${paramId}/${paramType}`}>
           <PeopleAltOutlinedIcon />    اقارب يعملون برئاسه الجمهوريه
         </Link>
         <Link to={`/global/${paramId}/${paramType}`}>
           <PeopleAltOutlinedIcon />   اقارب يعملون  بمؤسسات عالميه او اجنبيه
         </Link>
         <Link to={`/Document/${paramId}/${paramType}`}>
           <PersonAddOutlinedIcon />       صورة الرقم القومي    
         </Link>
         <Link to={`/CarLicence/${paramId}/${paramType}`}>
           <PersonAddOutlinedIcon />   صورة  رخصة قيادة السيارة    
         </Link>
         <Link to={`/Passport/${paramId}/${paramType}`}>
           <PersonAddOutlinedIcon />    صورة  جواز السفر  
         </Link>
         <Link to={`/WeaponLicence/${paramId}/${paramType}`}>
           <PersonAddOutlinedIcon />    صورة  رخصة السلاح    
         </Link>
         <Link to={`/EtntryReport/${paramId}/${paramType}`}>
           <PersonAddOutlinedIcon />         تقرير بيانات الموظفين خلال فتره     
         </Link>

   

         </Container>
  
    )
}

export default RightNav
