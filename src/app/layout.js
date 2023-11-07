import { Stack } from '@mui/material'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Flip, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
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
          bgcolor='#F5F5F5'
        >
          <Navbar />
          {children}
          <Footer />
        </Stack>
      </body>
    </html>
  )
}
