import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from "@material-ui/core";


function Spinner(props) {
    const {className, ...other } = props;


    return (
        <>
           <CircularProgress
              style={{   color: '#fff',
              marginLeft: '10px',
              width: '25px',
              height: '25px',}}
           /> 
        </>
    )
}

export default Spinner
