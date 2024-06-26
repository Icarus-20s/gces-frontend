import React, { useState } from 'react'
 

const Register = () => {
   const [text ,setText ] =useState('gotta be change!')
   const onChangeHandler = (event)=>{
    console.log(event.target.name , event.target.value)
    setText((prevEvent)=>{
      console.log(prevEvent)

    })
   }
  return (
    <div>
      <h1>{text}</h1>
      <div className="form-controller">
        <input type="text" onChange={onChangeHandler} name='text' />
      </div>
    </div>
  )
}

export default Register
