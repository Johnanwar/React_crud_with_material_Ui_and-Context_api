import React from 'react'
import { Button , makeStyles } from "@material-ui/core";
import PrintIcon from '@material-ui/icons/Print';

const useStyles = makeStyles(theme => ({
    root: {
        margin: "15px 0",
        '& Button':{
          color:"#df921f",
          '& svg':{
            fontSize:"50px"
          }
        }
    }
}))
function PrintButton(props) {
    const { children, color, variant, onClick, className, ...other } = props;
    const classes = useStyles();

    return (
        <div
       className={classes.root} 
       >
             <Button 
             title='طباعه'
             onClick={onClick}>
               <PrintIcon/> 
             </Button>
        </div>
    )
}

export default PrintButton
