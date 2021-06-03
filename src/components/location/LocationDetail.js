import React, { useContext, useEffect, useState } from "react";
import { LocationContext } from "../location/LocationProvider";
import "./Location.css";
import { useHistory, useParams } from "react-router-dom";


export const LocationDetail = () => {
  const { locations, getLocations } = useContext(LocationContext);
  
  useEffect(() => {
    getLocations()
  }, [])

  const history = useHistory()

  const [location, setLocation] = useState({
    location: {},
    customer: {},
    employees: [],
    animals: [],
  });

  const { locationId } = useParams();

  useEffect(() => {
    const thisLocation = locations.find(
      (a) => a.id === parseInt(locationId)
    ) || { location: {}, customer: {}, employees: [], animals: [] };

    setLocation(thisLocation);
  }, [locationId]);


  return (
    <section className="location">
      <h2 className="location__name">{location.name}</h2>
      <div className="location__location">Address: {location.address}</div>
      <h3>Employees</h3>
      {location.employees.map((employee) => {
        return <div>{employee.name}</div>;
      })}
      <h3>Current Residents</h3>
      {location.animals.map((animal) => {
        return <div>{animal.name}</div>;
      })}
       <button
        onClick={() => {
          history.push(`/locations/edit/${location.id}`);
        }}
      >
        Edit
      </button>
    </section>
  );
};
