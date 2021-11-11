import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number:'040-1234567', id: 1},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
    { name: 'Dan Abramov', number: '12-43-234345', id: 3},
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilterWord, setFilterWord ] = useState('')

  const addPerson = (event) => {
    event.preventDefault();
    
    const newPerson = {
      name: newName,
      number: newNumber
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
  const showNames = nameToShow.map( person => <div key={person.name} >{person.name} {person.number}<br/> </div>)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with<input value={newFilterWord} onChange={handlefilterWord} />
      </div>
      <h3>add a new</h3>
      <form onSubmit={addPerson} >
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div> 
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {showNames}
    </div>
  )
}

export default App