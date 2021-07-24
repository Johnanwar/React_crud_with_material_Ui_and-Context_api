import React from 'react'
import { TextField  ,makeStyles} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    root: {
        width:'80%',
        "& label":{
            fontSize:"25px !important",
            backgroundColor:"#fafafa"
        }
    }

}))

export default function Input(props) {
    const classes = useStyles();

    const { name,multiline, label, value, dataId , type ,variant, onChange, error = null, ...other } = props;
    return (
        <TextField
        className={classes.root }
           fullWidth= {true}
            variant={variant || "outlined"}
            label={label}
            name={name}
            type={type}
            data-id ={dataId}
            multiline ={multiline}
            // inputRef={inputRef} 
            value={value}
            onChange={onChange}
            {...other}
            {...(error && { error: true, helperText: error })}
        />
    )
}
