import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import Countries from './Countries'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [showAll, setShowAll] = useState('')

  const handleFilter = (event) => {
    setShowAll(event.target.value)
  }

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data)
    })
  }, [])

  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(showAll.toLowerCase())
  )

  return (
    <div>
      <Filter showAll={showAll} handleFilter={handleFilter} />
      <Countries
        countries={countriesToShow}
        filter={showAll}
        handleFilter={handleFilter}
      />
    </div>
  )
}

export default App
