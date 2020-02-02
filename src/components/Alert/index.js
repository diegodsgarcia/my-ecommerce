import React from 'react'

import './style.css'

function Alert({ children, className, onClick }) {
  return (
    <div className={`alert ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}

export default Alert
