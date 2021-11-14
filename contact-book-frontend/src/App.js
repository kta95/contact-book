import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilterWord, setFilterWord ] = useState('')

  // event handler for form submit
  const addPerson = (event) => {
    event.preventDefault();
    
    const newId = persons.length + 1

    const newPerson = {
      name: newName,
      number: newNumber,
      id : newId
    }
    const allNames = persons.map(person => person.name)
    console.log('all names', allNames)
    if (allNames.includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
    } else {
      const personList = persons.concat(newPerson);
      console.log('persons', personList)
      setPersons(personList)
      setNewName('')
      setNewNumber(' ')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
    console.log('type of ', typeof newNumber)
  }

  const handlefilterWord = (event) => {
    setFilterWord(event.target.value);
  }

  const nameToShow = persons.filter( person => {
    let newPerson = person.name.toLowerCase();
    let filter = newFilterWord.toLowerCase()
    if (newPerson.includes(filter)) {
      return person;
    }
  })
  console.log('name to show', nameToShow)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('data', response.data)
        setPersons(response.data)
      })

  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter word={newFilterWord} eventHandler={handlefilterWord} />
      <h3>add a new</h3>
      <PersonForm name={newName}
                  number={newNumber}
                  submitHandler={addPerson} 
                  nameHandler={handleNameChange} 
                  numberHandler={handleNumberChange}
       />
      <h3>Numbers</h3>
      <Persons nameToShow={nameToShow} />
    </div>
  )
}

export default App