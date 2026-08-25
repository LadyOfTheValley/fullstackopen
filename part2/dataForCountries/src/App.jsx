import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (event) => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => console.error('Error fetching countries:', error))
  }, [])

  const countriesToShow = searchQuery === '' 
    ? [] 
    : countries.filter(country => 
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )

  const renderContent = () => {
    if (searchQuery === '') {
      return null
    }

    if (countriesToShow.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }

    if (countriesToShow.length > 1) {
      return (
        <ul>
          {countriesToShow.map(country => (
            <li key={country.cca3 || country.name.common}>
              {country.name.common}
            </li>
          ))}
        </ul>
      )
    }

    if (countriesToShow.length === 1) {
      const country = countriesToShow[0]
      const languages = country.languages ? Object.values(country.languages) : []

      return (
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital ? country.capital.join(', ') : 'N/A'}</p>
          <p>Area: {country.area} km²</p>

          <h3>Languages</h3>
          <ul>
            {languages.map(lang => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>

          <img 
            src={country.flags.png} 
            alt={country.flags.alt || `Flag of ${country.name.common}`} 
            width="150" 
          />
        </div>
      )
    }

    return <p>No matches found</p>
  }

  return (
    <>
      <p>
        Find countries <input value={searchQuery} type="search" id="name" onChange={handleSearch} />
      </p>
      {renderContent()}
    </>
  )
}

export default App