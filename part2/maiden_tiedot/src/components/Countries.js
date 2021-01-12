import React from 'react'
import Weather from './Weather'

const Countries = ({ countries, filter, handleFilter }) => {
  if (countries.length > 10 && filter !== '') {
    return <p>Too many matches, specify another filter</p>
  } else if (countries.length === 1) {
    const country = countries[0]
    const languages = country.languages.map((language) => (
      <li key={language.iso639_1}>{language.name}</li>
    ))

    return (
      <div>
        <h1>{country.name}</h1>
        <b>capital:</b> {country.capital} <br />
        <b>population:</b> {country.population} <br />
        <h2>languages</h2>
        <ul>{languages}</ul>
        <img
          src={country.flag}
          alt="flag of country"
          width="150"
          height="100"
        />
        <Weather country={country} />
      </div>
    )
  } else {
    return (
      <>
        {countries.map((country) => (
          <div key={country.alpha2Code}>
            {country.name}
            <button value={country.name} onClick={handleFilter}>
              show
            </button>
          </div>
        ))}
      </>
    )
  }
}

export default Countries
