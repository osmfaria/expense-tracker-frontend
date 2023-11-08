import { Box, Container, Stack } from '@mui/material'
import ExpenseForm from '@/components/ExpenseForm'
import Employee from '@/components/Employee'
import ExpenseDisplay from '@/components/ExpenseDisplay'

export default function Home() {
  return (
    <Container maxWidth='lg'>
      <Stack
        gap={2}
        sx={{
          flexDirection: { xs: 'column', lg: 'row' },
          alignItems: { xs: 'center', lg: 'flex-start' },
        }}
      >
        <Box sx={{ flexGrow: 1, width: { xs: 'auto', lg: '70%' } }}>
          <Employee />
          <ExpenseForm />
        </Box>
        <ExpenseDisplay />
      </Stack>
    </Container>
  )
}
