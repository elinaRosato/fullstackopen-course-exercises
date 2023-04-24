import React from "react"


import CountryOption from './CountryOption'
import CountryInfo from "./CountryInfo"

const SearchAnswer = ({ newSearch, countries, selectedCountry, selectCountry }) => {

  const matches = countries.filter( country => 
    country.name.common.toLowerCase().includes(newSearch.toLowerCase())
  )
  console.log(matches)
  //const matchedCountries = (countries.length === 0) ? countries : countries.filter( country => country.name.common.toLowerCase().includes(newSearch.toLowerCase()) )

  if (matches.length > 10){
    return (
      <p>Too many matches, specify another filter</p>
    )
  }

  if (selectedCountry !== undefined) {
    console.log('show: ', selectedCountry)
    return (
      <CountryInfo country={selectedCountry}  />
    )
  }

  if (matches.length > 1) {
    return (
      <ul>
        {matches.map(country => 
          <CountryOption key={country.cca3} country={country} selectCountry={selectCountry}/>
        )}
      </ul>
    )
  }

  return (
    <CountryInfo country={matches[0]} />
  )

  
}

export default SearchAnswer