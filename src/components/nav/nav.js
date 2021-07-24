import React, {useState } from "react"
// import logo from '../../assets/images/logo.png';
import logo from '../../assets/images/logo.jpg';
import { Link, useHistory  } from "react-router-dom"
import { Menu ,AppBar, Toolbar, Button, Typography, makeStyles ,Paper} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
root: {
  flexGrow: 1,
  padding:"5px 0",
  marginBottom:"110px",
  '& .MuiAppBar-colorPrimary':{
    backgroundColor:'#fff',
    color:"#000",
  },
  '& .logoutDiv':{
    display:'flex',
    padding:"0 30px",
    alignItems:"center",
    '& p':{
      padding:'0 10px',
      fontSize:'25px',
      fontWeight:'bold',
     },
     '& span':{
       cursor:'pointer',
     }
  },
  
 
},


}));

export default  function Nav() {
  const history = useHistory()

  function handleLogout() {
    localStorage.setItem('isLogin', false);
    localStorage.setItem('AccessToken', ''); 
    localStorage.setItem('UserID', '');

    history.push(`/Login`)

  }
  const classes = useStyles();
  const FirsName = localStorage.getItem('FirsName');



    return (

      <Paper elevation={0} square className={classes.root}>

      <AppBar position="fixed">
        <Toolbar class="nav-container d-flex justify-content-between align-items-center">
   
           <div className='logoutDiv'>  <span onClick={handleLogout}> تسجيل الخروج </span>  <p>{FirsName}</p> </div>
        
          <Link to="/">
          <img 
          style={{margin:'0 15px',
          // width:'161px',
          // height:'61px',
          }}
          className="img-fluid" src={logo}/>
         </Link>
        </Toolbar>
      </AppBar>
    </Paper>      
            
        
    )
}