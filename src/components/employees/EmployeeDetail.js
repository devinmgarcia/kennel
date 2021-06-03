import React, { useContext, useEffect, useState } from "react"
import { EmployeeContext } from "../employees/EmployeeProvider"
import "./Employee.css"
import { useHistory, useParams } from "react-router-dom"

export const EmployeeDetail = () => {
    const { employees } = useContext(EmployeeContext)
    const [ employee, setEmployee ] = useState({ location: {}, customer: {} })

    /*
        Given the example URL above, this will store the value
        of 5 in the EmployeeId variable
    */
    const { employeeId } = useParams();

    const history = useHistory()


    useEffect(() => {
        const thisEmployee = employees.find(a => a.id === parseInt(employeeId)) || { location: {}, customer: {} }

        setEmployee(thisEmployee)
    }, [employeeId])

    return (
    <section className="employee">
        <h3 className="employee__name">{ employee.name }</h3>
        <div className="employee__location">Location: { employee.location.name }</div>
        <button
        onClick={() => {
          history.push(`/employees/edit/${employee.id}`);
        }}
      >
        Edit
      </button>
    </section>
    )
}
