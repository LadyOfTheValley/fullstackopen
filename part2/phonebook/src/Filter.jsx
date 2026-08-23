const Filter = ({ searchQuery, handleSearch }) => {
  return (
    <div>filter shown with <input value={searchQuery} type="search" id='name' onChange={handleSearch}/></div>
  )
}

export default Filter