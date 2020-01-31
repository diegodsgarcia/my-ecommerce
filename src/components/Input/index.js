import React, { useState } from 'react'

import './style.css'

function Input({ id, name, type, min, max, onChange }) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  return (
    <div className={`field ${focused || hasValue ? 'focused' : ''}`}>
      <label className="label">{name}</label>
      <input
        className="input"
        id={id}
        htmlFor={name}
        type={type}
        min={min}
        max={max}
        onChange={event => {
          if (event.target.value) {
            setHasValue(true)
          } else {
            setHasValue(false)
          }

          if (onChange) {
            onChange(event)
          }
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

export default Input
