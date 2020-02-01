import React, { useState, useEffect } from 'react'
import InputMask from 'react-input-mask'

import './style.css'

function Input({
  id,
  name,
  placeholder,
  value,
  type,
  min,
  max,
  onChange,
  onFocus,
  mask,
}) {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)

  useEffect(() => {
    value ? setHasValue(true) : setHasValue(false)
  }, [value])

  return (
    <div className={`field ${focused || hasValue ? 'focused' : ''}`}>
      <label className="label">{placeholder}</label>
      <InputMask
        mask={mask}
        className="input"
        id={id}
        htmlFor={placeholder}
        name={name}
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
        onFocus={event => {
          setFocused(true)

          if (onFocus) {
            onFocus(event)
          }
        }}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

export default Input
