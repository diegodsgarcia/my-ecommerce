import React from 'react'

import './style.css'

function Page({ children }) {
  return (
    <div className="page">
      <div className="page-container">{children}</div>
    </div>
  )
}

export default Page
