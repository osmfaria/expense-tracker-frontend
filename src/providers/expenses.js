'use client'
import { createContext, useContext, useState } from 'react'
import Api from '../../services/api'
import { toast } from 'react-toastify'

const ExpenseContext = createContext()

const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const getExpenses = async (userId, year) => {
    setIsLoading(true)
    await Api.get(`/expenses/${userId}/${year}`)
      .then((res) => setExpenses(res.data))
      .catch((_) => toast.error('Something went wrong... Try again later'))
      .finally(() => setIsLoading(false))
  }

  return (
    <ExpenseContext.Provider value={{ expenses, getExpenses }}>
      {children}
    </ExpenseContext.Provider>
  )
}

const useExpense = useContext(ExpenseContext)
