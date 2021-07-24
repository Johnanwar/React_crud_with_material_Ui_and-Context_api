import React from 'react'
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
        margin: "0px auto",
        textAlign: "center",
        '& .MuiFormControl-root': {
            width: '100%',
            margin: '8px 0'
        }
    }
}))

export default function Form(props) {
    const classes = useStyles();
    const { children, ...other } = props;


    return (
        <form className={classes.root} noValidate autoComplete="off" {...other}>
            {children}
        </form>
    )
}
