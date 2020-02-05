import React, { useState, useEffect } from 'react'
import { PropTypes } from 'prop-types'
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
  required,
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
        required={required}
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

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  mask: PropTypes.string,
}

export default Input
