'use client'

import { createContext, useContext, useState } from 'react'
import Api from '../../services/api'
import { toast } from 'react-toastify'

const EmployeeContext = createContext()

export const EmployeeProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [employees, setEmployees] = useState([])
  const [activeEmployee, setActiveEmployee] = useState('')
  const [error, setError] = useState(false)

  const selectActiveEmployee = (employee) => setActiveEmployee(employee)

  const getEmployees = async () => {
    setIsLoading(true)
    await Api.get('/users')
      .then((res) => setEmployees(res.data))
      .catch((_) => {
        setError(true)
        toast.error('Something went wrong... Try again later')
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        getEmployees,
        isLoading,
        selectActiveEmployee,
        activeEmployee,
        error,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  )
}

export const useEmployee = () => useContext(EmployeeContext)
