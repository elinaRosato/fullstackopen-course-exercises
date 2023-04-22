import CountryInfo from './CountryInfo'
import SearchOption from './SearchOption'

const SearchAnswer = ({ matchedCountries, selectCountry }) => {

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
          <SearchOption key={country.cca3} country={country} selectCountry={selectCountry}/>
        )}
      </ul>
    )
  }
}

export default SearchAnswer