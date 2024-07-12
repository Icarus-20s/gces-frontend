import React from 'react'
import { useAuth } from '../../context/AuthContextProvider'


const LandingPage = () => {
  const {role} = useAuth()
  return (
    <div>
      {
        role=="student"?
        <p>Yo are student</p>
        :
        <p>Yo are not authorized</p>
      }
      
    </div>
  )
}

export default LandingPage
