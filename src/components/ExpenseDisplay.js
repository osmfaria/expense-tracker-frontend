'use client'

import { Avatar, Box, Card, Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import { stringAvatar } from '@/utils/helpers'
import ExpenseTable from './ExpenseTable'

const ExpenseDisplay = () => {
  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: { xs: '500px', lg: '100%' },
        flexGrow: 1,
      }}
    >
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center '
        sx={{
          padding: { xs: '20px 15px', md: '15px 30px' },
        }}
      >
        <Typography
          variant='h5'
          fontWeight={600}
          sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}
        >
          Expense summary
        </Typography>
        <Stack direction='row' alignItems='center' gap={1}>
          <Avatar
            {...stringAvatar('Odin Allfather')}
            sx={{
              bgcolor: 'secondary',
              height: { xs: '34px', sm: '44px' },
              width: { xs: '34px', sm: '44px' },
            }}
          />
          <Typography variant='body2'>Odin Allfather</Typography>
        </Stack>
      </Stack>
      <Divider />
      <Box
        sx={{
          padding: { xs: '20px 15px', md: '25px 30px' },
        }}
      >
        <ExpenseTable />
      </Box>
    </Card>
  )
}

export default ExpenseDisplay
