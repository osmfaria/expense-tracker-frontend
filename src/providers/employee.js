'use client'

import { createContext, useContext, useState } from 'react'
import Api from '../../services/api'
import { toast } from 'react-toastify'

const EmployeeContext = createContext()

export const EmployeeProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [employees, setEmployees] = useState()

  const getEmployees = async () => {
    setIsLoading(true)
    await Api.get('/users')
      .then((res) => setEmployees(res.data))
      .catch((_) => toast.error('Something went wrong... Try again later'))
      .finally(() => setIsLoading(false))
  }

  return (
    <EmployeeContext.Provider value={{ employees, getEmployees, isLoading }}>
      {children}
    </EmployeeContext.Provider>
  )
}

export const useEmployee = () => useContext(EmployeeContext)
