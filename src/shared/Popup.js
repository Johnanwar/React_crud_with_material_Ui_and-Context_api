import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography, IconButton, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Spinner } from "../controls";


const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

export default function Popup(props) {

    const { title, children, openPopup, loading ,setOpenPopup ,ConfirmDeleteHandler } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex', alignItems:"center" , color:"red" }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <IconButton
                        onClick={() => { setOpenPopup(false) }}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
            <Typography variant="h4" component="div" style={{ flexGrow: 1 }}>
            هل انت متاكد انك تريد الحذف ؟
            </Typography>
           
            
                {/* {children} */}
            </DialogContent>

            <div
            style={{margin:"10px 0", display:'flex' , justifyContent:"space-between"}}
            >
              <Button 
              onClick={ConfirmDeleteHandler }
              disabled={loading}
              variant="contained" color="secondary">
                                {loading ? (
                <Spinner/>
           ): ('')}
             تأكيد الحذف
              </Button>

              <Button
              onClick={() => { setOpenPopup(false) }}
               variant="outlined" color="secondary">
              إلغاء
             </Button>
        
            </div>
        </Dialog>
    )
}