import Image from 'next/image'
import styles from './page.module.css'
import Navbar from '@/components/Navbar'
import { Container } from '@mui/material'
import ExpenseForm from '@/components/ExpenseForm'
import Employee from '@/components/Employee'

export default function Home() {
  return (
    <Container maxWidth='lg'>
      <Employee />
      <ExpenseForm />
    </Container>
  )
}
