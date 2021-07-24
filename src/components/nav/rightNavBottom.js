import React from 'react'
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import ContactPhoneOutlinedIcon from '@material-ui/icons/ContactPhoneOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PublicOutlinedIcon from '@material-ui/icons/PublicOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import ScrollableFeed from 'react-scrollable-feed'


import Link  from "../../controls/Link";
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

function RightNavBottom({match ,num, type}) {
   const classes = useStyles();
// export const code = num
// console.log(num)
    return (
       
        <Container className={classes.root}>
        <ScrollableFeed>
            {/* <a href={ `#/JobData?projId=${project.id}` }>{project.name}</a> */}
            <Link to={`/PersonalData/${num}/${type}`}>
            <PersonOutlineOutlinedIcon />  البيانات الشخصيه
         </Link>
         <Link to={`/JobData/${num}/${type}`}>
            <ContactPhoneOutlinedIcon /> بيانات الوظيفه
         </Link>
    
        
       
         <Link to={`/SecondJobData/${num}/${type}`}>
           <AssignmentIndOutlinedIcon /> بيانات الترشيح
         </Link>
         <Link to={`/Army/${num}/${type}`}>
            <AccountBoxOutlinedIcon />  بيانات المجندين
         </Link>
         
          <Link to={`/GetPrison/${num}/${type}`}>
           <AccountBoxOutlinedIcon /> بيانات النشاط السياسي
         </Link>
         <Link to={`/SocialActivity/${num}/${type}`}>
           <AccountBoxOutlinedIcon /> بيانات النشاط الاجتماعي
         </Link>
         <Link to={`/Socialissue/${num}/${type}`}>
           <AccountBoxOutlinedIcon />   القضايا
         </Link>
         <Link to={`/Nationality/${num}/${type}`}>
           <PublicOutlinedIcon />   الجنسيه
         </Link>
         <Link to={`/religion/${num}/${type}`}>
           <PersonAddOutlinedIcon />  الديانه 
         </Link>
    

    
      
      
         {/* <Link to={`/AddWifeParent/${num}/${type}`}>
           <PeopleAltOutlinedIcon /> بيانات والد  الزوجه
         </Link>
         <Link to={`/AddWifeMother/${num}/${type}`}>
           <PeopleAltOutlinedIcon /> بيانات والده الزوجه
         </Link> */}

         <Link to={`/AddWife/${num}/${type}`}>
           <PeopleAltOutlinedIcon /> بيانات الزوج /  الزوجه
         </Link>
         <Link to={`/addSons/${num}/${type}`}>
           <PeopleAltOutlinedIcon /> بيانات    الابناء
         </Link>
         <Link to={`/Parents/${num}/${type}`}>
           <PersonAddOutlinedIcon />  بيانات الأب
         </Link>
         <Link to={`/Mother/${num}/${type}`}>
           <PersonAddOutlinedIcon />  بيانات الام
         </Link>
        
         <Link to={`/AddBrothers/${num}/${type}`}>
           <PeopleAltOutlinedIcon /> بيانات   الاخوه
         </Link>
         <Link to={`/AddSister/${num}/${type}`}>
           <PeopleAltOutlinedIcon /> بيانات  الاخوات
         </Link>
         {/* // lesss */}
         <Link to={`/SisterHusb/${num}/${type}`}>
           <PeopleAltOutlinedIcon /> بيانات   ازواج الاخوات
         </Link>
         
         <Link to={`/AddBrothersWifes/${num}/${type}`}>
           <PeopleAltOutlinedIcon /> بيانات    اشقاء وشقيقات الزوجه
         </Link>


         <Link to={`/AddWifeSisterHusband/${num}/${type}`}>
           <PeopleAltOutlinedIcon /> أزواج شقيقات الزوجه او الخطيبه بالكامل
         </Link>
         
         <Link to={`/AddUncle/${num}/${type}`}>
           <PeopleAltOutlinedIcon />    الاعمام  
         </Link>
         <Link to={`/UncleWife/${num}/${type}`}>
           <PeopleAltOutlinedIcon />    زوجات الاعمام  
         </Link>
         <Link to={`/UncleSons/${num}/${type}`}>
           <PeopleAltOutlinedIcon />   أولاد الاعمام  
         </Link>
         <Link to={`/AddKhUncle/${num}/${type}`}>
           <PeopleAltOutlinedIcon />    الاخوال  
         </Link>
         <Link to={`/UncleKhWife/${num}/${type}`}>
           <PeopleAltOutlinedIcon />    زوجات الاخوال  
         </Link>
         <Link to={`/UncleKhSons/${num}/${type}`}>
           <PeopleAltOutlinedIcon />   أولاد الاخوال  
         </Link>
         <Link to={`/AddUnts/${num}/${type}`}>
           <PeopleAltOutlinedIcon />    العمات  
         </Link>
         <Link to={`/UntsHusband/${num}/${type}`}>
           <PeopleAltOutlinedIcon />    ازواج العمات
         </Link>
         <Link to={`/UntsSons/${num}/${type}`}>
           <PeopleAltOutlinedIcon />   أولاد العمات
  
         </Link>
         <Link to={`/KhaddUnts/${num}/${type}`}>
           <PeopleAltOutlinedIcon />    الخالات  
         </Link>
         <Link to={`/KhUntsHusband/${num}/${type}`}>
           <PeopleAltOutlinedIcon />    ازواج الخالات
         </Link>
         <Link to={`/KhUntsSons/${num}/${type}`}>
           <PeopleAltOutlinedIcon />   أولاد الخالات
         </Link>
         <Link to={`/President/${num}/${type}`}>
           <PeopleAltOutlinedIcon />    اقارب يعملون برئاسه الجمهوريه
         </Link>
         <Link to={`/global/${num}/${type}`}>
           <PeopleAltOutlinedIcon />   اقارب يعملون  بمؤسسات عالميه او اجنبيه
         </Link>
         <Link to={`/Document/${num}/${type}`}>
           <PersonAddOutlinedIcon />       صورة الرقم القومي    
         </Link>
         <Link to={`/CarLicence/${num}/${type}`}>
           <PersonAddOutlinedIcon />   صورة  رخصة قيادة السيارة    
         </Link>
         <Link to={`/Passport/${num}/${type}`}>
           <PersonAddOutlinedIcon />    صورة  جواز السفر  
         </Link>
         <Link to={`/WeaponLicence/${num}/${type}`}>
           <PersonAddOutlinedIcon />    صورة  رخصة السلاح    
         </Link>
         <Link to={`/EtntryReport/${num}/${type}`}>
           <PersonAddOutlinedIcon />         تقرير بيانات الموظفين خلال فتره     
         </Link>
         </ScrollableFeed>
        </Container>
  
    )
}

export default RightNavBottom
