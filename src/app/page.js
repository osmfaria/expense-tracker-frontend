import { Box, Container, Stack } from '@mui/material'
import ExpenseForm from '@/components/ExpenseForm'
import Employee from '@/components/Employee'
import ExpenseDisplay from '@/components/ExpenseDisplay'
import ExpenseFilters from '@/components/ExpenseFilters'

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
        <Box sx={{ maxWidth: { xs: '500px', lg: '100%' }, width: '100%' }}>
          <ExpenseFilters />
          <ExpenseDisplay />
        </Box>
      </Stack>
    </Container>
  )
}
