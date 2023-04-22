import { useState, useEffect } from 'react'
import countryService  from './services/countries'

import SearchAnswer from './components/SearchAnswer'

const App = () => {
  const [search, setSearch] = useState('')

  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService
    .getAll()
    .then(initialCountries => {
      setCountries(initialCountries)
    })
}, [])

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  const matchedCountries = (countries.length === 0) ? countries : countries.filter( country => country.name.common.toLowerCase().includes(search.toLowerCase()) )

  const selectCountry = (event) => {
    const selectedCountry = event.target.getAttribute("selectedCountry")
    setCountries(countries.filter( country => country.name.common === selectedCountry ))
  }

  return (
  <div>
    choose a country: <input value={search} onChange={handleChange} />
    {(matchedCountries.length === 0) ? 
      <p>Couldn't find any match.</p> :
      <SearchAnswer matchedCountries={matchedCountries} selectCountry={selectCountry}/>
    }
    
  </div>
)}

export default App
