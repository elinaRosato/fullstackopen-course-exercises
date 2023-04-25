import React from "react"

import CountryOption from './CountryOption'
import CountryInfo from "./CountryInfo"

const SearchAnswer = ({ newSearch, selectCountry, countries }) => {

  const matches = countries.filter( country => 
    country.name.common.toLowerCase().includes(newSearch.toLowerCase())
  )

  if (matches.length > 10){
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  if (matches.length === 1) {
    return (
      <CountryInfo country={matches[0]}  />
    )
  }

  if (matches.length === 0) {
    return (
      <p>No matches, check the country spelling!</p>
    )
  }

  return (
    <ul>
      {matches.map(country => 
        <CountryOption key={country.cca3} country={country} selectCountry={selectCountry}/>
      )}
    </ul>
  )

}

export default SearchAnswer