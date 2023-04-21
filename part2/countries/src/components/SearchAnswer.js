import CountryInfo from './CountryInfo'

const SearchAnswer = ({ matchedCountries }) => {
  if (matchedCountries.length > 10){
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (matchedCountries.length === 1){

    return(
      <CountryInfo country={matchedCountries[0]}/>
    )
  } else {
    return (
      <ul>
        {matchedCountries.map(country => 
          <li key={country.cca3}>{country.name.common}</li>
        )}
      </ul>
    )
  }
}

export default SearchAnswer