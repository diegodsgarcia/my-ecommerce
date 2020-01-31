import React, { useState, useEffect } from 'react'
import InputMask from 'react-input-mask'

import './style.css'

function Input({ id, name, value, type, min, max, onChange, mask }) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  useEffect(() => {
    value ? setHasValue(true) : setHasValue(false)
  }, [value])

  return (
    <div className={`field ${focused || hasValue ? 'focused' : ''}`}>
      <label className="label">{name}</label>
      <InputMask
        mask={mask}
        className="input"
        id={id}
        htmlFor={name}
        type={type}
        min={min}
        max={max}
        value={value}
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
