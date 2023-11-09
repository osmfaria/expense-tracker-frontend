import ResponsiveSize from '@/utils/responsiveSize'
import { Clear, HowToReg } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  LinearProgress,
  Stack,
  TextField,
} from '@mui/material'
import * as yup from 'yup'
import { Formik, Form } from 'formik'
import Api from '../../services/api'
import { toast } from 'react-toastify'
import { useEmployee } from '@/providers/employee'

const RegisterEmployeeModal = ({ handleModal, open }) => {
  const size = ResponsiveSize()
  const { getEmployees } = useEmployee()

  const inistialValues = {
    name: '',
    companyId: '',
  }

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('name is required')
      .min(3, 'should be at least 3 characters long')
      .max(50, 'should be lower than 50 characters'),
    companyId: yup
      .number('should contain only numbers')
      .positive('must be positive')
      .required('company id is required')
      .integer('should not contain decimals')
      .min(1, 'should be equal or higher than 1')
      .max(1000, 'should be lower than 1000'),
  })

  const onSubmit = async (data, formik) => {
    const response = await Api.post('/users', data)
      .then((res) => {
        toast.success('Employee registered')
        return res
      })
      .catch((_) => toast.error('Something went wrong... Try again later'))
      .finally(() => formik.setSubmitting(false))

    if (response.status === 201) {
      getEmployees()
    }

    formik.resetForm()
    handleModal()
  }

  return (
    <Formik
      initialValues={inistialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Dialog open={open} onClose={handleModal}>
          <Box style={{ height: '4px', overflowY: 'hidden' }}>
            {formik.isSubmitting && <LinearProgress />}
          </Box>
          <DialogTitle mt='10px'>Register Employee</DialogTitle>
          <Form>
            <Stack
              direction='column'
              gap='20px'
              p='0 40px'
              sx={{ minWidth: { sm: '400px' } }}
            >
              <TextField
                size={size}
                variant='standard'
                name='name'
                type='text'
                label='Name'
                {...formik.getFieldProps('name')}
                error={formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                size={size}
                variant='standard'
                name='companyId'
                type='number'
                label='Company Id'
                {...formik.getFieldProps('companyId')}
                error={formik.touched.companyId && !!formik.errors.companyId}
                helperText={formik.touched.companyId && formik.errors.companyId}
              />
            </Stack>
            <DialogActions sx={{ mt: '30px' }}>
              <Button
                disabled={formik.isSubmitting}
                startIcon={<Clear />}
                variant='text'
                size={size}
                color='warning'
                sx={{ mr: '20px' }}
                onClick={() => {
                  handleModal(), formik.resetForm()
                }}
              >
                Cancel
              </Button>
              <LoadingButton
                type='submit'
                loading={formik.isSubmitting}
                loadingPosition='start'
                startIcon={<HowToReg />}
                variant='text'
                size={size}
                color='success'
              >
                Register
              </LoadingButton>
            </DialogActions>
          </Form>
        </Dialog>
      )}
    </Formik>
  )
}

export default RegisterEmployeeModal
