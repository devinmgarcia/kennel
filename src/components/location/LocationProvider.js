import React, { useState, createContext } from "react"

const api = "https://kennels-api.herokuapp.com"

// The context is imported and used by individual components that need data
export const LocationContext = createContext()

// This component establishes what data can be used.
export const LocationProvider = (props) => {
    const [locations, setLocations] = useState([])

    const getLocations = () => {
        return fetch(`${api}/locations?_embed=employees&_embed=animals`)
        .then(res => res.json())
        .then(setLocations)
    }

    const addLocation = locationObj => {
        return fetch(`${api}/locations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(locationObj)
        })
        .then(response => response.json())
        // .then(getLocations)
    }

    const updateLocation = location => {
        return fetch(`${api}/locations/${location.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(location)
        })
          .then(getLocations)
      }

      const getLocationById = locationId => {
        return fetch(`${api}/locations/${locationId}`)
        .then(res => res.json())
      }

    /*
        You return a context provider which has the
        `Locations` state, `getLocations` function,
        and the `addLocation` function as keys. This
        allows any child elements to access them.
    */
    return (
        <LocationContext.Provider value={{
            locations, getLocations, addLocation, updateLocation, getLocationById
        }}>
            {props.children}
        </LocationContext.Provider>
    )
}


