import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import ContactList from './components/ContactList'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({ name: '', number: ''})
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          setPersons(response.data)
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
      alert(`${newPerson.name} is already added to phonebook`)
      setNewPerson({ name: '', number: ''})
    } else {
      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewPerson({ name: '', number: ''})
        })
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
        <ContactList personsToShow={personsToShow}/>
      </div>
    </div>
  )
}

export default App
