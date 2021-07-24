import React from 'react';
import {TextField} from '@material-ui/core';

export default function Textarea(props) {
    const { name, label, value, dataId , type ,variant, onChange, error = null, ...other } = props;

  return ( 
<TextField
  id="outlined-multiline-static"
  label="Multiline"
  multiline
  rows={10}
  variant="outlined"
/>
   );
}