import { useState, useEffect } from 'react'
import personService  from './services/persons'

import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import ContactList from './components/ContactList'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({ name: '', number: ''})
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
}, [])

  const handleNameChange = (event) => setNewPerson({...newPerson, name: event.target.value})
  
  const handleNumberChange = (event) => setNewPerson({...newPerson, number: event.target.value})
  
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const personsToShow = newFilter==='' ? persons : persons.filter((person) => person.name.toLowerCase().includes(newFilter))

  const addPerson = (event) => {
    event.preventDefault()
    const found = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())

    if (found) {
      if ( window.confirm(`${newPerson.name} is already added to phonebook, replce the old number with a new one?`) ) {
	      const changedPerson = { ...found, number: newPerson.number }
        personService
          .update(found.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== found.id ? person : returnedPerson))
          })
      }
      setNewPerson({ name: '', number: ''})
    } else {
      personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewPerson({ name: '', number: ''})
      })
    }
  }

  const deletePerson = (event) => {
    if ( window.confirm(`Delete ${event.target.name} ?`) ) {
      const personId = event.target.id
      personService.errase(personId).then(
        setPersons(persons.filter((person) => person.id != personId ))
      )
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <div>
        <h2>Add a new contact</h2>
        <AddPerson addPerson={addPerson} newPerson={newPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      </div>
      <div>
        <h2>Numbers</h2>
        <ContactList personsToShow={personsToShow} deletePerson={deletePerson}/>
      </div>
    </div>
  )
}

export default App
