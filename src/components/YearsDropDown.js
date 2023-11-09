'use client'

import ResponsiveSize from '@/utils/responsiveSize'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'

const YearsDropDown = ({ label, value, handleChange, disabled, list }) => {
  const size = ResponsiveSize()

  return (
    <FormControl sx={{ width: '50%' }}>
      <InputLabel id='select-year-label'>{label}</InputLabel>
      <Select
        labelId='select-year-label'
        id='select-year'
        label={label}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        size={size}
      >
        {list.map((item) => (
          <MenuItem value={item.year} key={item.year}>
            {`${item.year}`}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        {disabled ? 'Select an employee first' : 'Select a year'}
      </FormHelperText>
    </FormControl>
  )
}

export default YearsDropDown
