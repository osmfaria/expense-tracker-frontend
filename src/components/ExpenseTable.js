'use client'

import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { formateCurrency, formatDate } from '@/utils/helpers'
import { useExpense } from '@/providers/expenses'
import { useEmployee } from '@/providers/employee'
import DeleteButton from './DeleteButton'
import { EditNote } from '@mui/icons-material'
import UpdateExpenseModal from './UpdateExpenseModal'

const ExpenseTable = () => {
  const { expenses, deleteExpense, onExpenseDelete, isLoading } = useExpense()
  const { activeEmployee } = useEmployee()
  const [isOpen, setIsOpen] = useState(false)
  const [expenseToEdit, setExpenseToEdit] = useState(null)
  const tableContainerRef = useRef(null)

  useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTop = 0
    }
  }, [expenses])

  const handleModal = (expense) => {
    if (isOpen) {
      setExpenseToEdit(null)
    } else {
      setExpenseToEdit(expense)
    }
    setIsOpen((prev) => !prev)
  }

  const handleDelete = async (expenseId, expenseDate) => {
    const res = await deleteExpense(expenseId)

    if (res.status === 204) {
      onExpenseDelete(activeEmployee, expenseId, expenseDate)
    }
  }

  return (
    <>
      {expenseToEdit && (
        <UpdateExpenseModal
          handleClose={handleModal}
          isOpen={isOpen}
          expenseToEdit={expenseToEdit}
        />
      )}
      <TableContainer
        sx={{
          overflow: 'auto',
          height: '300px',
          paddingBottom: '20px',
          scrollBehavior: 'smooth',
        }}
        ref={tableContainerRef}
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
                  <Stack direction='row' flexWrap='nowrap' alignItems='center'>
                    <DeleteButton
                      handleDelete={() =>
                        handleDelete(expense.id, expense.date)
                      }
                      isLoading={isLoading}
                    />
                    <Tooltip title='Edit'>
                      <IconButton onClick={() => handleModal(expense)}>
                        <EditNote />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ExpenseTable
