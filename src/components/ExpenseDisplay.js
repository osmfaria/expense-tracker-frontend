'use client'

import {
  Box,
  Card,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'
import ExpenseTable from './ExpenseTable'
import { useExpense } from '@/providers/expenses'
import ExpenseWeeklyTable from './ExpenseWeeklyTable'
import Total from './Total'
import CustomAvatar from './CustomAvatar'
import { useEmployee } from '@/providers/employee'
import NoData from './NoData'

const ExpenseDisplay = () => {
  const { expenses, expensesByWeek, view, isLoading } = useExpense()
  const { activeEmployee } = useEmployee()

  return (
    <Card
      sx={{
        width: '100%',
        height: '528px',
      }}
    >
      <Box style={{ height: '4px', overflowY: 'hidden' }}>
        {isLoading && <LinearProgress />}
      </Box>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center '
        sx={{
          padding: { xs: '20px 15px', md: '15px 30px' },
        }}
        minHeight='74px'
      >
        <Typography
          variant='h5'
          color='primary'
          sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}
        >
          Expenses summary
        </Typography>

        {activeEmployee && <CustomAvatar />}
      </Stack>
      <Divider />
      <Box
        sx={{
          padding: { xs: '20px 15px', md: '25px 30px' },
        }}
      >
        {expenses.length > 0 && <Total />}
        {view === 'weekly'
          ? expensesByWeek.length > 0 && <ExpenseWeeklyTable />
          : expenses.length > 0 && <ExpenseTable />}
        {!isLoading && !expensesByWeek.length && !expenses.length && <NoData />}
      </Box>
    </Card>
  )
}

export default ExpenseDisplay
