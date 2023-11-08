'use client'

import { Clear, LocalAtm } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  Grid,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Form, Formik } from 'formik'
import { LoadingButton } from '@mui/lab'
import ResponsiveSize from '@/utils/responsiveSize'
import * as yup from 'yup'
import Api from '../../services/api'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

const ExpenseForm = () => {
  const size = ResponsiveSize()

  const handlePriceChange = (event, formik) => {
    const inputValue = event.target.value
    if (inputValue) {
      console.log('oi')
      const formattedValue = parseFloat(inputValue).toFixed(2)
      formik.setFieldValue('amount', formattedValue)
    }
  }

  const initialValues = {
    description: '',
    amount: '',
    date: null,
  }

  const validationSchema = yup.object({
    date: yup.date().required('date is required'),
    description: yup
      .string()
      .required('description is required')
      .min(3, 'should be at least 3 characters long')
      .max(200, 'should not be longer than 200 characters'),
    amount: yup
      .number('must be a number')
      .positive('must be a positive value')
      .required('amount is required'),
  })

  const onSubmit = async (data, formik) => {
    // await Api.post('/expenses', data)
    //   .then((_) => toast.success('Expense added'))
    //   .catch((_) => toast.error('Something went wrong... Try again later'))
    //   .finally(() => formik.setSubmitting(false))

    console.log(data)

    // formik.resetForm()
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <>
          <Card
            sx={{
              width: { lg: '50%' },
              maxWidth: '500px',
            }}
          >
            {formik.isSubmitting && <LinearProgress />}
            <Form>
              <Box
                sx={{
                  padding: { xs: '20px 15px', md: '25px 30px' },
                }}
              >
                <Grid
                  container
                  alignItems='center'
                  justifyContent='center'
                  rowSpacing={{ xs: 3, sm: 5 }}
                  columnSpacing={2}
                >
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        name='date'
                        type='date'
                        value={formik.values.date}
                        onChange={(newValue) =>
                          formik.setFieldValue('date', newValue)
                        }
                        maxDate={dayjs(new Date())}
                        slotProps={{
                          textField: {
                            helperText: formik.touched.date && (
                              <Typography variant='caption' color='error'>
                                {formik.errors.date}
                              </Typography>
                            ),
                            fullWidth: true,
                            size: size,
                            error:
                              formik.touched.amount && !!formik.errors.amount,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      size={size}
                      variant='outlined'
                      name='amount'
                      type='number'
                      label='Amount'
                      {...formik.getFieldProps('amount')}
                      error={formik.touched.amount && !!formik.errors.amount}
                      helperText={formik.touched.amount && formik.errors.amount}
                      onBlur={(event) => handlePriceChange(event, formik)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      sx={{ width: '100%' }}
                      size={size}
                      label='Description'
                      variant='outlined'
                      name='description'
                      type='text'
                      error={
                        formik.touched.description &&
                        !!formik.errors.description
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                      {...formik.getFieldProps('description')}
                    />
                  </Grid>
                </Grid>
                <Stack
                  direction='row'
                  alignItems='center'
                  mt={{ xs: '30px', sm: '40px' }}
                >
                  <Button
                    disabled={formik.isSubmitting}
                    endIcon={<Clear />}
                    variant='contained'
                    size={size}
                    color='warning'
                    sx={{ mr: '20px', width: '50%' }}
                    onClick={() => formik.resetForm()}
                  >
                    Clear
                  </Button>
                  <LoadingButton
                    type='submit'
                    loading={formik.isSubmitting}
                    loadingPosition='end'
                    endIcon={<LocalAtm />}
                    variant='contained'
                    size={size}
                    color='success'
                    sx={{ width: '50%' }}
                  >
                    Record
                  </LoadingButton>
                </Stack>
              </Box>
            </Form>
          </Card>
        </>
      )}
    </Formik>
  )
}

export default ExpenseForm
