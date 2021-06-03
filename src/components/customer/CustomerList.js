import React, { useContext, useEffect } from "react"
import { CustomerContext } from "./CustomerProvider"
import "./Customer.css"

export const CustomerList = () => {
  // This state changes when `getCustomers()` is invoked below
  const { customers, getCustomers } = useContext(CustomerContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    getCustomers()
  }, [])


  return (
    <section className="customers">
      {
        customers.map(customer => {
          return (
            <div className="customer" id={`Customer--${customer.id}`}>
              <div className="customer__name">
                Name: { customer.name }
              </div>
              <div className="customer__breed">
                Address: { customer.address }
              </div>
            </div>
          )
        })
      }
    </section>
  )
}

