import { useExpense } from '@/providers/expenses'
import { AttachMoney } from '@mui/icons-material'
import { Paper, Stack, Typography } from '@mui/material'

const Total = () => {
  const { expenses } = useExpense()

  const periodTotal = expenses
    .reduce((acc, cur) => acc + cur.amount, 0)
    .toFixed(2)

  return (
    <Stack
      direction='row'
      justifyContent='flex-end'
      alignItems='flex-start'
      mb='20px'
    >
      <Paper sx={{ padding: '5px 15px' }}>
        <Typography color='secondary'>Period Total</Typography>
        <Stack direction='row'>
          <AttachMoney sx={{ fontSize: 30 }} />
          <Typography fontSize={30}>{periodTotal}</Typography>
        </Stack>
      </Paper>
    </Stack>
  )
}

export default Total
