'use client'

import ResponsiveSize from '@/utils/responsiveSize'
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'

const YearsDropDown = ({
  label,
  value,
  handleChange,
  disabled,
  list,
  isLoading,
}) => {
  const size = ResponsiveSize()

  return (
    <FormControl sx={{ width: '50%' }}>
      <InputLabel id='select-year-label'>{label}</InputLabel>
      <Select
        labelId='select-year-label'
        id='select-year'
        label={label}
        value={list.length > 0 ? value : ''}
        onChange={handleChange}
        disabled={disabled}
        size={size}
      >
        {isLoading && (
          <MenuItem
            value={''}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <CircularProgress />
          </MenuItem>
        )}
        {list.map((item) => (
          <MenuItem value={item.year} key={Math.random()}>
            {`${item.year}`}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Select a year</FormHelperText>
    </FormControl>
  )
}

export default YearsDropDown
