import { useState, useEffect } from 'react'
import getAll  from './services/countries'

import SearchAnswer from './components/SearchAnswer'
import FilterCountry from './components/FilterCountry'


const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState()

  useEffect(() => {
    getAll().then(initialCountries => setCountries(initialCountries))
}, [])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    setSelectedCountry()
    console.log('newSearch: ', event.target.value)
  }

  const selectCountry = (event) => {
    console.log(event.target.value)
    const selected = countries.filter( country => country.name.common === event.target.value)
    setSelectedCountry(selected[0])
    console.log('show: ', selected[0])
  }

  
  return (
    <div>
      <FilterCountry newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <br />
      <SearchAnswer newSearch={newSearch} countries={countries} selectedCountry={selectedCountry} selectCountry={selectCountry} />
    </div>
  )
}

export default App
