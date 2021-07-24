// import './App.css';
import React from "react"
import { Grid} from '@material-ui/core';
import RightNav from "../../components/nav/rightNav"
import Nav from "../../components/nav/nav"

// import { BrowserRouter or MemoryRouter as Router,Switch, Route } from "react-router-dom"
import { HashRouter as Router ,Switch, Route } from "react-router-dom"

import StartPage from ".././startPage/startPage"
import PersonalData from ".././personalData/personalData"
// wifie
import AddWife from ".././wife/addWife/addWife"
// import AddWifeParent from ".././wife/addWifeParent/addWifeParent"
import AddWifeBrother from ".././wife/addWifeBrother/addWifeBrother"
import AddWifeSisterHusband from ".././wife/addWifeSisterHusband/addWifeSisterHusband"

import JobData from ".././jobData/jobData"
import Parents from ".././parents/parents"
import Mother from ".././parents/mother"

import AddUncle from ".././uncle/addUncle/addUncle"
import AddUnts from ".././unts/addUnts/addUnts"
import UntsHusband from ".././unts/untsHusband/untsHusband"
import UntsSons from ".././unts/untsSons/untsSons"
//  الخاله
import KhUntsHusband from ".././khunts/khuntsHusband/khuntsHusband"
import KhUntsSons from ".././khunts/khuntsSons/khuntsSons"
import KhaddUnts from ".././khunts/khaddUnts/khaddUnts"

//الخال
import AddKhUncle from ".././khuncle/khaddUncle/khaddUncle"
import UncleKhSons from ".././khuncle/khuncleSons/khuncleSons"
import UncleKhWife from ".././khuncle/khuncleWife/khuncleWife"

//family
import AddBrothers from ".././family/addBrothers/addBrothers"
import AddSister from ".././family/addٍSister/addSister"
import AddBrothersWifes from ".././family/addBrothersWifes/addBrothersWifes"
import AddSons from ".././family/addsons/addSons"
import SisterHusb from ".././family/addٍsisterHusb/sisterHusb"

import UncleSons from ".././uncle/uncleSons/uncleSons"
import UncleWife from ".././uncle/uncleWife/uncleWife"
import SecondJobData from ".././secondJobData/secondJobData"
import SocialActivity from ".././socialActivity/socialActivity"
import GetPrison from ".././getPrison/getPrison"
import Nationality from ".././nationality/nationality"
import Global from ".././global/global"
import President from ".././president/president"
import Socialissue from ".././socialIssue/socialissue"
import Religion from ".././religion/religion"

import Document from ".././document/document"
import CarLicence from ".././document/carLicence"
import Passport from ".././document/Passport"
import WeaponLicence from ".././document/WeaponLicence"

import Army from ".././army/army"
import GetAllData from ".././getAllData/GetAllData"

import Login from ".././Auth/login"
import {ThemeProvider , createMuiTheme} from '@material-ui/core';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import {DepartmentProvider} from '../../contexts/departmentContext'
import PrivateRoute from "../../PrivateRoute"


// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });


const theme = createMuiTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: "#115d8e",
      // light: '#3c44b126'
    },
    secondary: {
      main: "#dd1e1e",
    },
    
    background: {
      default: "#f4f5fd"
    },
  },
  typography: {
    fontFamily: 'Markazi',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
 })


