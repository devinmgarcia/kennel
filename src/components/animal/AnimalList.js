import React, { useContext, useEffect, useState } from "react"
import { AnimalContext } from "./AnimalProvider"
import { AnimalDetail } from "./AnimalDetail"
import "./Animal.css"
import { useHistory } from "react-router-dom"

export const AnimalList = () => {
  const { animals, getAnimals, searchTerms } = useContext(AnimalContext)

  // Since you are no longer ALWAYS displaying all of the animals
  const [ filteredAnimals, setFiltered ] = useState([])
  const history = useHistory()

  // Empty dependency array - useEffect only runs after first render
  useEffect(() => {
      getAnimals()
  }, [])

  // useEffect dependency array with dependencies - will run if dependency changes (state)
  // searchTerms will cause a change
  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching animals
      const subset = animals.filter(animal => animal.name.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {
      // If the search field is blank, display all animals
      setFiltered(animals)
    }
  }, [searchTerms, animals])

  return (
    <>
      <h1>Animals</h1>

      <button onClick={() => history.push("/animals/create")}>
          Make Reservation
      </button>
      <div className="animals">
      {
        filteredAnimals.map(animal => {
          return <AnimalDetail key={animal.id} animalObject={animal} />
        })
      }
      </div>
    </>
  )
}



