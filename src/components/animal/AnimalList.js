import React, { useState, useContext, useEffect } from "react"
import { useHistory, Link } from 'react-router-dom'
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"


export const AnimalList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { animals, getAnimals } = useContext(AnimalContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    getAnimals()
  }, [])

  const history = useHistory()

  return (
    <>
        <h1>Animals</h1>

        <button onClick={() => history.push("/animals/create")}>
            Make Reservation
        </button>

        <div className="animals">
            {
                animals.map(animal => <Link key={animal.id} to={`/animals/detail/${animal.id}`}>
                      { animal.name } 
                    </Link>
                )   
            }
        </div>
    </>
)
}

