'use client'

import { Clear, SystemUpdateAlt } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
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
import { useExpense } from '@/providers/expenses'
import { useEmployee } from '@/providers/employee'

const UpdateExpenseModal = ({ handleClose, isOpen, expenseToEdit }) => {
  const size = ResponsiveSize()
  const { updateExpense, onExpenseChange, activeYear } = useExpense()
  const { activeEmployee } = useEmployee()

  const handlePriceChange = (event, formik) => {
    const inputValue = event.target.value
    if (inputValue) {
      const formattedValue = parseFloat(inputValue).toFixed(2)
      formik.setFieldValue('amount', formattedValue)
    }
  }

  const initialDate = dayjs(expenseToEdit.date.slice(0, 10))
  const initialAmount = expenseToEdit.amount.toFixed(2)

  const initialValues = {
    description: expenseToEdit.description,
    amount: initialAmount,
    date: initialDate,
    userId: expenseToEdit.userId,
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
    const expenseDate = dayjs(data.date).format('YYYY-MM-DD')
    const expenseYear = dayjs(expenseDate).year()

    const updatedData = {
      ...data,
      date: expenseDate,
    }

    const res = await updateExpense(expenseToEdit.id, updatedData)
    if (res.status === 200) {
      await onExpenseChange(activeEmployee, expenseYear, activeYear)
    }

    formik.resetForm()
    handleClose()
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <>
          <Dialog open={isOpen} onClose={handleClose}>
            <Box style={{ height: '4px', overflowY: 'hidden' }}>
              {formik.isSubmitting && <LinearProgress />}
            </Box>
            <Form>
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
                  Update Expenses
                </Typography>
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
                        format='YYYY/MM/DD'
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
                    variant='text'
                    size={size}
                    color='warning'
                    sx={{ mr: '20px', width: '50%' }}
                    onClick={handleClose}
                  >
                    Discard Changes
                  </Button>
                  <LoadingButton
                    type='submit'
                    loading={formik.isSubmitting}
                    loadingPosition='end'
                    endIcon={<SystemUpdateAlt />}
                    variant='text'
                    size={size}
                    color='success'
                    sx={{ width: '50%' }}
                  >
                    Update
                  </LoadingButton>
                </Stack>
              </Box>
            </Form>
          </Dialog>
        </>
      )}
    </Formik>
  )
}

export default UpdateExpenseModal
