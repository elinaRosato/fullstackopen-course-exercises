const SearchOption = ({ country, selectCountry }) => {

  const inlineStyle = {
    display: 'inline'
  }
  return (
    <div>
      <li style={inlineStyle}>{country.name.common} </li>
      <button style={inlineStyle} onClick={selectCountry} selectedcountry={country.name.common}>Show</button>
    </div>
  )
}

export default SearchOption