import React, { useContext, useEffect, useState } from "react"
import { LocationContext } from "./LocationProvider"
import "./Location.css"
import { useHistory, useParams } from 'react-router-dom';



export const LocationForm = () => {
  const { locations, addLocation, getLocations, updateLocation, getLocationById } = useContext(LocationContext)

   //for edit, hold on to state of locationin this view
  const [location, setLocation] = useState({})
 //wait for data before button is active
  const [isLoading, setIsLoading] = useState(true);

  const {locationId} = useParams();

  const history = useHistory();

  
  //when a field changes, update state. The return will re-render and display based on the values in state
  //Controlled component
  const handleControlledInputChange = (event) => {
    /* When changing a state object or array,
    always create a copy, make changes, and then set state.*/
    const newLocation = { ...location }
    /* Location is an object with properties.
    Set the property to the new value
    using object bracket notation. */
    newLocation[event.target.id] = event.target.value
    // update state
    setLocation(newLocation)
  }
  
  const handleClickSaveLocation = (event) => {
    event.preventDefault() //Prevents the browser from submitting the form
  
    if (locationId) {
      updateLocation({
        id : location.id,
        name: location.name,
        address: location.address
      })
      .then(()=> history.push(`/locations/detail/${location.id}`))
    }else {
      const newLocation = {
        name: location.name,
        address: location.address,
      }
      addLocation(newLocation)
      .then(() => history.push("/locations"))
    } 
  }
  
  useEffect(() => {
    getLocations()
    .then(()=> {
      if (locationId) {
        getLocationById(locationId)
        .then(location => {
          setLocation(location)
          setIsLoading(false)
        })
      }
    })
  }, [])
  
  return (
    <form className="locationForm">
      <h2 className="locationForm__title">{locationId ? <>Edit Location</> : <>New Location</>}</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Location name:</label>
          <input type="text" id="name" required autoFocus className="form-control" placeholder="location name" value={location.name} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Location Address:</label>
          <input type="text" id="address" required autoFocus className="form-control" placeholder="location address" value={location.address} onChange={handleControlledInputChange} />
        </div>
      </fieldset> 
      <button className="btn btn-primary" onClick={handleClickSaveLocation}>
      {locationId ? <>Save Location</> : <>Add Location</>}
          </button>
    </form>
  )
}
