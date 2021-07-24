import React ,{ useState , useEffect , useRef } from 'react'
import ArmyTable from "../army/armyTable"
import PersonalDataTable from "../personalData/PersonalDataTable"
import JobDataTable from "../jobData/jobDataTable"
import SecondJobDataTable from "../secondJobData/secondJobDataTable"
import GetPrisonTable from "../getPrison/getPrisonTable"
import SocialTable from "../socialActivity/socialTable"
import SocialissueTable from "../socialIssue/socialissueTable"
import ReligionTable from "../religion/religionTable"
import NationalityTable from "../nationality/nationalityTable"
import WifeTable from "../wife/addWife/wifeTable"
import SonsTable from "../family/addsons/SonsTable"
import ParentTable from '../parents/parentTable'
import BrothersTable from "../family/addBrothers/BrothersTable"
import SisterTable from "../family/addٍSister/SisterTable"
import SisterHusbTable from "../family/addٍsisterHusb/sisterHusbTable"
import BrothersWifesTable from "../family/addBrothersWifes/BrothersWifesTable"
import WifeSisterHusbandTable from "../wife/addWifeSisterHusband/wifeSisterHusbandTable"
import AddUncleTable from "../uncle/addUncle/addUncleTable"
import UncleWifeTable from "../uncle/uncleWife/uncleWifeTable"
import UncleSonsTable from "../uncle/uncleSons/uncleSonsTable"
import AddKhUncleTable from "../khuncle/khaddUncle/khaddUncleTable"
import UncleKhWifeTable from "../khuncle/khuncleWife/khuncleWifeTable"
import UncleKhSonsTable from "../khuncle/khuncleSons/khuncleSonsTable"
import AddUntsTable from "../unts/addUnts/addUntsTable"
import UntsHusbandTable from "../unts/untsHusband/untsHusbandTable"
import UntsSonsTable from "../unts/untsSons/untsSonsTable"
import AddKhUntsTable from "../khunts/khaddUnts/khaddUntsTable"
import UntsKhHusbandTable from "../khunts/khuntsHusband/khuntsHusbandTable"
import UntKhsonsTable from "../khunts/khuntsSons/khuntsSonsTable"
import PresidentTable from "../president/presidentTable"
import GlobalTable from "../global/globalTable"
// import { ComponentpageBreack } from '../../print/pageBreack' 

import { createAPIEndpoint, ENDPIONTS } from "../../api";
import { makeStyles , Container} from "@material-ui/core";
const useStyles = makeStyles(theme => ({
   root: {
    fontSize:"16Px",
    "& h4":{
    fontSize:"36Px",
    margin:'60px 20px 20px 20px'
    }
   }
}))


