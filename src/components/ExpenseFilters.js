'use client'

import {
  Box,
  Card,
  LinearProgress,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import YearsDropDown from './YearsDropDown'
import { useExpense } from '@/providers/expenses'
import { useEffect } from 'react'
import { useEmployee } from '@/providers/employee'

const ExpenseFilters = () => {
  const {
    getYearsWithExpenses,
    getExpensesByWeek,
    getExpenses,
    expenseYears,
    view,
    handleView,
    isLoading,
    activeYear,
    handleActiveYear,
  } = useExpense()
  const { activeEmployee } = useEmployee()

  const handleChangeYears = (event) => {
    handleActiveYear(event.target.value)
  }

  useEffect(() => {
    if (activeEmployee) {
      getYearsWithExpenses(activeEmployee)
    }
  }, [activeEmployee])

  useEffect(() => {
    if (expenseYears && expenseYears.length > 0) {
      handleActiveYear(expenseYears[0].year)
    }
  }, [expenseYears])

  useEffect(() => {
    if (activeEmployee && activeYear) {
      getExpenses(activeEmployee, activeYear)
      getExpensesByWeek(activeEmployee, activeYear)
    }
  }, [activeEmployee, activeYear])

  return (
    <Card
      sx={{
        width: '100%',
        mb: '20px',
        overflowY: 'hidden',
      }}
    >
      <Box style={{ height: '4px', overflowY: 'hidden' }}>
        {isLoading && <LinearProgress />}
      </Box>
      <Box
        sx={{
          padding: { xs: '20px 15px', md: '25px 30px' },
        }}
      >
        <Typography
          variant='h5'
          color='primary'
          mb='20px'
          sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}
        >
          Filters
        </Typography>
        <Stack direction='row' alignItems='flex-start' gap={4}>
          <YearsDropDown
            label={'Years'}
            value={activeYear}
            handleChange={handleChangeYears}
            disabled={!expenseYears.length || isLoading}
            list={expenseYears}
          />
          <Stack direction='row' alignItems='center' gap={'2px'} width='50%'>
            <Switch
              checked={view === 'weekly'}
              onChange={handleView}
              disabled={!activeEmployee || isLoading}
              color='secondary'
            />
            <Typography
              variant='body2'
              fontWeight='500'
              color='MenuText'
              fontSize='1rem'
            >
              Group by Week
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Card>
  )
}

export default ExpenseFilters
