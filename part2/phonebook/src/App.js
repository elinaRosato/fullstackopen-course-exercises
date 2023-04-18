import { useState } from 'react'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import ContactList from './components/ContactList'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newPerson, setNewPerson] = useState({ name: '', number: ''})
  const [newFilter, setNewFilter] = useState('')

  const handleNameChange = (event) => setNewPerson({...newPerson, name: event.target.value})
  
  const handleNumberChange = (event) => setNewPerson({...newPerson, number: event.target.value})
  
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const personsToShow = newFilter==='' ? persons : persons.filter((person) => person.name.toLowerCase().includes(newFilter))

  const addPerson = (event) => {
    event.preventDefault()
    const found = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())

    if (found) {
      alert(`${newPerson.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
      setNewPerson({ name: '', number: ''})
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
