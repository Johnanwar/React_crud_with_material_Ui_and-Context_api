import React from 'react'
import { NavLink as Lenk } from "react-router-dom"

import { Button as MuiButton, makeStyles } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
       display:"flex",
       alignItems:"center",
       textDecoration: "none",
      //  backgroundColor: "#616669",
       color: "#3b3b3a",
       fontFamily:"Markazi",
      //  backgroundColor:' #fafafa',
       fontWeight:"bold",
       fontSize:'25px',
       padding:"15px",
      //  marginBottom: "10px",
       borderBottom: '1px solid #ccc',
     
       "& svg":{
        marginLeft:"9px",
        fontSize:"24px",
         color: '#115d8e',
       },
      "&:hover, &:focus": {
        backgroundColor: "#82898c",
        color:"#fff",
      },
    
    }
}))

export default function Link(props) {

    const { to , children,className,...other } = props;
    const classes = useStyles();

    return (

        <Lenk className={classes.root + ' ' + (className || '')}
        activeClassName='activLink'
         to={to}
         >
      {children}
      </Lenk>

        
    )
}
