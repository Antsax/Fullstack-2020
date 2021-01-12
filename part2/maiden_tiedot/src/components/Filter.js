import React from 'react'

const Filter = ({ showAll, handleFilter }) => {
  return (
    <div>
      find countries <input value={showAll} onChange={handleFilter} />
    </div>
  )
}

export default Filter
