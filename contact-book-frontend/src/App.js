import React, { useState, useEffect } from 'react'    // import effect hooks
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import PersonsService from './services/PersonsService'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilterWord, setFilterWord ] = useState('')
  const [ newMessage, setNewMessage ] = useState(null)

  // event handler for form submit
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const allNames = persons.map(person => person.name)
    console.log('all names', allNames)
    const numberRegex = /^[0-9-]+$/  // regex pattern for number requirement
    console.log('pattern test', numberRegex.test(newNumber))
    if (numberRegex.test(newNumber)) { 
      if (allNames.includes(newName)) {
        const thePerson = persons.find(person => person.name === newName );
        const index = thePerson.id;
        if (thePerson.number !== newNumber) {
          if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
            PersonsService
              .update(index, newPerson)
              .then(returnedPerson => {
                setPersons(persons.map(person => person.id !== index ? person : returnedPerson))
                setNewName('')
                setNewNumber('')
              })
          }
        } else {
          alert(`${newName} is already added to phonebook`)
        }
        setNewName('')
      } else {
        PersonsService
          .create(newPerson)
          .then(returnPerson => {
            setNewMessage(
              `Added ${newName}`
            )
            setTimeout(() => {
              setNewMessage(null)
            }, 5000)
            console.log('newPerson', newPerson)
            console.log('response data', returnPerson)
            const personList = persons.concat(returnPerson);
            console.log('persons', personList)
            setPersons(personList)
            setNewName('')
            setNewNumber(' ')
          })
      }
    } else {
      alert(`number shoud not includes alphabets`)
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

  // use Effect hooks for fetching datas
  useEffect(() => {
    PersonsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} from contact?`)) {
      PersonsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          console.log('persons after del', persons)
      })
    }
  }

  const nameToShow = persons.filter( person => {
    let newPerson = person.name.toLowerCase();
    let filter = newFilterWord.toLowerCase()
    if (newPerson.includes(filter)) {
      return person;
    }
  })
  console.log('name to show', nameToShow)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} />
      <Filter word={newFilterWord} eventHandler={handlefilterWord} />
      <h3>add a new</h3>
      <PersonForm name={newName}
                  number={newNumber}
                  submitHandler={addPerson} 
                  nameHandler={handleNameChange} 
                  numberHandler={handleNumberChange}
       />
      <h3>Numbers</h3>
      {nameToShow.map( person => 
        <Persons 
          key={person.id}
          name={person.name} 
          number={person.number}
          deleteHandler={() => handleDelete(person.id, person.name)}/>        
      )}
    </div>
  )
}

export default App