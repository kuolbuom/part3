import React from 'react'

const PersonForm = ({ newName, setNewName, newNumber, setNewNumber, addNewPerson }) => {
  return (
    <div>
      
      <form onSubmit={addNewPerson}>
        <div>
          <div>
            name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/> 
          </div>
          <div>
            number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)}/>
          </div>
          
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