function Home({match}) {

  console.log(match)

  return (
    <>
    <div
    style={{backgroundColor:"#fafafa",
    minHeight:'100vh'
    }} 
    className="App">
        <StylesProvider jss={jss}>
     <ThemeProvider theme={theme}>
     <DepartmentProvider>

       {/* */}
      <Router >

                 
<Grid container spacing={1}
            style={{overflowX:"hidden", margin:"0 -10px"}}
            >

            
            <Grid item xs={12} sm={3} md={3} lg={3}>
               <RightNav
                num={11}
                type={2021}
               />
              </Grid>
              <Grid item xs={12} sm={9} md={9} lg={9}>

              <Switch>              
                <PrivateRoute exact path="/JobData/:id/:type" component={JobData} />
                <PrivateRoute exact path="/SecondJobData/:id/:type" component={SecondJobData} />
                <PrivateRoute exact path="/SocialActivity/:id/:type" component={SocialActivity} />
                <PrivateRoute exact path="/GetPrison/:id/:type" component={GetPrison} />Nationality
                <PrivateRoute exact path="/Nationality/:id/:type" component={Nationality} />
                <PrivateRoute exact path="/Global/:id/:type" component={Global} />
                 {/* depatmrnt contect for fetching combobox */}
           

                <PrivateRoute exact path="/religion/:id/:type" component={Religion} />
                <PrivateRoute exact path="/AddWifeBrother/:id/:type" component={AddWifeBrother} />

                <PrivateRoute exact path="/AddWifeSisterHusband/:id/:type" component={AddWifeSisterHusband} />
                <PrivateRoute exact path="/army/:id/:type" component={Army} />
                <PrivateRoute exact path="/Parents/:id/:type" component={Parents} />
                <PrivateRoute exact path="/AddBrothers/:id/:type" component={AddBrothers} />
                <PrivateRoute exact path="/AddBrothersWifes/:id/:type" component={AddBrothersWifes} />
                <PrivateRoute exact path="/AddWife/:id/:type" component={AddWife} />
                <PrivateRoute exact path="/AddSister/:id/:type" component={AddSister} />
                {/* <Route exact path="/WifeParents/:id/:type" component={WifeParents} /> */}
                <PrivateRoute exact path="/addSons/:id/:type" component={AddSons} />
                <PrivateRoute exact path="/UncleKhSons/:id/:type" component={UncleKhSons} />
                <PrivateRoute exact path="/UncleSons/:id/:type" component={UncleSons} />
                <PrivateRoute exact path="/AddUncle/:id/:type" component={AddUncle} />
                <PrivateRoute exact path="/AddKhUncle/:id/:type" component={AddKhUncle} />
                <PrivateRoute exact path="/UncleWife/:id/:type" component={UncleWife} />
                <PrivateRoute exact path="/UncleKhWife/:id/:type" component={UncleKhWife} />
                <PrivateRoute exact path="/AddUnts/:id/:type" component={AddUnts} />
                <PrivateRoute exact path="/UntsHusband/:id/:type" component={UntsHusband} />
                <PrivateRoute exact path="/UntsSons/:id/:type" component={UntsSons} />
                <PrivateRoute exact path="/KhaddUnts/:id/:type" component={KhaddUnts} />
                <PrivateRoute exact path="/KhUntsHusband/:id/:type" component={KhUntsHusband} />
                <PrivateRoute exact path="/KhUntsSons/:id/:type" component={KhUntsSons} />
                <PrivateRoute exact path="/Socialissue/:id/:type" component={Socialissue} />
                <PrivateRoute exact path="/Mother/:id/:type" component={Mother} />
                <PrivateRoute exact path="/SisterHusb/:id/:type" component={SisterHusb} />

                <PrivateRoute exact path="/Document/:id/:type" component={Document} />
                <PrivateRoute exact path="/CarLicence/:id/:type" component={CarLicence} />
                <PrivateRoute exact path="/Passport/:id/:type" component={Passport} />
                <PrivateRoute exact path="/WeaponLicence/:id/:type" component={WeaponLicence} />
                {/* <PrivateRoute exact path="/Scanner/:id/:type" component={Scanner} /> */}

                <PrivateRoute exact path="/President/:id/:type" component={President} />
                <PrivateRoute exact path="/PersonalData/:id/:type" component={PersonalData} />

                <PrivateRoute exact path="/GetAllData/:id/:type" component={GetAllData} />

         </Switch>

              </Grid>
</Grid>

        
       </Router>
       </DepartmentProvider>

      </ThemeProvider>
    </StylesProvider>
   
   

    </div>

            



</>
    
  );
}

export default Home;
