import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "../location/LocationProvider";
import { EmployeeContext } from "../employees/EmployeeProvider";
import "./Employee.css";
import { useHistory, useParams } from "react-router-dom";

export const EmployeeForm = () => {
  const { addEmployee, getEmployeeById, updateEmployee } =
    useContext(EmployeeContext);
  const { locations, getLocations } = useContext(LocationContext);

  const [isLoading, setIsLoading] = useState(true);

  const [employee, setEmployee] = useState({
    name: "",
    locationId: 0,
  });

  const { employeeId } = useParams();
  const history = useHistory();

  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newEmployee = { ...employee };
    /* Employee is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    newEmployee[event.target.id] = event.target.value;
    // update state
    setEmployee(newEmployee);
  };

  const handleClickSaveEmployee = (event) => {
    event.preventDefault(); //Prevents the browser from submitting the form

    if (employeeId) {
      updateEmployee({
        id: employee.id,
        name: employee.name,
        locationId: parseInt(employee.locationId),
      }).then(() => history.push(`/employees/detail/${employee.id}`));
    } else {
      //Invoke addEmployee passing the new Employee object as an argument
      //Once complete, change the url and display the Employee list
      const newEmployee = {
        name: employee.name,
        locationId: employee.locationId,
      };
      addEmployee(newEmployee).then(() => history.push("/employees"));
    }
  };
  useEffect(() => {
    getLocations().then(() => {
      if (employeeId) {
        getEmployeeById(employeeId).then((employee) => {
          setEmployee(employee);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <form className="employeeForm">
      <h2 className="employeeForm__title">New Employee</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Employee name:</label>
          <input
            type="text"
            id="name"
            required
            autoFocus
            className="form-control"
            placeholder="employee name"
            value={employee.name}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Assign to location: </label>
          <select
            name="locationId"
            id="locationId"
            className="form-control"
            value={employee.locationId}
            onChange={handleControlledInputChange}
          >
            <option value="0">Select a location</option>
            {locations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button className="btn btn-primary" onClick={handleClickSaveEmployee}>
        {employeeId ? <>Save Employee</> : <>Add Employee</>}
      </button>
    </form>
  );
};
