import React, { useContext, useEffect } from "react"
import { useHistory, Link } from 'react-router-dom'
import { EmployeeContext } from "../employees/EmployeeProvider"
import "./Employee.css"

export const EmployeeList = () => {
  // This state changes when `getEmployees()` is invoked below
  const { employees, getEmployees } = useContext(EmployeeContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    getEmployees()
  }, [])


  const history = useHistory()

  return (
    <>
      <h2>Employees</h2>
      <button onClick={
        () => history.push("/employees/create")
      }>
            Add Employee
      </button>
      <div className="employee">
      {
        employees.map(employee => {
          return (
            <Link to={`/employees/detail/${employee.id}`}>
                      { employee.name } 
                    </Link>
          )
        })
      }
      </div>
    </>
)
}

