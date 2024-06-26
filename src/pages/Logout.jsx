import React from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()
  return (
<button className="log-out" onClick={()=>{
navigate('/')
}}>logout</button>
)
}

export default Logout
