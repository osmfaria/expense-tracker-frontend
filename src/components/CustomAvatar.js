'use client'

import { useEmployee } from '@/providers/employee'
import { stringAvatar } from '@/utils/helpers'
import { Avatar, Stack, Typography, useTheme } from '@mui/material'

const CustomAvatar = () => {
  const { activeEmployee, employees } = useEmployee()
  const theme = useTheme()

  const employeeName = employees.filter(
    (employee) => employee.id === activeEmployee
  )[0].name

  return (
    <Stack direction='row' alignItems='center' gap={1}>
      <Avatar
        {...stringAvatar(employeeName)}
        sx={{
          bgcolor: theme.palette.secondary.main,
          height: { xs: '34px', sm: '44px' },
          width: { xs: '34px', sm: '44px' },
        }}
      />
      <Typography variant='body2'>{employeeName}</Typography>
    </Stack>
  )
}

export default CustomAvatar
