import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectLabels(props) {
  const {
    style,
    options, 
    value,
    onChange,
  } = props
  return (
    <div >
      <FormControl style={{ width: '100%', ...style }} >
        <Select
          value={value}
          onChange={onChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {options.map((option, index) => (
            <MenuItem value={option.value} color="secondary" key={index}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}