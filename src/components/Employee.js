'use client'

import { useEmployee } from '@/providers/employee'
import ResponsiveSize from '@/utils/responsiveSize'
import { Person } from '@mui/icons-material'
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
  Card,
  LinearProgress,
  Typography,
} from '@mui/material'
import { useEffect, useMemo } from 'react'

const Employee = () => {
  const {
    employees,
    getEmployees,
    isLoading,
    selectActiveEmployee,
    error,
    activeEmployee,
  } = useEmployee()

  const size = ResponsiveSize()

  useEffect(() => {
    getEmployees()
  }, [])

  const menuItems = useMemo(() => {
    return employees.map((employee) => (
      <MenuItem value={employee.id} key={employee.id}>
        {`${employee.name} | ID ${employee.companyId}`}
      </MenuItem>
    ))
  }, [employees])

  const handleChange = (event) => {
    const employee = event.target.value
    selectActiveEmployee(employee)
  }

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: '500px',
        mb: '20px',
        minHeight: { xs: '175px' },
      }}
    >
      {isLoading && <LinearProgress />}
      <Box
        sx={{
          padding: { xs: '20px 15px', md: '25px 30px' },
        }}
      >
        <Typography
          variant='h5'
          color='GrayText'
          mb='20px'
          sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}
        >
          Start by selecting an employee:
        </Typography>
        <FormControl fullWidth>
          {!isLoading && (
            <>
              <Select
                id='select-employee'
                value={activeEmployee}
                onChange={handleChange}
                startAdornment={<Person />}
                disabled={!employees.length || error}
                size={size}
              >
                {menuItems}
              </Select>
              <FormHelperText>
                {error ? (
                  <Typography variant='caption' color='error'>
                    Failed to load employees
                  </Typography>
                ) : (
                  'Select an employee'
                )}
              </FormHelperText>
            </>
          )}
        </FormControl>
      </Box>
    </Card>
  )
}

export default Employee
