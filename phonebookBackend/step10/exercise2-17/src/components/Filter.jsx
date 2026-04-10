import React from 'react'

const Filter = ({filter,setFilter}) => {
    console.log(filter,setFilter)
  return (
    <div>
      <div>
         filter show with
           <input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder='Search names'/>
      </div>

    </div>
  )
}

export default Filter
