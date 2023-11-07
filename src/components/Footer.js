import { Box, Container, Divider, Stack, Typography } from '@mui/material'
import Link from 'next/link'

const Footer = () => {
  return (
    <Box>
      <Container
        maxWidth='lg'
        sx={{ padding: { xs: '10px 20px', md: '20px 20px' } }}
      >
        <Divider sx={{ mb: '20px' }} />
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography color='primary' variant='subtitle2'>
            {new Date().getFullYear()} &copy; Expense Tracker
          </Typography>

          <Typography color='primary' variant='subtitle2'>
            Build with ❤️ by{' '}
            <Link href='https://github.com/osmfaria' target='_blank'>
              <Box component='span' sx={{ textDecoration: 'underline' }}>
                Osmar
              </Box>
            </Link>
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer
