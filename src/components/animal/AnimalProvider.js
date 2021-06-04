import React, { useState, createContext } from "react";

const api = "https://kennels-api.herokuapp.com"

// The context is imported and used by individual components that need data
export const AnimalContext = createContext();

// This component establishes what data can be used.
export const AnimalProvider = (props) => {
  const [animals, setAnimals] = useState([]);
  const [animal, setAnimal] = useState({});
  const [searchTerms, setSearchTerms] = useState("");

  const getAnimals = () => {
    return fetch(
      `${api}/animals?_expand=customer&_expand=location&_sort=location.id`
    )
      .then((res) => res.json())
      .then(setAnimals);
  };

  const addAnimal = (animalObj) => {
    return fetch(`${api}/animals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animalObj),
    }).then((response) => response.json());
  };

  const releaseAnimal = (animalId) => {
    return fetch(`${api}/animals/${animalId}`, {
      method: "DELETE",
    }).then(getAnimals);
  };

  const updateAnimal = (animal) => {
    return fetch(`${api}/animals/${animal.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animal),
    }).then(getAnimals);
  };

  const getAnimalById = (animalId) => {
    return fetch(`${api}/animals/${animalId}`).then((res) =>
      res.json()
    );
  };

  return (
    <AnimalContext.Provider
      value={{
        animal,
        animals,
        getAnimals,
        addAnimal,
        releaseAnimal,
        updateAnimal,
        getAnimalById,
        searchTerms,
        setSearchTerms
      }}
    >
      {props.children}
    </AnimalContext.Provider>
  );
};
