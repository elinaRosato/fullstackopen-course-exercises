const CountryOption = ({ country, selectCountry }) => {

  const inlineStyle = {
    display: 'inline'
  }
  return (
    <div>
      <li style={inlineStyle}>{country.name.common} </li>
      <button style={inlineStyle} onClick={() => selectCountry(country.name.common)} value={country.name.common}>Show</button>
    </div>
  )
}

export default CountryOption