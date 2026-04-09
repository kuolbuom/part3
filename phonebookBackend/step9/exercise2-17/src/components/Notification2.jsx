import React from 'react'

const Notification2 = ({replaceMessage}) => {
    if(replaceMessage===null){
        return null
    }
  return (
    <div className='error2'>
      {replaceMessage}
    </div>
  )
}

export default Notification2
