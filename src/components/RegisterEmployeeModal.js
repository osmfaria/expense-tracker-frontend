import ResponsiveSize from '@/utils/responsiveSize'
import { Clear, HowToReg } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from '@mui/material'

const RegisterEmployeeModal = ({ handleModal, open }) => {
  const size = ResponsiveSize()
  return (
    <Dialog open={open} onClose={handleModal}>
      <DialogTitle>
        <Typography>Register Employee</Typography>
      </DialogTitle>
      <DialogActions>
        <Button
          startIcon={<Clear />}
          variant='text'
          size={size}
          onClick={handleModal}
          color='warning'
          sx={{ mr: '20px' }}
        >
          Cancel
        </Button>
        <LoadingButton
          loading
          loadingPosition='start'
          startIcon={<HowToReg />}
          variant='text'
          size={size}
          color='success'
        >
          Register
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default RegisterEmployeeModal
