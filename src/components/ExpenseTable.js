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
import { formateCurrency, formateDate } from '@/utils/helpers'

const ExpenseTable = () => {
  const data = [
    {
      id: '8428155b-f1dd-463f-b5fd-cad6c1e4ed47',
      date: '2023-10-08T00:00:00.000Z',
      description: 'dinner with clients',
      amount: 22.25,
      userId: '7858415e-453d-4196-9072-28e23d98029b',
    },
    {
      id: 'ee61b740-fc54-4052-83be-eb30c9b3c001',
      date: '2023-08-08T00:00:00.000Z',
      description: 'Taxi to airport',
      amount: 17.2,
      userId: '7858415e-453d-4196-9072-28e23d98029b',
    },
    {
      id: 'e3292d95-cf54-461d-9b82-eaa7a0db31ff',
      date: '2023-04-14T00:00:00.000Z',
      description: 'Flight to Toronto',
      amount: 177.2,
      userId: '7858415e-453d-4196-9072-28e23d98029b',
    },
  ]

  return (
    <TableContainer
      sx={{ overflow: 'auto', maxHeight: { xs: '300px', md: '500px' } }}
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
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {formateDate(expense.date)}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {expense.description}
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                {formateCurrency(expense.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ExpenseTable
