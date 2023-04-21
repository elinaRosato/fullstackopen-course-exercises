const CountryInfo = ({ country }) => {
  const countryName = country && country.name.common
  const countryCapital = country && country.capital[0]
  const countryArea = country && country.area
  const countryLanguages = country && Object.values(country.languages)
  return(
    <div>
      <h2>{countryName}</h2>
      <p>Capital city: {countryCapital} </p>
      <p>Area: {countryArea}</p>
      <div>
        <h3>Languages</h3>
        <ul>
          {countryLanguages.map(language => 
            <li key={language}>{language}</li>
          )}
        </ul>
      </div>
      <img src={country.flags.png} alt={country.flags.alt}/>
    </div>
  )
}

export default CountryInfo