'use client'

import { createContext, useContext, useState } from 'react'
import Api from '../../services/api'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'

const ExpenseContext = createContext()

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([])
  const [expensesByWeek, setExpensesByWeek] = useState([])
  const [expenseYears, setExpensesYears] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [view, setView] = useState('monthly')

  const handleView = () => {
    setView((prev) => (prev === 'monthly' ? 'weekly' : 'monthly'))
  }

  const createExpense = async (data) => {
    setIsLoading(true)

    const response = await Api.post(`/expenses/`, data)
      .then((res) => {
        toast.success('Expense recorded')
        return res
      })
      .catch((_) => toast.error('Something went wrong... Try again later'))
      .finally(() => setIsLoading(false))

    return response
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
    const response = await Api.delete(`/expenses/${expenseId}`)
      .then((res) => {
        toast.success('Expense deleted')
        return res
      })
      .catch((_) => toast.error('Something went wrong... Try again later'))
      .finally(() => setIsLoading(false))

    return response
  }

  const updateExpense = async (expenseId, data) => {
    setIsLoading(true)
    await Api.patch(`/expenses/${expenseId}`, data)
      .then((_) => toast.success('Expense updated'))
      .catch((_) => toast.error('Something went wrong... Try again later'))
      .finally(() => setIsLoading(false))
  }

  const onExpenseCreation = async (userId, year) => {
    getYearsWithExpenses(userId)
    getExpenses(userId, year)
    getExpensesByWeek(userId, year)
  }

  const onExpenseDelete = async (userId, expenseId, date) => {
    const updatedExpenses = expenses.filter((elem) => elem.id !== expenseId)
    setExpenses(updatedExpenses)

    const expenseYear = dayjs(date, 'YYYY/MM/DD').year()
    getExpensesByWeek(userId, expenseYear)
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
        view,
        handleView,
        onExpenseCreation,
        onExpenseDelete,
        setExpenses,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  )
}

export const useExpense = () => useContext(ExpenseContext)
