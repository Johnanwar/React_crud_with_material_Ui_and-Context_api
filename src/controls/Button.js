import React from 'react'
import { Button as MuiButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        '& .MuiButton-label': {
            textTransform: 'none'
        }
    }
}))

export default function Btn(props) {

    const { children, color, variant, onClick, className, ...other } = props;
    const classes = useStyles();

    return (
        <MuiButton
            className={classes.root + ' ' + (className || '')}
            variant={variant || "contained"}
            type={"submit" || 'type'}
            color={color || "default"}
            onClick={onClick}
            {...other}>
            {children}
        </MuiButton>
    )
}
