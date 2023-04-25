import { useState, useEffect } from 'react'
import getAll  from './services/countries'

import SearchAnswer from './components/SearchAnswer'
import FilterCountry from './components/FilterCountry'


const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    getAll().then(initialCountries => setCountries(initialCountries))
}, [])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <FilterCountry newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <br />
      <SearchAnswer newSearch={newSearch} selectCountry={setNewSearch} countries={countries} />
    </div>
  )
}

export default App
