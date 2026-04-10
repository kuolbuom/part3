import React from 'react'

const Persons = ({filterData,deleteAction}) => {
  return (
    <div>
       {filterData.map(person => 
        <div key={person.id} >
          {person.name}  {person.number}
           <button onClick={()=> deleteAction(person.id)}>delete</button>
        </div>
       )}
    </div>
  )
}

export default Persons
