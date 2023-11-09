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
import { useEmployee } from '@/providers/employee'
import DeleteButton from './DeleteButton'

const ExpenseTable = () => {
  const { expenses, deleteExpense, onExpenseDelete, isLoading } = useExpense()
  const { activeEmployee } = useEmployee()

  const handleDelete = async (expenseId, expenseDate) => {
    const res = await deleteExpense(expenseId)

    if (res.status === 204) {
      onExpenseDelete(activeEmployee, expenseId, expenseDate)
    }
  }

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
                Date
              </Typography>{' '}
            </TableCell>
            <TableCell>
              <Typography variant='inherit' fontWeight={600}>
                Description
              </Typography>{' '}
            </TableCell>
            <TableCell>
              <Typography variant='inherit' fontWeight={600}>
                Amount
              </Typography>{' '}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {formatDate(expense.date)}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {expense.description}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {formateCurrency(expense.amount)}
              </TableCell>
              <TableCell>
                <DeleteButton
                  handleDelete={() => handleDelete(expense.id, expense.date)}
                  isLoading={isLoading}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ExpenseTable