function GetAllDataTable({id , type}) {
    const classes = useStyles();
    const [remove, setRemove] = useState(true);
    const [form1, setForm1] = useState({});
    const [form2, setForm2] = useState({});
    const [form3, setForm3] = useState({});
    const [form4, setForm4] = useState({});
    const [form5, setForm5] = useState(null);
    const [form6, setForm6] = useState({});
    const [sociallIssue, setSociallIssue] = useState(null);
    const [form7, setForm7] = useState(null);
    const [form8, setForm8] = useState(null);
    const [form9, setForm9] = useState(null);
    const [form10, setForm10] = useState(null);
    const [form11, setForm11] = useState(null);
    const [form12, setForm12] = useState({});
    const [formm12, setFormm12] = useState({});
    const [form13, setForm13] = useState(null);
    const [form14, setForm14] = useState(null);
    const [form15, setForm15] = useState(null);
    const [form16, setForm16] = useState(null);
    const [form17, setForm17] = useState(null);
    const [form18, setForm18] = useState(null);
    const [form19, setForm19] = useState(null);
    const [form20, setForm20] = useState(null);
    const [form21, setForm21] = useState(null);
    const [form22, setForm22] = useState(null);
    const [form23, setForm23] = useState(null);
    const [form24, setForm24] = useState(null);
    const [form25, setForm25] = useState(null);
    const [form26, setForm26] = useState(null);
    const [form27, setForm27] = useState(null);
    const [form28, setForm28] = useState(null);
    const [form29, setForm29] = useState(null);
    const [form30, setForm30] = useState(null);
    const [form31, setForm31] = useState(null);


useEffect(() => {
            // get data from api form 1
    createAPIEndpoint(ENDPIONTS.EMPLOYEES).fetchByIdAndYear(id,type)
    .then(res => {
        console.log(res.data.data)
        if(res.data.data != null){
            setForm1(res.data.data)
        }
    })
    .catch(err => console.log(err));

    /// get data from api2
    createAPIEndpoint(ENDPIONTS.EMPLOYEES2).fetchByIdAndYear(id,type)
        .then(res => {
            if(res.data.data != null){
            setForm2(res.data.data)
            }
        })
        .catch(err => console.log(err))

            // get data from api form 3
    createAPIEndpoint(ENDPIONTS.EMPLOYEES3).fetchByIdAndYear(id,type)
        .then(res => {
            if(res.data.data != null){
            setForm3(res.data.data)
            }
      })
      .catch(err => console.log(err))

            // get data from api form 4
    createAPIEndpoint(ENDPIONTS.EMPLOYEES4).fetchByIdAndYear(id,type)
        .then(res => {
            if(res.data.data != null){
            setForm4(res.data.data)
            }
        })
        .catch(err => console.log(err));
        // form 5
        createAPIEndpoint(ENDPIONTS.EMPLOYEES6).fetchByIdAndYear(id,type)
          .then(res => {
            if(res.data.data != null){
            setForm5(res.data.data)
            }
          })
          .catch(err => console.log(err))
          //form 6
          createAPIEndpoint(ENDPIONTS.EMPLOYEES5).fetchByIdAndYear(id,type)
            .then(res => {
                setForm6(res.data.data)
         })
         .catch(err => console.log(err))
         // social issue 
         createAPIEndpoint(ENDPIONTS.EMPLOYEES5Issue).fetchByIdAndYear(id,type)
         .then(res => {
            setSociallIssue(res.data.data)
         })
         .catch(err => console.log(err))
         //form 7
         createAPIEndpoint(ENDPIONTS.EMPLOYEES7).fetchByIdAndYear(id,type)
         .then(res => {
            setForm7(res.data.data)
         })
         .catch(err => console.log(err))
         //form 8
         createAPIEndpoint(ENDPIONTS.EMPLOYEES8).fetchByIdAndYear(id,type)
         .then(res => {
            setForm8(res.data.data)
         })
         .catch(err => console.log(err))
        //form 9
        createAPIEndpoint(ENDPIONTS.EMPLOYEES9).fetchByIdAndYear(id,type)
        .then(res => {
            setForm9(res.data.data)
            console.log(res.data.data)
        })
        .catch(err => console.log(err))
         //form 10
         createAPIEndpoint(ENDPIONTS.EMPLOYEES10).fetchByIdAndYear(id,type)
         .then(res => {
           if(res.data.data!= null){
            setForm10(res.data.data)
           }
         })
         .catch(err => console.log(err))
         //form 11
         createAPIEndpoint(ENDPIONTS.EMPLOYEES11).fetchByIdAndYear(id,type)
         .then(res => {
            setForm11(res.data.data)
         })
         .catch(err => console.log(err))
         // form 12 father
          createAPIEndpoint(ENDPIONTS.EMPLOYEES12).fetchByIdAndYear(id,type)
          .then(res => {
          if(res.data.data!= null){
            const fatherobj =res.data.data.listData.find(x => x.ParentType == "الاب")
            const motherobj =res.data.data.listData.find(x => x.ParentType == "الام")
            setForm12(fatherobj)
            setFormm12(motherobj)
           }
          })
         .catch(err => console.log(err))
            //form 13
            createAPIEndpoint(ENDPIONTS.EMPLOYEES13).fetchByIdAndYear(id,type)
            .then(res => {
                setForm13(res.data.data)
            })
            .catch(err => console.log(err))
            ///////form 14
            createAPIEndpoint(ENDPIONTS.EMPLOYEES14).fetchByIdAndYear(id,type)
            .then(res => {
                setForm14(res.data.data)
            })
            .catch(err => console.log(err))
            //form 15
            createAPIEndpoint(ENDPIONTS.EMPLOYEES15).fetchByIdAndYear(id,type)
            .then(res => {
                setForm15(res.data.data)
            })
            .catch(err => console.log(err))
                    //form 16
            createAPIEndpoint(ENDPIONTS.EMPLOYEES16).fetchByIdAndYear(id,type)
            .then(res => {
                setForm16(res.data.data)
            })
            .catch(err => console.log(err))
            ////// form 17
            createAPIEndpoint(ENDPIONTS.EMPLOYEES17).fetchByIdAndYear(id,type)
            .then(res => {
                setForm17(res.data.data)
            })
            .catch(err => console.log(err))
            ////// form 18
            createAPIEndpoint(ENDPIONTS.EMPLOYEES18).fetchByIdAndYear(id,type)
            .then(res => {
               setForm18(res.data.data)
            })
            .catch(err => console.log(err))
               ////// form 19
            createAPIEndpoint(ENDPIONTS.EMPLOYEES19).fetchByIdAndYear(id,type)
            .then(res => {
                setForm19(res.data.data)
            })
           .catch(err => console.log(err))
            ////// form 20
            createAPIEndpoint(ENDPIONTS.EMPLOYEES20).fetchByIdAndYear(id,type)
            .then(res => {
               setForm20(res.data.data)
            })
            .catch(err => console.log(err))
            ////// form 21
            createAPIEndpoint(ENDPIONTS.EMPLOYEES21).fetchByIdAndYear(id,type)
            .then(res => {
                setForm21(res.data.data)
            })
            .catch(err => console.log(err))
                    ////// form 22
            createAPIEndpoint(ENDPIONTS.EMPLOYEES22).fetchByIdAndYear(id,type)
            .then(res => {
            setForm22(res.data.data)
            })
            .catch(err => console.log(err))
                    ////// form 23
            createAPIEndpoint(ENDPIONTS.EMPLOYEES23).fetchByIdAndYear(id,type)
            .then(res => {
            setForm23(res.data.data)
            })
            .catch(err => console.log(err))
            ////// form 24
            createAPIEndpoint(ENDPIONTS.EMPLOYEES24).fetchByIdAndYear(id,type)
            .then(res => {
            setForm24(res.data.data)
            })
            .catch(err => console.log(err))
            ////// form 25
            createAPIEndpoint(ENDPIONTS.EMPLOYEES25).fetchByIdAndYear(id,type)
            .then(res => {
            setForm25(res.data.data)
            })
            .catch(err => console.log(err))
            ////// form 26
            createAPIEndpoint(ENDPIONTS.EMPLOYEES26).fetchByIdAndYear(id,type)
            .then(res => {
                setForm26(res.data.data)
            })
            .catch(err => console.log(err))
                    ////// form 27
            createAPIEndpoint(ENDPIONTS.EMPLOYEES27).fetchByIdAndYear(id,type)
            .then(res => {
            setForm27(res.data.data)
            })
            .catch(err => console.log(err))
            ////// form 28
            createAPIEndpoint(ENDPIONTS.EMPLOYEES28).fetchByIdAndYear(id,type)
            .then(res => {
                setForm28(res.data.data)
            })
            .catch(err => console.log(err))
                    ////// form 29
            createAPIEndpoint(ENDPIONTS.EMPLOYEES29).fetchByIdAndYear(id,type)
            .then(res => {
            setForm29(res.data.data)
            })
            .catch(err => console.log(err))
            ////// form 30
            createAPIEndpoint(ENDPIONTS.EMPLOYEES30).fetchByIdAndYear(id,type)
            .then(res => {
                setForm30(res.data.data)
            })
            .catch(err => console.log(err))
            ////// form 31
            createAPIEndpoint(ENDPIONTS.EMPLOYEES31).fetchByIdAndYear(id,type)
            .then(res => {
                setForm31(res.data.data)
            })
            .catch(err => console.log(err))
  
    }, [])
 
    return (
     <div className={classes.root}>
        
          
                        <PersonalDataTable
                            customers={form1}
                        />


<div style = {{ pageBreakBefore: 'always',}}>  </div>

                        <h4> بيانات الوظيفه </h4>
                         <JobDataTable
                            customers={form2}
                        />


                         <h4> بيانات الترشيح </h4>
                          <SecondJobDataTable
                            customers={form3}
                        />
<div style = {{ pageBreakBefore: 'always',}}>  </div>


                        <h4> بيانات المجندين </h4>
                        <ArmyTable
                            customers={form4}
                        />

                        <h4> هل سبق إتهام او أعتقال احد أقاربك لنشاط سياسي او جنائي وهل تعرف لأي منهم نشاط سياسي ولو لم يكن سبق إتهامه ؟ </h4>
                        <GetPrisonTable
                            customers={form5}
                            remove={remove}
                        />
<div style = {{ pageBreakBefore: 'always',}}>  </div>
                      

                        <h4> بيانات  النشاط الاجتماعي </h4>
                         <SocialTable
                            customers={form6}
                        />


                        <h4>  هل تم إعتقالك او إتهامك في اي نوع من انواع القضايا ؟ </h4>
                        <SocialissueTable
                            customers={sociallIssue}
                            remove={remove}
                        />
  <div style = {{ pageBreakBefore: 'always',}}>  </div>

                        <h4> بالإضافه الى الجنسيه المصريه هل لك او لأحد اقاربك جنسيات اخرى؟ </h4>
                          <NationalityTable
                            customers={form7}
                            remove={remove}
                        />

                        <h4> هل لك احد الاقارب (ذكر او انثى) متزوجا من غير ديانته ؟</h4>
                         <ReligionTable
                            customers={form8}
                            remove={remove}
                        />
  <div style = {{ pageBreakBefore: 'always',}}>  </div>


                        <h4>  بيانات الزوج /  الزوجه </h4>
                        <WifeTable
                            customers={form10}
                            remove={remove}
                        />
  <div style = {{ pageBreakBefore: 'always',}}>  </div>


                         <h4> بيانات الابناء </h4>
                        <SonsTable
                             customers={form11}
                            remove={remove} 
                        />
  <div style = {{ pageBreakBefore: 'always',}}>  </div>

                         <h4> بيانات الأب </h4>
                        <ParentTable
                         customers={form12}
                        />

                         <h4> بيانات الام </h4>
                        <ParentTable
                         customers={formm12}
                        />
  <div style = {{ pageBreakBefore: 'always',}}>  </div>


                         <h4> بيانات الاخوه  </h4>
                        <BrothersTable
                        customers={form13}
                        remove={remove} 
                        />

                         <h4> بيانات الاخوات  </h4>
                        <SisterTable
                         customers={form14}
                         remove={remove} 
                        />
  <div style = {{ pageBreakBefore: 'always',}}>  </div>

                         <h4> بيانات  ازواج الاخوات </h4>
                         <SisterHusbTable
                         customers={form15}
                         remove={remove} 
                        />
  <div style = {{ pageBreakBefore: 'always',}}>  </div>

                         <h4> بيانات  اشقاء وشقيقات الزوجه </h4>
                         <BrothersWifesTable
                         customers={form16}
                         remove={remove} 
                        />
  <div style = {{ pageBreakBefore: 'always',}}>  </div>

                         <h4> بيانات  شقيقات الزوجه او الخطيبه بالكامل </h4>
                         <WifeSisterHusbandTable
                         customers={form17}
                         remove={remove} 
                        />
  <div style = {{ pageBreakBefore: 'always',}}>  </div>

                         <h4> بيانات الاعمام </h4>
                         <AddUncleTable
                         customers={form18}
                         remove={remove} 
                        />
  <div style = {{ pageBreakBefore: 'always',}}>  </div>
                                               
                        <h4> بيانات زوجات الاعمام </h4>
                         <UncleWifeTable
                         customers={form19}
                         remove={remove} 
                        />
  <div style = {{ pageBreakBefore: 'always',}}>  </div>

                         <h4> بيانات أولاد الاعمام </h4>
                         <UncleSonsTable
                         customers={form20}
                         remove={remove} 
                        />
  <div style = {{ pageBreakBefore: 'always',}}>  </div>
                        
                        <h4> بيانات الاخوال </h4>
                          <AddKhUncleTable
                         customers={form21}
                         remove={remove} 
                        />
  <div style = {{ pageBreakBefore: 'always',}}>  </div>

                        <h4> بيانات زوجات الاخوال </h4>
                        <UncleKhWifeTable
                        customers={form22}
                        remove={remove} 
                        />
  <div style = {{ pageBreakBefore: 'always',}}>  </div>

                         <h4> بيانات أولاد  الاخوال </h4>
                        <UncleKhSonsTable
                        customers={form23}
                        remove={remove} 
                        />
  <div style = {{ pageBreakBefore: 'always',}}>  </div>

                         <h4> بيانات العمات </h4>
                        <AddUntsTable
                        customers={form24}
                        remove={remove} 
                        />
  <div style = {{ pageBreakBefore: 'always',}}>  </div>

                         <h4> بيانات ازواج العمات </h4>
                        <UntsHusbandTable
                        customers={form25}
                        remove={remove} 
                        />
  <div style = {{ pageBreakBefore: 'always',}}>  </div>
                        
                         <h4> بيانات أولاد العمات </h4>
                        <UntsSonsTable
                        customers={form26}
                        remove={remove} 
                        />
  <div style = {{ pageBreakBefore: 'always',}}>  </div>

                         <h4> بيانات الخالات </h4>
                        <AddKhUntsTable
                        customers={form27}
                        remove={remove} 
                        />
  <div style = {{ pageBreakBefore: 'always',}}>  </div>

                         <h4> بيانات ازواج الخالات </h4>
                        <UntsKhHusbandTable
                        customers={form28}
                        remove={remove} 
                        />

                         <h4> بيانات أولاد الخالات </h4>
                        <UntKhsonsTable
                        customers={form29}
                        remove={remove} 
                        />  
  <div style = {{ pageBreakBefore: 'always',}}>  </div>

                         <h4> اقارب يعملون برئاسه الجمهوريه</h4>                   
                        <PresidentTable
                        customers={form30}
                        remove={remove} 
                        />

                        <h4> اقارب يعملون بمؤسسات عالميه او خارج البلاد</h4>
                        <GlobalTable
                        customers={form31}
                        remove={remove} 
                        />
                        {form9  ? (
                        <div> 
                        {form9.listData.map((cust) => ( 
                            <img 
                  style={{maxHeight:"500px" , margin:"20px  auto" , display:"block"}}
                  src={cust.ImageName}/>
                            ))}
                        </div>
                        ) :("")}
                       

  </div>   

    )
}

export default GetAllDataTable
