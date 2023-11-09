import { Box, CssBaseline, Stack } from '@mui/material'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Flip, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { EmployeeProvider } from '@/providers/employee'
import { ExpenseProvider } from '@/providers/expenses'
import { ThemeProvider } from '@mui/material'
import { theme } from '@/components/Theme'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Expense Tracker',
  description: 'Expense Tracker Application',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <EmployeeProvider>
            <ExpenseProvider>
              <ToastContainer
                position='top-right'
                autoClose={2000}
                limit={1}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme='light'
                transition={Flip}
              />
              <Stack
                direction='column'
                justifyContent='space-between'
                minHeight='100vh'
                sx={{
                  backgroundImage: 'url(/steps.svg)',
                  backgroundSize: 'cover',
                }}
              >
                <Navbar />
                <Box
                  minHeight='80vh'
                  sx={{ padding: { xs: '20px 0', sm: '60px 0' } }}
                >
                  {children}
                </Box>
                <Footer />
              </Stack>
            </ExpenseProvider>
          </EmployeeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
