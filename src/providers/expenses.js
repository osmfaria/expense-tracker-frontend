'use client'

import { createContext, useContext, useState } from 'react'
import Api from '../../services/api'
import { toast } from 'react-toastify'

const ExpenseContext = createContext()

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState()
  const [expensesByWeek, setExpensesByWeek] = useState()
  const [expenseYears, setExpensesYears] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const createExpense = async (data) => {
    setIsLoading(true)
    await Api.post(`/expenses/`, data)
      .then((_) => toast.success('Expense recorded'))
      .catch((_) => toast.error('Something went wrong... Try again later'))
      .finally(() => setIsLoading(false))
  }

  const getExpenses = async (userId, year) => {
    setIsLoading(true)
    await Api.get(`/expenses/${userId}/${year}`)
      .then((res) => setExpenses(res.data))
      .catch((_) => toast.error('Something went wrong... Try again later'))
      .finally(() => setIsLoading(false))
  }

  const getExpensesByWeek = async (userId, year) => {
    setIsLoading(true)
    await Api.get(`/expenses/week/${userId}/${year}`)
      .then((res) => setExpensesByWeek(res.data))
      .catch((_) => toast.error('Something went wrong... Try again later'))
      .finally(() => setIsLoading(false))
  }

  const getYearsWithExpenses = async (userId) => {
    setIsLoading(true)
    await Api.get(`/expenses/${userId}/recorded-years`)
      .then((res) => setExpensesYears(res.data))
      .catch((_) => toast.error('Something went wrong... Try again later'))
      .finally(() => setIsLoading(false))
  }

  const deleteExpense = async (expenseId) => {
    setIsLoading(true)
    await Api.delete(`/expenses/${expenseId}`)
      .then((_) => toast.success('Expense deleted'))
      .catch((_) => toast.error('Something went wrong... Try again later'))
      .finally(() => setIsLoading(false))
  }

  const updateExpense = async (expenseId, data) => {
    setIsLoading(true)
    await Api.patch(`/expenses/${expenseId}`, data)
      .then((_) => toast.success('Expense updated'))
      .catch((_) => toast.error('Something went wrong... Try again later'))
      .finally(() => setIsLoading(false))
  }

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        getExpenses,
        expensesByWeek,
        getExpensesByWeek,
        expenseYears,
        getYearsWithExpenses,
        deleteExpense,
        createExpense,
        updateExpense,
        isLoading,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  )
}

export const useExpense = useContext(ExpenseContext)
