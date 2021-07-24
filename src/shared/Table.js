import React from 'react'
import { Table as MuiTable, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    table: {
        minWidth: 650,
        textAlign:"center",
        '& thead th':{
            backgroundColor: '#676869 ',
            color: 'white',
            fontSize:'17px',
            textAlign:"center",
        },
        
        '& tbody td': {
            fontWeight: '300',
            fontSize:'17px',
            textAlign:"center",
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
        // '& .MuiTableCell-root': {
        //     border: 'none'
        // }
    },
}));

export default function Table(props) {

    const classes = useStyles();

    return (
        <MuiTable className={classes.table}>
            {props.children}
        </MuiTable>
    )
}