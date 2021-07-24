import React,{useState} from 'react';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function MultipleSelect() {
  const fixedOptions = [];
  const [value, setValue] = useState([]);
  return (
    <Autocomplete
      multiple
      id="fixed-tags-demo"
      value={value}
      onChange={(event, newValue) => {
        setValue([
          ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
        ]);
        console.log(value)
      }}
      options={names}
      getOptionLabel={(option) => option}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option}
            {...getTagProps({ index })}
            disabled={fixedOptions.indexOf(option) !== -1}
          />
        ))
      }
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="اختار اسم" variant="outlined" placeholder="" />
      )}
    />
  );
}

const names = [
  'nancy',
  'maggi',
  'abanoub',
  'marina',
  'mina'
];

