import React from 'react'
import { Grid,makeStyles, Typography} from '@material-ui/core';
import bg from '../../assets/images/bg.jpg';

const useStyles = makeStyles(theme => ({
    root: {
        // width: '85%',
        // width: '90%',
        // margin: theme.spacing(2),
        marginBottom: "0!important",
        color: '#115d8e',
        borderBottom:'1px solid #115d8e',
        width:'max-content',
        paddingBottom:'5px',

        
    }
}))

function Header(props) {
    const classes = useStyles();

    const { variant,children, ...other } = props;
    return (
        <Grid item xs={12} >
        <Typography
        className={classes.root}
          align ="left"
          variant={variant || "h3"}
         >
              {children}
        </Typography>
        </Grid>
    )
}

export default Header
