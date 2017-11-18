import React from 'react'

const input = props => {
  const {name, type = 'text', value, label, onChange, errorMsg = ''} = props
  return (
    <div className='form-group'>
      <label className='form-control-label' htmlFor={name}>{label}</label>
      <input
        className='form-control'
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={label}
        onChange={onChange}
      />
      {errorMsg && <small className='text-danger'>{errorMsg}</small>}
    </div>
  )
}

export default input
