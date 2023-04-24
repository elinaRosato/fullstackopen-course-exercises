import React from "react"

const FilterCountry = ({ newSearch, handleSearchChange }) => {
    return(
        <form>
            choose a country: 
            <input value={newSearch} onChange={handleSearchChange} />
        </form>
    )
}

export default FilterCountry