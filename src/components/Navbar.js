'use client'

import ResponsiveSize from '@/utils/responsiveSize'
import { PersonAdd } from '@mui/icons-material'
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import RegisterEmployeeModal from './RegisterEmployeeModal'
import { useState } from 'react'

const Navbar = () => {
  const size = ResponsiveSize()
  const [isOpen, setIsOpen] = useState(false)

  const handleModal = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <Box>
      <RegisterEmployeeModal handleModal={handleModal} open={isOpen} />
      <Container
        maxWidth='lg'
        sx={{ padding: { xs: '10px 20px', md: '20px 20px' } }}
      >
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant='h6' color='primary' fontWeight='600'>
            Expense Tracker
          </Typography>
          {size === 'small' ? (
            <IconButton color='primary'>
              <PersonAdd />
            </IconButton>
          ) : (
            <Button startIcon={<PersonAdd />} onClick={handleModal}>
              Register Employee
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  )
}

export default Navbar
