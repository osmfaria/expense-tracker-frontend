'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import React from 'react'
import { formateCurrency, formatDate } from '@/utils/helpers'
import { useExpense } from '@/providers/expenses'

const ExpenseWeeklyTable = () => {
  const { expensesByWeek } = useExpense()

  return (
    <TableContainer
      sx={{
        overflow: 'auto',
        height: '300px',
        paddingBottom: '20px',
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant='inherit' fontWeight={600}>
                Week Of
              </Typography>{' '}
            </TableCell>
            <TableCell>
              <Typography variant='inherit' fontWeight={600}>
                Week Number
              </Typography>{' '}
            </TableCell>
            <TableCell>
              <Typography variant='inherit' fontWeight={600}>
                Total
              </Typography>{' '}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expensesByWeek.map((expense) => (
            <TableRow key={expense.week_number}>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {formatDate(expense.week)}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {expense.week_number}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {formateCurrency(expense.total_amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ExpenseWeeklyTable
