import React, { useContext, useEffect } from "react"
import { useHistory, Link } from 'react-router-dom'
import { LocationContext } from "../location/LocationProvider"
import "./Location.css"

export const LocationList = () => {
  // This state changes when `getlocations()` is invoked below
  const { locations, getLocations } = useContext(LocationContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    getLocations()
  }, [])

  const history = useHistory()

  return (
    <>
      <h2>Locations</h2>
      <button onClick={
        () => history.push("/locations/create")
      }>
            Add Location
      </button>
      <div className="location">
      {
        locations.map(location => {
          return (
            <div className="location" id={`location--${location.id}`}>

              <div className="location__name">
              <Link to={`/locations/detail/${location.id}`}>
                      { location.name } 
                    </Link>
              </div>

              <div className="employee__count">
                { location.employees.length } employees
              </div>

              <div className="animal__count">
                { location.animals.length } animals
              </div>

            </div>
          )
        })
      }
      </div>
    </>
)
}

